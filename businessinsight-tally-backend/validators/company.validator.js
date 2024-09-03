import { body } from 'express-validator';

export const companyValidator = function (method) {
  switch (method) {
    case 'companyUpdate': {
      return [
        body('name', 'Invalid name!')
          .optional()
          .custom((value) => isNaN(value.trim()))
          .withMessage('Name cannot be a number!')
          .isLength({ min: 2 })
          .withMessage('Name must be at least 2 characters long!')
          .notEmpty()
          .withMessage('Name is required!')
          .trim(),

        body('state', 'Invalid state!')
          .optional()
          .custom((value) => isNaN(value.trim()))
          .withMessage('State cannot be a number!')
          .isLength({ min: 2 })
          .withMessage('state name must be at least 2 characters long!')
          .notEmpty()
          .withMessage('State is required!')
          .trim(),

        body('city', 'Invalid city!')
          .optional()
          .custom((value) => isNaN(value.trim()))
          .withMessage('City cannot be a number!')
          .isLength({ min: 2 })
          .withMessage('City must be at least 2 characters long!')
          .notEmpty()
          .withMessage('City is required!')
          .trim(),
      ];
    }
  }
};
