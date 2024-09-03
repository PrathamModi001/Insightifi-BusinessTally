import { OrganizationDao } from '../dao/organization.dao.js';
import { PaymentDao } from '../dao/payment.dao.js';
import { validationResult } from 'express-validator';
import { userRoles } from '../utils/helper.js';

export const paymentController = {
  getAnalysisData: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          message: errors.array()[0].msg,
        });
      }

      const { id: userId } = req.user;

      const { organization: organizationId } =
        await OrganizationDao.findOrganization(userId);

      const [
        incomethisMonth,
        overviewRevenue,
        getCompanyAmounts,
        getCompanyAmountsByCity,
        getUsersStatusCounts,
      ] = await Promise.all([
        PaymentDao.incomeMonth(organizationId),
        PaymentDao.overviewRevenue(organizationId),
        PaymentDao.getCompanyAmounts(organizationId),
        PaymentDao.getCompanyAmountsByCity(organizationId),
        OrganizationDao.getUsersStatusCounts(organizationId),
      ]);

      const data = {
        incomethisMonth,
        overviewRevenue,
        getCompanyAmounts,
        getCompanyAmountsByCity,
        getUsersStatusCounts,
      };
      if (req.user.role === userRoles.organizationAdmin) {
        return res.json({
          status: true,
          data,
        });
      } else {
        return res.json({
          status: true,
          data: {
            getUsersStatusCounts,
          },
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err?.message || 'Error fetching analysis data.',
      });
    }
  },
};
