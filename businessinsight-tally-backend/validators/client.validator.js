import { query } from 'express-validator';

export const clientValidator = function (method) {
  switch (method) {
    case 'pagination': {
      return [
        query('isApproved')
          .optional()
          .default(true)
          .isBoolean()
          .withMessage('isApproved must be a boolean value'),
        query('isActive')
          .optional()
          .default(true)
          .isBoolean()
          .withMessage('isActive must be a boolean value'),
        query('query')
          .optional()
          .isString()
          .withMessage('Name or email must be a string'),
        query('limit')
          .optional()
          .isInt({ min: 1 })
          .withMessage('Limit must be a positive integer'),
        query('pageNo')
          .optional()
          .isInt({ min: 1 })
          .withMessage('PageNo must be a positive integer'),
      ];
    }
  }
};
