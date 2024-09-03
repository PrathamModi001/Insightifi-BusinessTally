import { UserDao } from '../dao/user.dao.js';
import { validationResult } from 'express-validator';
import { OrganizationDao } from '../dao/organization.dao.js';
import {
  emailOTP,
  mailSuccessfullyRegisterUser,
  mailUserForgotPasswordOTP,
  organizationAdminNotify,
  sendEmailUpdateRequest,
  superAdminNotify,
} from '../utils/mailUtils.js';
import { userRoles, otpGenerate } from '../utils/helper.js';
import { UserOrganizationDao } from '../dao/userOrganization.dao.js';
import { getEmailUpdateToken, getUserToken } from '../config/authenticate.js';
import bcrypt from 'bcrypt';
import { CompanyDao } from '../dao/company.dao.js';
import { logger } from '../app.js';
import { UserCompanyDao } from '../dao/userCompany.dao.js';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';

import {
  // deleteS3Object,
  // handleFileUpload,
  // getFile,
  getUploadUrl,
} from '../utils/awsUtils.js';

import { BlogDao } from '../dao/blog.dao.js';

// Controller for user-related operations
export const userController = {
  /**
   * Controller method for user registration.
   * Validates the request body, checks if the email is already registered,
   * generates and sends an OTP via email, creates the user, and if the user is an organization admin,
   * creates an organization and associates the user with it.
   * Returns appropriate success or error responses.
   */
  registerPartner: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: false, message: errors.errors[0].msg });
        }

        const checkEmail = await UserDao.findByEmail(req.body.email);
        // Generate OTP and send it via email
        const otp = await otpGenerate();
        const payload = { ...req.body, otp };

        if (checkEmail) {
          if (checkEmail.isVerified) {
            return res.status(400).json({
              status: false,
              message: 'Email already registered.',
            });
          } else {
            const updateOtp = await UserDao.updateUser(payload, checkEmail.id);
            if (!updateOtp) {
              return res.status(400).json({
                status: false,
                message: 'Failed to update OTP.',
              });
            }
            const otpSent = await emailOTP(
              req.body.firstname,
              req.body.email,
              otp
            );
            if (!otpSent) {
              return res.status(400).json({
                status: false,
                message: 'Invalid Email Address',
              });
            }
            return res.status(200).json({
              status: true,
              message:
                'OTP resend to email address, Please check your email for OTP.',
            });
          }
        }

        const otpSent = await emailOTP(req.body.firstname, req.body.email, otp);
        // If OTP sending fails, return error
        if (!otpSent) {
          return res.status(400).json({
            status: false,
            message: 'Invalid Email Address',
          });
        }
        if (payload.role === userRoles.superAdmin) {
          const passkey = req.headers['x-passkey'];
          if (!passkey || passkey !== process.env.PASSKEY) {
            return res
              .status(400)
              .json({ status: false, message: 'Failed to create superAdmin.' });
          }
        }
        // Create user
        const userAdded = await UserDao.create(payload);
        // If user is an organization admin, create organization
        if (payload.role === userRoles.organizationAdmin) {
          let organization = await OrganizationDao.create();
          if (!organization) {
            await UserDao.deleteById(userAdded.dataValues.id); //delete user if organization is not create
            return res.status(400).json({
              status: false,
              message: 'Failed to create organization.',
            });
          }
          let userOrganizationPayload = {
            user: userAdded.dataValues.id,
            organization: organization.dataValues.id,
          };
          let userOrganization = await UserOrganizationDao.create(
            userOrganizationPayload
          );
          if (!userOrganization) {
            return res.status(400).json({
              status: false,
              message: 'Failed to create User-organization.',
            });
          }
          // find all users whose role is superAdmin not through dao
          const superAdmins = await UserDao.findAll(userRoles.superAdmin);
          // a for each loop to send email to all superAdmin
          superAdmins.forEach((superAdmin) => {
            superAdminNotify(
              superAdmin.dataValues.email,
              superAdmin.dataValues.firstname,
              userAdded.dataValues.firstname
            );
          });

          return res.status(200).json({
            status: true,
            message:
              'User registered successfully, Please check your email for OTP.',
          });
        }
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],
  registerClient: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: false, message: errors.errors[0].msg });
        }

        const checkEmail = await UserDao.findByEmail(req.body.email);
        if (checkEmail) {
          return res.status(400).json({
            status: false,
            message: 'Email address is already registered.',
          });
        }

        const otp = await otpGenerate();

        const existingOrganizationUserId =
          await OrganizationDao.getOrganizationByAdminEmail(
            process.env.DEFAULT_ORGANIZATION_EMAIL
          );
        let existingOrganization = await UserOrganizationDao.findByUserId(
          existingOrganizationUserId.dataValues.id
        );
        existingOrganization = existingOrganization.dataValues.organization;
        console.log(existingOrganization);
        const companyPayloadData = {
          name: req.body.companyName,
          city: req.body.city,
          state: req.body.state,
          organization: existingOrganization,
        };
        const createdCompany = await CompanyDao.create(companyPayloadData);

        console.log('step1');
        if (!createdCompany) {
          return res.status(400).json({
            status: false,
            message: 'Failed to create company.',
          });
        }

        console.log('step2');

        const userPayloadData = {
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          role: userRoles.companyAdmin,
          password: req.body.password,
          mobileNo: req.body.mobileNo,
          otp: otp,
        };
        const newUser = await UserDao.create(userPayloadData);
        console.log('step3');
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
        console.log('step4');
        if (!usercompany) {
          return res.status(400).json({
            status: false,
            message: 'Failed to create user-company mapping.',
          });
        }

        if (checkEmail) {
          if (checkEmail.isVerified) {
            return res.status(400).json({
              status: false,
              message: 'Email already registered.',
            });
          } else {
            const updateOtp = await UserDao.updateUser(
              userPayloadData,
              checkEmail.id
            );
            if (!updateOtp) {
              return res.status(400).json({
                status: false,
                message: 'Failed to update OTP.',
              });
            }
            const otpSent = await emailOTP(req.body.name, req.body.email, otp);
            if (!otpSent) {
              return res.status(400).json({
                status: false,
                message: 'Invalid Email Address',
              });
            }
            return res.status(200).json({
              status: true,
              message:
                'User registered successfully, Please check your email for OTP.',
            });
          }
        }

        // Send email to the organization admin by id
        const organizationAdmin =
          await OrganizationDao.findOrgSuperUser(existingOrganization);
        console.log(organizationAdmin.dataValues.User.dataValues.email);
        organizationAdminNotify(
          organizationAdmin.dataValues.User.dataValues.email,
          organizationAdmin.dataValues.User.dataValues.firstname,
          newUser.firstname,
          'Company Admin'
        );

        const otpSent = await emailOTP(req.body.name, req.body.email, otp);
        if (!otpSent) {
          return res.status(400).json({
            status: false,
            message: 'Invalid Email Address',
          });
        }

        return res.status(200).json({
          status: true,
          message:
            'User registered successfully, Please check your email for OTP.',
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],

  /**
   * Enhanced controller method for user authentication and login.
   * Validates request, checks email existence, verifies password, generates token,
   * and for organization admin, checks account approval and updates OTP status if applicable.
   * Returns tailored success or error responses.
   */
  loginUser: [
    async (req, res) => {
      try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        const user = await UserDao.findByEmail(req.body.email);
        if (!user) {
          return res.status(400).json({
            status: false,
            message: 'Invalid Id & Password',
          });
        }
        if (!user.isVerified) {
          return res.status(400).json({
            status: false,
            message: 'Email address is not verified!!',
          });
        }
        // Check if password is valid
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          return res.status(400).json({
            status: false,
            message: 'Invalid Id & Password',
          });
        }

        // If user is organization admin, perform additional checks
        if (
          user.role === userRoles.organizationAdmin ||
          user.role === userRoles.organizationEmployee
        ) {
          // Check if organization account is approved
          const result = await UserOrganizationDao.findByUserId(user.id);

          if (!result.Organization.isApproved) {
            return res.status(400).json({
              status: false,
              message: 'Account not yet approved, Kindly contact admin.',
            });
          }
        }

        if (
          user.role === userRoles.companyAdmin ||
          user.role === userRoles.companyEmployee
        ) {
          // Check if organization account is approved
          const result = await UserCompanyDao.findByUserIdCompany(user.id);

          if (!result.Company.isApproved) {
            return res.status(400).json({
              status: false,
              message:
                'Account not yet approved, Kindly contact OrganizationAdmin.',
            });
          }
        }
        // Update OTP status if applicable
        const otpCheck = await UserDao.findById(user.id);
        const otpPayload = { otp: null, isVerified: true };
        if (otpCheck.otp) {
          await UserDao.updateUser(otpPayload, user.id);
        }

        const forceLogout = req.body.forceLogout ? req.body.forceLogout : false;
        if (forceLogout) {
          const user = await UserDao.findByEmail(req.body.email);
          // await UserDao.updateUser({ currentSessionToken: null }, user.id);
          const token = await getUserToken(user);
          await UserDao.updateUser({ currentSessionToken: token }, user.id);
          return res.status(200).json({
            status: true,
            message: 'login successful.',
            data: { token },
          });
        }

        if (user.currentSessionToken) {
          const currentSessionToken = user.currentSessionToken;
          const decodedToken = jwt.decode(currentSessionToken);
          const expiresIn = decodedToken.exp;
          const currentTime = moment().tz('Asia/Kolkata').unix();
          if (currentTime < expiresIn) {
            return res.status(409).json({
              status: false,
              message: 'Session exists',
              data: { sessionExists: true },
            });
          }
        }

        // Generate token for user
        const token = await getUserToken(user);

        if (!token) {
          return res.status(400).json({
            status: false,
            message: 'Token is missing!',
          });
        }

        await UserDao.updateUser(
          { lastLogin: new Date(), currentSessionToken: token },
          user.id
        );
        return res.status(200).json({
          status: true,
          message: 'login successful.',
          data: { token },
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],

  logoutUser: [
    async (req, res) => {
      try {
        const userId = req.user.id;
        const user = await UserDao.findById(userId);
        if (!user) {
          return res.status(400).json({
            status: false,
            message: 'User does not exist!',
          });
        }
        if (!user.currentSessionToken) {
          return res.status(400).json({
            status: false,
            message: 'User is not logged in!',
          });
        }
        await UserDao.updateUser({ currentSessionToken: null }, userId);
        return res.status(200).json({
          status: true,
          message: 'User logged out successfully!',
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],

  /**
   * Controller method to get user details.
   * Retrieves details of the authenticated user.
   * Sends a response containing the user details or an error message if any.
   */
  me: [
    async (req, res) => {
      try {
        const logInfo = {
          userId: req.user.id,
          DateTime: new Date().toLocaleString(),
          method: req.method,
          message: `${req.user.role} is show own details`,
        };
        logger.info(logInfo);
        res.status(200).json({
          status: true,
          data: { user: req.user },
        });
      } catch (err) {
        res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],
  employee: [
    async (req, res) => {
      try {
        const { id: userId, role } = req.user;
        let dao, id;
        const pageNo = req?.query?.pageNo ? req?.query?.pageNo : 1;
        const name = req.query?.query ? req.query?.query : '';
        const limit = req.query?.limit ? req.query?.limit : 10;
        const offset = (pageNo - 1) * limit;
        if (
          role === userRoles.organizationAdmin ||
          role === userRoles.organizationEmployee
        ) {
          const organization = await OrganizationDao.findOrganization(userId);

          if (!organization) {
            return res.status(400).json({
              status: false,
              message: 'Organization does not exist!',
            });
          }
          dao = OrganizationDao;
          id = organization.organization;
        } else if (
          role === userRoles.companyAdmin ||
          role === userRoles.companyEmployee
        ) {
          const company = await CompanyDao.findCompany(userId);
          if (!company) {
            return res.status(400).json({
              status: false,
              message: 'Company does not exist!',
            });
          }
          dao = CompanyDao;
          id = company.company;
        } else {
          return res
            .status(400)
            .json({ status: false, message: 'Invalid user role!' });
        }

        const employeeList = await dao.findEmployee(id, name, limit, offset);
        const employeeCount = await dao.findCountEmployee(id, name);

        res.status(200).json({
          status: true,
          data: {
            list: employeeList,
            total: employeeCount,
            next: employeeCount > (pageNo - 1) * limit + limit,
          },
        });
      } catch (error) {
        res.status(400).json({
          status: false,
          message: error.message,
        });
      }
    },
  ],

  /**
   * Controller method for verifying user's email.
   * Validates email and OTP, updates verification status, and sends confirmation email upon success.
   * Returns appropriate error responses for invalid input or if user is already verified.
   */
  verifyEmail: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        // Check if user exists with the provided email
        const checkEmail = await UserDao.findByEmail(req?.body?.email);
        if (!checkEmail) {
          return res.status(400).json({
            status: false,
            message: 'No user exists',
          });
        }
        // Update user's verification status and send confirmation email
        if (checkEmail?.dataValues?.isVerified) {
          return res.status(400).json({
            status: false,
            message: 'User is already verified!',
          });
        }
        if (checkEmail.dataValues?.otp !== req?.body?.otp) {
          return res.status(400).json({
            status: false,
            message: 'Invalid OTP',
          });
        }

        const otpPayload = { otp: null, isVerified: true };
        await UserDao.updateUser(otpPayload, checkEmail.dataValues.id);
        mailSuccessfullyRegisterUser(checkEmail?.dataValues);

        return res.status(200).json({
          status: true,
          message: 'Email verified!!',
        });
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: error.message,
        });
      }
    },
  ],

  /**
   * Controller method for verifying user's otp.
   * Validates email and OTP, updates verification status, and sends confirmation email upon success.
   * Returns appropriate error responses for invalid input or if user is enter wrong otp.
   */
  verifyOtp: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        // Check if user exists with the provided email
        const checkEmail = await UserDao.findByEmail(req?.body?.email);
        if (!checkEmail) {
          return res.status(400).json({
            status: false,
            message: 'No user exists',
          });
        }

        if (checkEmail.dataValues?.otp !== req?.body?.otp) {
          return res.status(400).json({
            status: false,
            message: 'Invalid OTP',
          });
        }

        return res.status(200).json({
          status: true,
          message: 'OTP verified successfully!!',
        });
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: error.message,
        });
      }
    },
  ],

  /**
   * Controller method for handling user's forgot password request.
   * Validates email, sends OTP to reset password, and updates user's OTP in the database.
   * Returns appropriate error responses for invalid input or if the user is not found.
   */
  forgotPassword: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }

        const email = req.body?.email;
        const user = await UserDao.findByEmail(email);
        if (!user) {
          return res.status(400).json({
            status: false,
            message: 'User does not exists',
          });
        }
        const userId = user?.dataValues?.id;
        const otp = await otpGenerate();
        const otpSent = await mailUserForgotPasswordOTP(email, otp);
        if (!otpSent) {
          return res.status(400).json({
            status: false,
            message: 'Invalid email',
          });
        }
        // Update user's OTP in the database
        const setOtp = await UserDao.updateUser({ otp }, userId);
        if (!setOtp) {
          return res.status(400).json({
            status: false,
            message: 'Something Went Wrong!!',
          });
        }
        const currentOtp = user?.dataValues?.otp;
        const message = currentOtp
          ? 'OTP resent to email address.'
          : 'OTP sent to email address.';
        return res.status(200).json({
          status: true,
          message,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],

  /**
   * Controller method to update password after forgetting it.
   * Validates the provided email and OTP, then updates the user's password.
   * Sends appropriate error responses for invalid input or if the OTP verification fails.
   */
  updateForgotPassword: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }

        // Find user by email and verify OTP
        const email = req?.body?.email;
        const otp = req?.body?.otp;
        let newPassword = req?.body?.newPassword;
        const user = await UserDao.findByEmail(email);
        if (!user) {
          return res.status(400).json({
            status: false,
            message: 'Invalid Email !!',
          });
        }
        if (user?.dataValues?.otp !== otp) {
          return res.status(400).json({
            status: false,
            message: 'Invalid OTP !!',
          });
        }
        const userId = user?.dataValues?.id;
        await bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, async (err, hash) => {
            const userPayload = {
              password: hash,
              otp: null,
              isEmailVerified: true,
            };
            const updateUserPassword = UserDao.updateUser(userPayload, userId);
            if (!updateUserPassword) {
              return res.status(400).json({
                status: false,
                message: 'Something went wrong!!',
              });
            }
            return res.status(200).json({
              status: true,
              message: 'Password updated successfully!!',
            });
          });
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],

  /**
   * Controller method for updating user's password.
   * Validates current password, generates new hashed password, and updates user's password in the database.
   * Sends appropriate error responses for user not found, invalid current password, or password update errors.
   */
  updatePassword: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        const userId = req.user.id;
        const checkUser = await UserDao.findById(userId);
        if (!checkUser) {
          return res.status(400).json({
            status: false,
            message: 'user does not exist!',
          });
        }
        const { newPassword, oldPassword } = req.body;

        const validPassword = await bcrypt.compare(
          oldPassword,
          checkUser.password
        );
        if (!validPassword) {
          return res.status(400).json({
            status: false,
            message: 'Invalid Current password',
          });
        }
        // Generate new hash for new password and update user's password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, async (err, hash) => {
            const updatePassword = await UserDao.updateUser(
              { password: hash },
              userId
            );
            if (updatePassword) {
              return res.status(200).json({
                status: true,
                message: 'Password updated successfully!!',
              });
            }
            if (err) {
              return res.status(400).json({
                status: false,
                message: err,
              });
            }
          });
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],

  updateUser: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }

        const userId = req.user.id;
        const userDetails = req.body;
        const updateUser = await UserDao.updateUser(userDetails, userId);
        if (updateUser) {
          return res.status(200).json({
            status: true,
            message: 'user updated successfully!',
          });
        }
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],
  updateEmail: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        const { newEmail } = req.body;

        const existingUser = await UserDao.findByEmail(newEmail);
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'Email already exists',
          });
        }
        const emailUpdatePayload = {
          id: req.user.id,
          oldEmail: req.user.email,
          newEmail: newEmail,
        };
        const emailToken = await getEmailUpdateToken(emailUpdatePayload);
        const url = `${process.env.INVITATION_LINK}/verify?${emailToken}`;
        const emailSent = await sendEmailUpdateRequest(newEmail, url);
        if (emailSent) {
          return res.status(200).json({
            success: true,
            message: 'Check your email for the update confirmation!',
          });
        }
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: err?.message,
        });
      }
    },
  ],
  verifiedChangeEmail: [
    async (req, res) => {
      try {
        const { id, newEmail } = req.user;

        const existingUser = await UserDao.findByEmail(newEmail);
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'Email already updated!!',
          });
        }
        const emailPayload = {
          email: newEmail,
        };

        const updateEmail = await UserDao.updateUser(emailPayload, id);

        if (updateEmail) {
          return res.status(200).json({
            status: true,
            message:
              'Your email has been updated successfully. Please login with your new email.',
          });
        }
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: err?.message,
        });
      }
    },
  ],
  dashboard: [
    async (req, res) => {
      try {
        const role = req.user.role;
        let dashboardAnalysis = {};
        if (role === userRoles.superAdmin) {
          const organizationCount = await UserDao.dashBoardOrganizationCount();
          const companyCount = await UserDao.dashBoardCompanyCount();
          const organizationActivecount =
            await UserDao.getOrganizationLastLoginCount();
          const organizationUnactivecount =
            await UserDao.getOrganizationLastLoginUnactiveCount();
          const companyUserActivecount =
            await UserDao.getCompanyLastLoginCount();
          const companyUserUnactivecount =
            await UserDao.getCompanyUnactiveLastLoginCount();

          if (!organizationCount || !companyCount) {
            return res.status(400).json({
              status: false,
              message: 'Failed to retrieve organization or company count',
            });
          }

          dashboardAnalysis = {
            organizationCount,
            companyCount,
            organizationActivecount,
            organizationUnactivecount,
            companyUserActivecount,
            companyUserUnactivecount,
          };
        } else if (role === userRoles.organizationAdmin) {
          const organization = await OrganizationDao.findOrganization(
            req.user.id
          );
          const companyCount = await CompanyDao.dashboardCompanyCount(
            organization.organization
          );

          if (!organization || !companyCount) {
            return res.status(400).json({
              status: false,
              message: 'Failed to retrieve organization or company count',
            });
          }
          const companyIds = await CompanyDao.getCompanyIdArrayByOrganization(
            organization.organization
          );
          const companyUserActiveCount =
            await CompanyDao.getActiveUsersByOrganization(companyIds[0].ids);
          const companyUserUnactiveCount =
            await CompanyDao.getUnactiveUsersByOrganization(companyIds[0].ids);
          dashboardAnalysis = {
            companyCount,
            companyUserActiveCount,
            companyUserUnactiveCount,
          };
        }
        return res.status(200).json({
          status: 200,
          data: dashboardAnalysis,
        });
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: err?.message,
        });
      }
    },
  ],

  deleteEmployee: [
    async (req, res) => {
      try {
        //   Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: false, message: errors.errors[0].msg });
        }

        // Find the user by Id
        const user = await UserDao.findById(req.params.id);
        if (!user) {
          return res
            .status(404)
            .json({ status: false, message: 'User not found.' });
        }

        const userRole = [userRoles.companyAdmin, userRoles.organizationAdmin];
        if (userRole.includes(user.role)) {
          return res
            .status(500)
            .json({ status: false, message: 'You can not delete admin.' });
        }
        const softDelete = {
          deletedAt: new Date(),
        };
        //Delete employess
        const userDeleted = await UserDao.updateUser(softDelete, user.id);
        if (!userDeleted) {
          return res
            .status(400)
            .json({ status: false, message: 'Failed to delete user.' });
        }

        return res
          .status(200)
          .json({ status: true, message: 'User deleted successfully.' });
      } catch (err) {
        return res.status(400).json({ status: false, message: err?.message });
      }
    },
  ],
  blogUpload: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: false, message: errors.errors[0].msg });
        }
        const { title, content } = req.body;
        const blogPayload = {
          title,
          content,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const blog = await BlogDao.create(blogPayload);
        if (!blog) {
          return res
            .status(400)
            .json({ status: false, message: 'Failed to create blog.' });
        }
        return res
          .status(200)
          .json({ status: true, message: 'Blog created successfully.' });
      } catch (err) {
        return res.status(400).json({ status: false, message: err?.message });
      }
    },
  ],
  getPresignedUrl: [
    async (req, res) => {
      try {
        const { fileCategory } = req.body;
        const uploadData = await getUploadUrl(fileCategory);
        if (!uploadData) {
          return res
            .status(400)
            .json({ status: false, message: 'Error uploading file' });
        }
        return res.status(200).json({
          status: true,
          message: 'Presigned URL generated successfully',
          data: uploadData,
        });
      } catch (err) {
        return res.status(400).json({ status: false, message: err.message });
      }
    },
  ],
  updateBlog: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: false, message: errors.errors[0].msg });
        }
        const blogId = req.params.id;
        const { title, content, image } = req.body;
        const blogPayload = {
          title,
          content,
          image,
          updatedAt: new Date(),
        };
        const blog = await BlogDao.update(blogId, blogPayload);
        if (!blog) {
          return res
            .status(400)
            .json({ status: false, message: 'Failed to update blog.' });
        }
        return res
          .status(200)
          .json({ status: true, message: 'Blog updated successfully.' });
      } catch (err) {
        return res.status(400).json({ status: false, message: err?.message });
      }
    },
  ],
  getAllBlog: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: false, message: errors.errors[0].msg });
        }
        const blog = await BlogDao.findAll();
        if (!blog) {
          return res
            .status(400)
            .json({ status: false, message: 'Failed to get blog.' });
        }
        return res.status(200).json({ status: true, data: blog });
      } catch (err) {
        return res.status(400).json({ status: false, message: err?.message });
      }
    },
  ],
  getBlogById: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: false, message: errors.errors[0].msg });
        }
        const blogId = req.params.id;
        const blog = await BlogDao.findOne(blogId);
        if (!blog) {
          return res
            .status(400)
            .json({ status: false, message: 'Failed to get blog.' });
        }
        return res.status(200).json({ status: true, data: blog });
      } catch (err) {
        return res.status(400).json({ status: false, message: err?.message });
      }
    },
  ],
};
