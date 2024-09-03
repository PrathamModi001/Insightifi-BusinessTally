import { PowerBiDashboardsDao } from '../dao/powerbidashboard.dao.js';
import { UserCompany } from '../models/userCompany.model.js';
import { UserOrganization } from '../models/userOrganization.model.js';
import { userRoles } from '../utils/helper.js';
import { validationResult } from 'express-validator';

export const powerBiDashboardController = {
  getPowerBiDashboards: [
    async (req, res) => {
      try {
        const { id: userId, role } = req.user;
        let dashboard, dashboardCount;
        const isActive = req?.query?.isActive ? req.query.isActive : true;
        const pageNo = req?.query?.pageNo ? req?.query?.pageNo : 1;
        const limit = req?.query?.limit ? req?.query?.limit : 10;
        const name = req?.query?.query ? req?.query?.query : '';
        if (
          role === userRoles.companyAdmin ||
          role === userRoles.companyEmployee
        ) {
          const userCompany = await UserCompany.findOne({
            where: { user: userId },
          });

          if (!userCompany) {
            return res.status(400).json({
              status: false,
              message: 'User not associated with any company!',
            });
          }
          dashboard = await PowerBiDashboardsDao.getByCompanyId(
            isActive,
            userCompany.company,
            pageNo,
            limit
          );
          dashboardCount = await PowerBiDashboardsDao.getByCompanyIdCount(
            isActive,
            userCompany.company
          );
        } else if (
          role === userRoles.organizationAdmin ||
          role === userRoles.organizationEmployee
        ) {
          const userOrganization = await UserOrganization.findOne({
            where: { user: userId },
          });

          if (!userOrganization) {
            return res.status(400).json({
              status: false,
              message: 'User not associated with any company!',
            });
          }
          dashboard = await PowerBiDashboardsDao.getByOrganizationId(
            isActive,
            userOrganization.organization,
            pageNo,
            limit
          );
          dashboardCount = await PowerBiDashboardsDao.getByOrganizationIdCount(
            isActive,
            userOrganization.organization
          );
        } else if (role === userRoles.superAdmin) {
          dashboard = await PowerBiDashboardsDao.getListCompanyPowerbi(
            isActive,
            name,
            pageNo,
            limit
          );
          dashboardCount =
            await PowerBiDashboardsDao.getListCompanyPowerbiCount(
              isActive,
              name
            );
        }
        res.json({
          status: true,
          data: {
            list: dashboard,
            total: dashboardCount,
            next: dashboardCount > (pageNo - 1) * limit + limit,
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
  addPowerBiDashboard: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ status: false, message: errors.errors[0].msg });
        }
        const { companyId, dashboardId } = req.body;

        const existingDashboard =
          await PowerBiDashboardsDao.findCompany(companyId);
        if (existingDashboard) {
          return res.status(400).json({
            status: false,
            message: 'Company dashboard already exist!!',
          });
        }

        const payload = {
          dashboard: dashboardId,
          company: companyId,
        };

        const dashboardBi = await PowerBiDashboardsDao.create(payload);

        if (!dashboardBi) {
          return res.status(400).json({
            status: false,
            message: 'Failed to create Power BI dashboard.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Power BI dashboard created successfully.',
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],
  updatePowerBi: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            mes: 'this is validator',
            message: errors.errors[0].msg,
          });
        }
        const id = req.params.id;
        const dashboardPayload = req.body;

        // Check if Power BI dashboard with given ID exists
        const existingDashboard =
          await PowerBiDashboardsDao.findPowerBiDashboard(id);
        if (!existingDashboard) {
          return res.status(404).json({
            status: false,
            message: 'Power BI dashboard not found.',
          });
        }

        if (dashboardPayload.dashboard) {
          const existingDashId = await PowerBiDashboardsDao.findBiDashId(
            dashboardPayload.dashboard
          );
          if (existingDashId) {
            return res.status(400).json({
              status: false,
              message: 'The DashboardId already exists for another company.',
            });
          }
        }
        const updatePowerBi = await PowerBiDashboardsDao.updatePowerBiDashboard(
          id,
          dashboardPayload
        );
        if (!updatePowerBi) {
          return res.status(400).json({
            status: false,
            message: 'Failed to update dashboardBi.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Update Power BI Dashboard successfully.',
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          mes: 'this is catch',
          message: err?.message,
        });
      }
    },
  ],
  deletePowerBi: [
    async (req, res) => {
      try {
        const id = req?.params?.id;

        const existingDashboard =
          await PowerBiDashboardsDao.findPowerBiDashboard(id);
        if (!existingDashboard) {
          return res.status(404).json({
            status: false,
            message: 'Power BI Dashboard with the specified ID does not exist.',
          });
        }
        const deletePowerBi =
          await PowerBiDashboardsDao.deletePowerBiDashboard(id);
        if (!deletePowerBi) {
          return res.status(400).json({
            status: false,
            message: 'Failed to delete dashboardBi.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Delete powerBidashboard sucessfuly!!.',
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err?.message,
        });
      }
    },
  ],
};
