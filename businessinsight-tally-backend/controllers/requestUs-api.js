import { validationResult } from 'express-validator';
import { RequestUsDao } from '../dao/requestUs.dao.js';
import { statusCode, statusMessage } from '../config/statusConfig.js';
import { sendMailToClient, sendMailToSuperAdmin } from '../utils/mailUtils.js';
import { userRoles } from '../utils/helper.js';
import { UserDao } from '../dao/user.dao.js';
export const requestUsController = {
  createRequestUs: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(statusCode.badRequest).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        const requestUs = await RequestUsDao.create(req.body);
          if(!requestUs) {
            return res.status(statusCode.badRequest).json({
              status: false,
              message: 'Failed to create request demo.',
            });
          }
        sendMailToClient(req.body.email);
        const superAdmins = await UserDao.findAll(userRoles.superAdmin);
        superAdmins.forEach((superAdmin) => {
          sendMailToSuperAdmin(superAdmin.dataValues.email);
        });
        return res.status(statusCode.created).json({
          status: true,
          message: `Request ${statusMessage.created}`,
          data: requestUs,
        });
      } catch (err) {
        return res.status(statusCode.internalServerError).json({
          status: false,
          message: statusMessage.internalServerError,
        });
      }
    },
  ],

  updateStatus: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(statusCode.badRequest).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        const requestId = req.params.id;
        const request = await RequestUsDao.findById(requestId);
        if (!request) {
          return res
            .status(statusCode.notFound)
            .json({ message: 'Request not found' });
        }

        const updated = await RequestUsDao.updateStatus(req.body, requestId);
        if (!updated) {
          return res
            .status(statusCode.badRequest)
            .json({ message: 'Failed to update status' });
        }
        
          return res
            .status(statusCode.badRequest)
            .json({ message: 'Status updated successfully' });
        
      } catch (error) {
        return res
          .status(statusCode.internalServerError)
          .json({ message: statusMessage.internalServerError, error });
      }
    },
  ],
  getAllDemoRequest: [
    async (_, res) => {
      try {
        const requests = await RequestUsDao.allRequestDemo();
        return res.status(statusCode.success).json({
          status: true,
          message: 'Demo requests retrieved successfully',
          data: requests,
        });
      } catch (error) {
        console.error('Error fetching demo requests:', error); // Log the error for debugging
        return res.status(statusCode.internalServerError).json({
          status: false,
          message: statusMessage.internalServerError,
        });
      }
    },
  ],
};
