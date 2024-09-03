import { CompanyDao } from '../dao/company.dao.js'; // Import the DAO (Data Access Object) responsible for interacting with the Company model
import { validationResult } from 'express-validator';
import { UserOrganization } from '../models/userOrganization.model.js';
import { logTypes, userRoles } from '../utils/helper.js';
import { logger } from '../app.js';
import { OrganizationDao } from '../dao/organization.dao.js';

export const companyController = {
  companyList: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }

        const userOrganization = await UserOrganization.findOne({
          where: { user: req.user.id },
        });
        if (!userOrganization) {
          return res.status(400).json({
            status: false,
            message: 'organization is not found!',
          });
        }
        const isApproved = req?.query?.isApproved ? req.query.isApproved : true;
        const OrganizationId = userOrganization.organization; //organizationId (token)
        const pageNo = req?.query?.pageNo ? req?.query?.pageNo : 1;
        const name = req.query?.query ? req.query?.query : '';
        const limit = req.query?.limit ? req.query?.limit : 10;

        const companies = await CompanyDao.getCompanyByOrganizationId(
          isApproved,
          OrganizationId,
          name,
          limit,
          pageNo
        );

        const companyCount = await CompanyDao.getCompanyCountByOrganizationId(
          isApproved,
          OrganizationId,
          name
        );
        return res.json({
          status: true,
          data: {
            list: companies,
            total: companyCount?.[0]?.count ?? 0,
            next: companyCount?.[0]?.count > (pageNo - 1) * limit + limit,
          },
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message || 'error fetching companies!!',
        });
      }
    },
  ],
  updateCompany: [
    async (req, res) => {
      const { id: userId, role } = req.user;
      const logInfo = {
        userId,
        endpoint: '/updateCompany',
        role,
        type: logTypes.Update,
        method: req.method,
      };

      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessage = errors.errors[0].msg;
          logger.error({ ...logInfo, message: errorMessage });
          return res.status(400).json({ status: false, message: errorMessage });
        }

        let companyId;
        let companyPayloadData = {};

        const { isApproved, organization, ...restPayload } = req.body;
        if (role === userRoles.companyAdmin) {
          if (isApproved !== undefined && typeof isApproved !== 'boolean') {
            const errorMessage = 'isApproved must be a boolean if defined.';
            logger.error({ ...logInfo, message: errorMessage });
            return res
              .status(400)
              .json({ status: false, message: errorMessage });
          }

          if (organization) {
            const errorMessage = "You can't update organization!";
            logger.error({ ...logInfo, message: errorMessage });
            return res
              .status(400)
              .json({ status: false, message: errorMessage });
          }

          const company = await CompanyDao.findCompany(userId);

          if (!company) {
            logger.error({ ...logInfo, message: 'errorMessage' });
            return res
              .status(400)
              .json({ status: false, message: 'Company is not found!' });
          }
          companyPayloadData = restPayload;
          companyId = company.company;
        } else if (
          role === userRoles.organizationAdmin ||
          role === userRoles.organizationEmployee
        ) {
          if (req.body.organization) {
            logger.error({ ...logInfo, message: 'errorMessage' });
            return res.status(400).json({
              status: false,
              message: "You can't update organization!",
            });
          }
          companyId = req.body.companyId;
          const company = await CompanyDao.findCompanyById(companyId);
          const organization = await OrganizationDao.findOrganization(userId);
          if (
            !company ||
            !organization ||
            company.organization !== organization.organization
          ) {
            return res.status(400).json({
              success: false,
              message: 'Invalid company ID or unauthorized!',
            });
          }
          companyPayloadData = {
            ...restPayload, // Spread the rest of the payload properties
            isApproved: req.body.isApproved,
          };
        }
        const updateCompany = await CompanyDao.updateCompany(
          companyPayloadData,
          companyId
        );

        if (!updateCompany) {
          logger.error({ ...logInfo, message: 'errorMessage' });
          return res
            .status(400)
            .json({ status: false, message: 'Company is not updated!' });
        }
        logger.info({ ...logInfo, message: 'Company updated successfully' });
        return res
          .status(200)
          .json({ status: true, message: 'Company updated successfully!' });
      } catch (err) {
        logger.error({ ...logInfo, message: err?.message });
        return res.status(400).json({ status: false, message: err?.message });
      }
    },
  ],
  getCompany: [
    async (req, res) => {
      try {
        let company, companyCount;
        const { role } = req.user;
        const pageNo = req?.query?.pageNo ? req?.query?.pageNo : 1;
        const limit = req?.query?.limit ? req?.query?.limit : 10;
        const name = req?.query?.name ? req?.query?.name : '';
        if (
          role === userRoles.companyAdmin ||
          role === userRoles.companyEmployee
        ) {
          company = await CompanyDao.getCompanyByuserId(true, req.user.id);

          if (!company) {
            return res.status(400).json({
              status: false,
              message: 'No company found!',
            });
          }
        } else if (role === userRoles.superAdmin) {
          company = await CompanyDao.getCompany(name, limit, pageNo);
          if (!company) {
            return res.status(400).json({
              status: false,
              message: 'No company found!',
            });
          }
          companyCount = await CompanyDao.getCompanyCount(name);
        }
        return res.json({
          status: true,
          data: {
            list: company,
            total: companyCount,
            next: companyCount > (pageNo - 1) * limit + limit,
          },
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message || 'error fetching company!!',
        });
      }
    },
  ],
  getCompanyById: [
    async (req, res) => {
      try {
        const companyId = req.params.id;
        const company = await CompanyDao.findCompanyById(companyId);
        if (!company) {
          return res.status(400).json({
            status: false,
            message: 'No company found!',
          });
        }
        return res.json({
          status: true,
          data: { company },
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message || 'error fetching company!!',
        });
      }
    },
  ],
};
