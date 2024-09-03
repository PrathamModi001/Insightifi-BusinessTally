import { body } from 'express-validator';
import { userRoles } from '../utils/helper.js';

export const userValidator = function (method) {
  switch (method) {
    case 'register': {
      return [
        body('firstname', 'Invalid first name!')
          .notEmpty()
          .isString()
          .withMessage('First name must be a string!')
          .isLength({ min: 2 })
          .withMessage('First name must be at least 2 characters long!')
          .custom((value) => !/\d/.test(value))
          .withMessage('First name cannot contain numbers!')
          .custom((value) => value.trim() !== '')
          .withMessage('First name cannot be empty or whitespace')
          .custom((value) => !/[@%#$!*^+-]/.test(value))
          .withMessage('First name cannot contain special characters!'),

        body('lastname', 'Invalid last name!')
          .notEmpty()
          .withMessage('Last name is required!')
          .isString()
          .withMessage('Last name must be a string!')
          .isLength({ min: 2 })
          .withMessage('Last name must be at least 2 characters long!')
          .custom((value) => !/[@%#$!*^+-]/.test(value))
          .withMessage('First name cannot contain special characters!'),

        body('email', 'Invalid email!').notEmpty().isEmail().toLowerCase(),
        body('mobileNo', 'Invalid mobile no!')
          .optional()
          .isString()
          .isLength({ min: 10, max: 10 })
          .custom((value) => value !== '00')
          .custom((value) => value[0] !== '0')
          .withMessage('Mobile number cannot start with 0')
          .withMessage('Mobile number cannot consist of all "00"s'),
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
        body('role', 'Invalid role!').notEmpty().isIn(Object.values(userRoles)),
      ];
    }
    case 'client': {
      return [
        body('firstname', 'Invalid first name!')
          .notEmpty()
          .withMessage('First name is required!')
          .isString()
          .withMessage('First name must be a string!')
          .isLength({ min: 2 })
          .withMessage('First name must be at least 2 characters long!')
          .custom((value) => !/\d/.test(value))
          .withMessage('First name cannot contain numbers!')
          .custom((value) => value.trim() !== '')
          .withMessage('First name cannot be empty or whitespace')
          .custom((value) => !/[@%#$!*^+-]/.test(value))
          .withMessage('First name cannot contain special characters!'),

        body('lastname', 'Invalid last name!')
          .notEmpty()
          .withMessage('Last name is required!')
          .isString()
          .withMessage('Last name must be a string!')
          .isLength({ min: 2 })
          .withMessage('Last name must be at least 2 characters long!')
          .custom((value) => !/[@%#$!*^+-]/.test(value))
          .withMessage('Last name cannot contain special characters!'),

        body('email', 'Invalid email!')
          .notEmpty()
          .withMessage('Email is required!')
          .isEmail()
          .withMessage('Email must be valid!')
          .normalizeEmail(),

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

        body('companyName', 'Invalid company name!')
          .notEmpty()
          .withMessage('Company name is required!')
          .isString()
          .withMessage('Company name must be a string!')
          .custom((value) => value.trim() !== '')
          .withMessage('Company name cannot be empty or whitespace'),

        body('city', 'Invalid city!')
          .notEmpty()
          .withMessage('City is required!')
          .isString()
          .withMessage('City must be a string!')
          .custom((value) => value.trim() !== '')
          .withMessage('City cannot be empty or whitespace'),

        body('state', 'Invalid state!')
          .notEmpty()
          .withMessage('State is required!')
          .isString()
          .withMessage('State must be a string!')
          .custom((value) => value.trim() !== '')
          .withMessage('State cannot be empty or whitespace'),

        body('name', 'Invalid name!')
          .notEmpty()
          .withMessage('Name is required!')
          .isString()
          .withMessage('Name must be a string!')
          .custom((value) => value.trim() !== '')
          .withMessage('Name cannot be empty or whitespace'),

        body('mobileNo', 'Invalid mobile no!')
          .optional()
          .isString()
          .isLength({ min: 10, max: 10 })
          .custom((value) => value !== '00')
          .custom((value) => value[0] !== '0')
          .withMessage('Mobile number cannot start with 0')
          .withMessage('Mobile number cannot consist of all "00"s'),
      ];
    }
    case 'loginUser': {
      return [
        body('email', 'Invalid email!').notEmpty().isEmail(),
        body('password', 'Invalid password!').notEmpty(),
      ];
    }
    case 'verifyEmail': {
      return [
        body('email', 'Invalid email!').notEmpty().isEmail(),
        body('otp', 'Otp is missing!').notEmpty().isNumeric(),
      ];
    }
    case 'updateForgotPassword': {
      return [
        body('email', 'Email is missing!').notEmpty().isEmail(),
        body('otp', 'OTP is missing!').notEmpty().isNumeric(),
        body('newPassword', 'Password is missing!')
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
    case 'forgotPassword': {
      return [body('email', 'Invalid email!').notEmpty().isEmail()];
    }
    case 'updatePassword': {
      return [
        body('newPassword', 'Invalid newPassword !!')
          .notEmpty()
          .withMessage('Password is required!')
          .isLength({ min: 8 })
          .withMessage('Password must be at least 8 characters long!')
          .matches(/[A-Z]/)
          .withMessage('Password must contain at least one uppercase letter!')
          .matches(/[!@#$&*]/)
          .withMessage('Password must contain at least one special character!')
          .matches(/[0-9]/)
          .withMessage('Password must contain at least one digit!')
          .custom((value, { req }) => value !== req.body.oldPassword)
          .withMessage('New password must be different from the old password!'),
        body('oldPassword', 'Invalid oldPassword !!')
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
    case 'updateUser': {
      return [
        body('firstname', 'Invalid first name!')
          .optional()
          .isString()
          .withMessage('First name must be a string!')
          .isLength({ min: 2 })
          .withMessage('First name must be at least 2 characters long!')
          .custom((value) => !/\d/.test(value))
          .withMessage('First name cannot contain numbers!')
          .custom((value) => value.trim() !== '')
          .withMessage('First name cannot be empty or whitespace')
          .custom((value) => !/[@%#$!*^+-]/.test(value))
          .withMessage('First name cannot contain special characters!'),
        body('lastname', 'Invalid last name!')
          .optional()
          .isString()
          .withMessage('Last name must be a string!')
          .isLength({ min: 2 })
          .withMessage('Last name must be at least 2 characters long!')
          .custom((value) => !/\d/.test(value))
          .withMessage('Last name cannot contain numbers!')
          .custom((value) => value.trim() !== '')
          .withMessage('Last name cannot be empty or whitespace')
          .custom((value) => !/[@%#$!*^+-]/.test(value))
          .withMessage('Last name cannot contain special characters!'),
        body('mobileNo', 'Invalid mobile no!')
          .optional()
          .custom((value) => {
            // If the value is null, it's considered valid
            if (value === null) return true;
            // Otherwise, perform the regular validation
            return (
              typeof value === 'string' &&
              value.length === 10 &&
              value !== '00' &&
              value[0] !== '0'
            );
          })
          .withMessage(
            'Mobile number must be a string of 10 characters and cannot start with 0 or consist of all "00"s'
          ),
        body('email').not().exists().withMessage('Email cannot be updated.'),
        body('password')
          .not()
          .exists()
          .withMessage('Password cannot be updated.'),
        body('otp').not().exists().withMessage('OTP cannot be updated.'),
        body('role').not().exists().withMessage('Role cannot be updated.'),
      ];
    }
    case 'updateEmail': {
      return [
        body('firstname', 'Invalid first name!')
          .not()
          .exists()
          .withMessage('Firstname cannot be updated.'),
        body('lastname', 'Invalid last name!')
          .not()
          .exists()
          .withMessage('Lastname cannot be updated.'),
        body('mobileNo', 'Invalid mobile no!')
          .not()
          .exists()
          .withMessage('Mobile No cannot be updated.'),
        body('newEmail').notEmpty().isEmail(),
        body('password')
          .not()
          .exists()
          .withMessage('Password cannot be updated.'),
        body('otp').not().exists().withMessage('OTP cannot be updated.'),
        body('role').not().exists().withMessage('Role cannot be updated.'),
      ];
    }
  }
};
