import { body } from 'express-validator';

export const inviteValidator = function (method) {
  switch (method) {
    case 'inviteSend': {
      return [
        body('email', 'Invalid email!').notEmpty().isEmail(),
        body('firstname', 'Invalid first name!')
          .notEmpty()
          .isString()
          .withMessage('First name must be a string!')
          .isLength({ min: 2 })
          .withMessage('First name must be at least 2 characters long!')
          .custom((value) => !/\d/.test(value))
          .withMessage('First name cannot contain numbers!')
          .custom((value) => value.trim() !== ''),
        // .withMessage('First name cannot be empty or whitespace')
        // .matches(
        //   /^[A-Za-z]+$/,
        //   'First name must contain only alphabetic characters'
        // ),
        body('lastname', 'Invalid last name!')
          .notEmpty()
          .isString()
          .withMessage('Last name must be a string!')
          .isLength({ min: 2 })
          .withMessage('Last name must be at least 2 characters long!')
          .custom((value) => !/\d/.test(value))
          .withMessage('Last name cannot contain numbers!')
          .custom((value) => value.trim() !== ''),
        // .withMessage('Last name cannot be empty or whitespace')
        // .matches(
        //   /^[A-Za-z]+$/,
        //   'Last name must contain only alphabetic characters'
        // ),
        body('userType', 'Invalid usertype!').isIn(['company', 'employee']),
      ];
    }
    case 'invitation': {
      return [
        body('password', 'Invalid password!')
          .notEmpty()
          .withMessage('Password is required!')
          .isLength({ min: 8 })
          .withMessage('Password must be at least 8 characters long!')
          .matches(/[A-Z]/)
          .withMessage('Password must contain at least one uppercase letter!')
          .matches(/[!@#$&*]/)
          .withMessage('Password must contain at least one special character!')
          .matches(/[0-9]/)
          .withMessage('Password must contain at least one digit!'),
      ];
    }
  }
};
