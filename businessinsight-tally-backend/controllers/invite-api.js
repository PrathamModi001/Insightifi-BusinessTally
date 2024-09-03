import { UserDao } from '../dao/user.dao.js';
import { CompanyDao } from '../dao/company.dao.js';
import { UserCompanyDao } from '../dao/userCompany.dao.js';
import { UserOrganizationDao } from '../dao/userOrganization.dao.js';
import { inviteMail, organizationAdminNotify } from '../utils/mailUtils.js';
import { getInviteToken } from '../config/authenticate.js';
import { logTypes, userRoles } from '../utils/helper.js';
import { validationResult } from 'express-validator';
import { logger } from '../app.js';
// Controller for handling user invitations
export const inviteController = {
  /**
   * Controller method for sending invitations, validating roles, generating invite tokens, and sending emails.
   * Returns appropriate responses for successful or failed invitation attempts.
   */

  invitation: [
    async (req, res) => {
      const logInfo = {
        userId: req.user.id,
        endpoint: '/invitation',
        method: req.method,
        type: logTypes.Invite,
      };
      try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          logger.error({
            ...logInfo,
            message: `Validation Error: ${errors.array()}`,
          });
          return res.status(400).json({
            status: false,
            message: errors.array()[0].msg, // Return all validation errors
          });
        }
        // Determine inviter and invitee roles
        const inviteRole = req.user.role;
        const receiverRole = req.body.userType;

        const email = req.body.email;
        const foundUser = await UserDao.findByEmail(email);
        // Check if email is already registered
        if (foundUser) {
          return res.status(400).json({
            status: false,
            message: 'Email address is already registered.',
          });
        }
        // Match roles and set appropriate user type
        switch (inviteRole) {
          case 'organizationAdmin':
          case 'organizationEmployee':
            if (receiverRole === 'company') {
              req.body.userType = userRoles.companyAdmin;
            } else if (receiverRole === 'employee') {
              req.body.userType = userRoles.organizationEmployee;
            }
            break;

          case 'companyAdmin':
            if (receiverRole === 'employee') {
              req.body.userType = userRoles.companyEmployee;
            } else if (receiverRole === 'company') {
              return res.status(400).json({
                status: false,
                message:
                  'You cannot invite a Company as an invitee. Please select a valid user type.',
              });
            }
            break;

          default:
            return res
              .status(400)
              .json({ status: false, message: 'Invalid role.' });
        }

        // Prepare invitation payload
        const payload = {
          inviteId: req.user.id,
          ...req.body,
        };

        // Generate invite token and prepare details for invitation email
        const inviteToken = getInviteToken(payload);
        const details = {
          inviterName: `${req?.user?.firstname} ${req?.user?.lastname}`,
          ...payload,
          inviteToken,
        };

        // Send invitation email
        const checkInvite = await inviteMail(details);

        const logMessage = checkInvite
          ? 'Invitation sent successfully.'
          : 'Failed to send invitation email.';
        logger.info({
          ...logInfo,
          inviteRole,
          receiverRole: payload.userType,
          message: logMessage,
        });
        if (!checkInvite) {
          logger.error({
            ...logInfo,
            message: 'Failed to send invitation email.',
          });
          return res.status(400).json({
            status: false,
            message: 'Failed to send invitation email.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Invitation sent successfully.',
          data: { inviteToken }, // TODO: Remove the token from the response after successful frontend integration.
        });
      } catch (err) {
        logger.error({ ...logInfo, message: err?.message });
        return res.status(400).json({ status: false, message: err?.message });
      }
    },
  ],

  /**
   * Controller method for handling user invitations, including registration flows for different user roles.
   * Returns appropriate responses for successful or failed invitation attempts.
   */
  invitee: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessage = errors.array()[0].msg; // Define errorMessage here
          logger.error({ message: 'failed validation.' });
          return res.status(400).json({
            status: false,
            message: errorMessage, // Use errorMessage here
          });
        }

        const { userType } = req.user;
        const { name, state, city, password } = req.body;

        // Input validation based on user type
        if (
          userType === userRoles.companyAdmin &&
          (!name || !state || !city || !password)
        ) {
          return res
            .status(400)
            .json({ status: false, message: 'Missing required fields!!' });
        } else if (
          (userType === userRoles.organizationEmployee ||
            userType === userRoles.companyEmployee) &&
          !password
        ) {
          return res
            .status(400)
            .json({ status: false, message: 'Password field is empty' });
        }
        // Extract password from request body

        const currentUser = req.user;
        // Check if email is already registered
        const checkEmail = await UserDao.findByEmail(currentUser.email);
        if (checkEmail) {
          return res.status(400).json({
            status: false,
            message: 'Email address is already registered.',
          });
        }

        // Prepare user payload for registration
        const userPayloadData = {
          email: currentUser?.email,
          firstname: currentUser?.firstname,
          lastname: currentUser?.lastname,
          role: currentUser?.userType,
          password: password,
          isVerified: true,
        };

        // Handle registration based on user type
        if (currentUser.userType === userRoles.companyAdmin) {
          // Registration flow for company admin
          const { name, city, state } = req.body;

          // Find organization ID for the inviter
          const organizationId = await UserOrganizationDao.findByUserId(
            currentUser.inviteId
          );
          if (!organizationId) {
            return res.status(400).json({
              status: false,
              message: 'Organization is not exist !!!',
            });
          }
          // Create company and user records
          const companyPayloadData = {
            name: name,
            city: city,
            state: state,
            organization: organizationId.organization,
          };

          const createdCompany = await CompanyDao.create(companyPayloadData);
          if (!createdCompany) {
            return res.status(400).json({
              status: false,
              message: 'Failed to create company.',
            });
          }
          const newUser = await UserDao.create(userPayloadData);
          if (!newUser) {
            return res.status(400).json({
              status: false,
              message: 'Failed to create user.',
            });
          }
          const UserCompanyPayload = {
            user: newUser.dataValues.id,
            company: createdCompany.dataValues.id,
          };
          const usercompany = await UserCompanyDao.create(UserCompanyPayload);
          if (!usercompany) {
            return res.status(400).json({
              status: false,
              message: 'Failed to create user-company mapping.',
            });
          }
          // Fetch the inviter's details
          const inviter = await UserDao.findById(currentUser.inviteId);
          if (!inviter) {
            return res.status(400).json({
              status: false,
              message: 'Inviter not found.',
            });
          }
          organizationAdminNotify(
            inviter.email,
            inviter.firstname,
            currentUser.firstname,
            'Client'
          );
          return res.status(200).json({
            status: true,
            message: 'Company admin invitation successful.',
          });
        } else if (currentUser.userType === userRoles.companyEmployee) {
          // Registration flow for company employee
          const newUser = await UserDao.create(userPayloadData);
          if (!newUser) {
            return res.status(400).json({
              status: false,
              message: 'Failed to create user.',
            });
          }
          const companyId = await UserCompanyDao.findByUserId(
            currentUser.inviteId
          );
          if (!companyId) {
            return res.status(400).json({
              status: false,
              message: 'Company not found.',
            });
          }
          const userCompanyPayload = {
            user: newUser.dataValues.id,
            company: companyId.dataValues.company,
          };
          const usercompany = await UserCompanyDao.create(userCompanyPayload);
          if (!usercompany) {
            return res.status(400).json({
              status: false,
              message: 'Failed to create user-company mapping.',
            });
          }
          // Fetch the inviter's details
          const inviter = await UserDao.findById(currentUser.inviteId);
          if (!inviter) {
            return res.status(400).json({
              status: false,
              message: 'Inviter not found.',
            });
          }
          organizationAdminNotify(
            inviter.email,
            inviter.firstname,
            currentUser.firstname,
            'Employee'
          );
          return res.status(200).json({
            status: true,
            message: 'Company employee invitation successful.',
          });
        } else if (currentUser.userType === userRoles.organizationEmployee) {
          // Registration flow for organization employee
          const newUser = await UserDao.create(userPayloadData);
          if (!newUser) {
            return res.status(400).json({
              status: false,
              message: 'Failed to create user.',
            });
          }
          const organizationId = await UserOrganizationDao.findByUserId(
            currentUser.inviteId
          );
          if (!organizationId) {
            return res.status(400).json({
              status: false,
              message: 'Organization not found.',
            });
          }
          const userOrganizationPayload = {
            user: newUser.dataValues.id,
            organization: organizationId.organization,
          };
          const userorganization = await UserOrganizationDao.create(
            userOrganizationPayload
          );
          if (!userorganization) {
            return res.status(400).json({
              status: false,
              message: 'Failed to create user-organization mapping.',
            });
          }

          ////////////////
          // Fetch the inviter's details
          const inviter = await UserDao.findById(currentUser.inviteId);
          if (!inviter) {
            return res.status(400).json({
              status: false,
              message: 'Inviter not found.',
            });
          }
          organizationAdminNotify(
            inviter.email,
            inviter.firstname,
            currentUser.firstname,
            'Employee'
          );

          return res.status(200).json({
            status: true,
            message: 'Organization employee invitation successful.',
          });
        }
      } catch (err) {
        return res.status(400).json({ status: false, message: err?.message });
      }
    },
  ],
};
