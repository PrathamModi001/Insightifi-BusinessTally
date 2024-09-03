import { body } from 'express-validator';
import moment from 'moment';

export const requestUsValidator = function (method) {
  switch (method) {
    case 'requestUs': {
      return [
        body('name', 'Invalid first name!')
          .isLength({ min: 2 })
          .withMessage('Name must be at least 2 characters long!')
          .notEmpty()
          .withMessage('Name is required!')
          .trim(),

        body('email', 'Invalid email!')
          .isEmail()
          .withMessage('Invalid email address!')
          .notEmpty()
          .withMessage('Email is required!')
          .trim(),

        body('phone', 'Invalid mobile no!')
          .optional()
          .isString()
          .isLength({ min: 10, max: 10 })
          .custom((value) => value !== '00')
          .custom((value) => value[0] !== '0')
          .withMessage('Mobile number cannot start with 0')
          .withMessage('Mobile number cannot consist of all "00"s'),
        body('company_name', 'Invalid first name!')
          .isLength({ min: 2 })
          .withMessage('Company name must be at least 2 characters long!')
          .notEmpty()
          .withMessage('Company name is required!')
          .trim(),
        body('date')
          .notEmpty()
          .withMessage('Demo date is required!')
          .bail() // If not empty, continue to the next check
          .custom((value) => {
            return moment(value, 'MM/DD/YYYY', true).isValid();
          })
          .withMessage('Invalid date format! Use MM/DD/YYYY.')
          .trim(),
      ];
    }
  }
};
