import { logger } from '../app.js';
import { OrganizationDao } from '../dao/organization.dao.js';
import { UserOrganizationDao } from '../dao/userOrganization.dao.js';
import { validationResult } from 'express-validator';
import { logTypes } from '../utils/helper.js';
import { approvedUserNotify } from '../utils/mailUtils.js';

export const organizationController = {
  getUserOrganization: [
    async (req, res) => {
      try {
        const pageNo = req?.query?.pageNo ? req?.query?.pageNo : 1;
        const name = req.query?.query ? req.query?.query : '';
        const limit = req.query?.limit ? req.query?.limit : 10;
        const offset = (pageNo - 1) * limit;
        const userOrganizations =
          await UserOrganizationDao.findOrganizationUser(name, limit, offset);

        if (!userOrganizations) {
          return res.status(400).json({
            status: false,
            message: 'Organization is not found!',
          });
        }
        const userOrganizationsCount =
          await UserOrganizationDao.findOrganizationUserCount(name);

        if (!userOrganizationsCount) {
          return res.status(400).json({
            status: false,
            message: 'User Organization is not found!',
          });
        }

        res.status(200).json({
          status: true,
          data: {
            list: userOrganizations,
            total: userOrganizationsCount?.[0]?.count ?? 0,
            next:
              userOrganizationsCount?.[0]?.count > (pageNo - 1) * limit + limit,
          },
        });
      } catch (err) {
        res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],
  updateOrganization: [
    async (req, res) => {
      const logerInfo = {
        userId: req.user.Id,
        endpoint: '/updateOrganization',
        method: req.method,
        type: logTypes.Approve,
      };
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        const { id } = req.params;
        const payload = req.body;
        const updateOrganization = await OrganizationDao.updateOrganization(
          id,
          payload
        );
        if (!updateOrganization) {
          logger.error({
            ...logerInfo,
            message: ' Failed to update organization.',
          });
          return res.status(400).json({
            status: false,
            message:
              'Internal server error. Failed to isApproved update organization',
          });
        }
        logger.info({
          ...logerInfo,
          message: 'Organization updated successfully',
        });
        const organization = await OrganizationDao.findOrgSuperUser(id);
        approvedUserNotify(
          organization?.dataValues?.User?.dataValues?.email,
          organization?.dataValues?.User?.dataValues?.firstname
        );
        return res.status(200).json({
          status: true,
          message: 'Updated successfully',
        });
      } catch (err) {
        logger.error({
          ...logerInfo,
          message: err?.message || 'Error updating organization!',
        });
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],
};
