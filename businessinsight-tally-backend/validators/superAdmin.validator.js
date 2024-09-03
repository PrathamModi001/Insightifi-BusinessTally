import { body, param } from 'express-validator';

export const superAdminValidator = function (method) {
  switch (method) {
    case 'validateIsVerifiedField':
      return [
        param('id', 'ID is required and must be numeric.')
          .notEmpty()
          .isNumeric()
          .withMessage('ID must be numeric.'),
        body('isApproved')
          .isBoolean()
          .withMessage('isApproved must be a boolean value'),
      ];
  }
};
