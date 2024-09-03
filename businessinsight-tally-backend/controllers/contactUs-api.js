import { ContactUsDao } from '../dao/contactUs.dao.js';
import { validationResult } from 'express-validator';
import { logger } from '../app.js';
import {
  superAdminContactUsNotify,
  whitePaperSendMail,
} from '../utils/mailUtils.js';
import { User } from '../models/user.model.js';

export const contactUsController = {
  contactUs: [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: false,
            message: errors.errors[0].msg,
          });
        }
        const contactUs = await ContactUsDao.create(req.body);

        const superAdmins = await User.findAll({
          where: { role: 'superAdmin' },
        });
        if (!superAdmins) {
          return res.status(404).json({
            status: false,
            message: 'Super Admin not found.',
          });
        }

        // for each loop
        superAdmins.forEach((superAdmin) => {
          superAdminContactUsNotify(superAdmin.email, contactUs);
        });

        // send mail to the user
        whitePaperSendMail(req.body.email, req.body.firstName);

        return res.json({
          status: true,
          message: 'Feedback submitted successfully.',
        });
      } catch (err) {
        logger.error(err);
        return res.status(500).json({
          status: false,
          message:
            err?.message ||
            'Internal server error. Something went wrong on the server side.',
        });
      }
    },
  ],
};
