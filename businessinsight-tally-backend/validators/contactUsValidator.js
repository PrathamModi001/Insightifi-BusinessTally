import { body } from 'express-validator';

export const contactUsValidator = function (method) {
  switch (method) {
    case 'contactUs': {
      return [
        body('firstName', 'Invalid first name!')
          .isLength({ min: 2 })
          .withMessage('First name must be at least 2 characters long!')
          .notEmpty()
          .withMessage('First name is required!')
          .trim(),

        body('lastName', 'Invalid last name!')
          .isLength({ min: 2 })
          .withMessage('Last name must be at least 2 characters long!')
          .notEmpty()
          .withMessage('Last name is required!')
          .trim(),

        body('email', 'Invalid email!')
          .isEmail()
          .withMessage('Invalid email address!')
          .notEmpty()
          .withMessage('Email is required!')
          .trim(),

        body('message', 'Invalid message!')
          .isLength({ min: 10 })
          .withMessage('Message must be at least 10 characters long!')
          .notEmpty()
          .withMessage('Message is required!')
          .trim(),
        body('phoneNumber', 'Invalid phone number!')
          .isMobilePhone('any')
          .withMessage('Invalid phone number!')
          .optional()
          .trim(),
      ];
    }
  }
};
