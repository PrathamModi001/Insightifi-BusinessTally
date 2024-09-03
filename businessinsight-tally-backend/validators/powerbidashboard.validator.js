import { body, param } from 'express-validator';

export const powerbiValidator = function (method) {
  switch (method) {
    case 'powerbiAdd': {
      return [
        body('dashboardId', 'Invalid dashboard id!')
          .notEmpty()
          .withMessage('Dashboard ID must not be empty'),
        body('companyId', 'Invalid companyId!')
          .notEmpty()
          .withMessage('Company ID must not be empty')
          .isInt()
          .withMessage('Company ID must be an integer.'),
      ];
    }
    case 'updatePowerBi': {
      return [
        param('id', 'ID is required and must be numeric.')
          .notEmpty()
          .withMessage('ID must not be empty')
          .isNumeric()
          .withMessage('ID must be numeric.'),
        body('dashboard', 'Invalid dashboardId').optional().isString(),
        body('isActive', 'Invalid isActive')
          .optional()
          .isBoolean()
          .withMessage('isActive must be a boolean value.'),
        body('company')
          .optional()
          .isNumeric()
          .withMessage('CompanyId must be numeric.'),
      ];
    }
  }
};
