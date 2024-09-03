import express from 'express';
import { userController } from '../controllers/user-api.js';
import { companyController } from '../controllers/company-api.js';
import { userValidator } from '../validators/user.validator.js';
import { clientValidator } from '../validators/client.validator.js';
import {
  userAuthCheck,
  clientAuthCheck,
  verifyEmailUpdateToken,
  verifySuperAdminToken,
} from '../config/authenticate.js';
import { contactUsController } from '../controllers/contactUs-api.js';
import { requestUsController } from '../controllers/requestUs-api.js';
import { contactUsValidator } from '../validators/contactUsValidator.js';
import { requestUsValidator } from '../validators/requestUs.validator.js';
export const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Business-Telly
 *   description: Business-Telly
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /user/:
 *   post:
 *     tags:
 *       - USER
 *     summary: Register a User.
 *     description: Register a User.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       401:
 *         description: Unauthorized. Invalid passkey.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *     security:
 *       - X-Passkey: []
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: User's first name.
 *         lastname:
 *           type: string
 *           description: User's last name.
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address.
 *         mobileNo:
 *           type: string
 *           description: User's mobile number.
 *         password:
 *           type: string
 *           description: User's password.
 *         role:
 *           type: string
 *           enum:
 *             - organizationAdmin
 *             - companyEmployee
 *             - organizationEmployee
 *             - companyAdmin
 *             - superAdmin
 *           description: User's role.
 *   securitySchemes:
 *     X-Passkey:
 *       type: apiKey
 *       in: header
 *       name: X-Passkey
 */
userRouter.post('/', userValidator('register'), userController.registerPartner);

userRouter.post('/client-register', userController.registerClient);

/**
 * @swagger
 * /user/verify-email:
 *   post:
 *     tags:
 *      - USER
 *     summary: Verify user's email address
 *     description: Verify user's email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User email verified successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 */
userRouter.post(
  '/verify-email',
  userValidator('verifyEmail'),
  userController.verifyEmail
);

/**
 * @swagger
 * /user/verify-otp:
 *   post:
 *     tags:
 *      - USER
 *     summary: Verify user's otp
 *     description: Verify user's otp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User otp verified successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 */
userRouter.post(
  '/verify-otp',
  userValidator('verifyEmail'),
  userController.verifyOtp
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *      - USER
 *     summary: Login user.
 *     description: Login user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 */

userRouter.post('/login', userValidator('loginUser'), userController.loginUser);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     tags:
 *       - USER
 *     summary: Logout user.
 *     description: Logout user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

userRouter.post('/logout', userAuthCheck, userController.logoutUser);

/**
 * @swagger
 * /user/:
 *   get:
 *     tags:
 *      - USER
 *     summary: User information retrieval endpoint.
 *     description: User information retrieval endpoint.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
userRouter.get('/', userAuthCheck, userController.me);

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     tags:
 *      - USER
 *     summary: Initiate forgot password process.
 *     description: Sends an OTP to the user's email to initiate the password reset process.
 *     requestBody:
 *       required: trueuserAuthCheck
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 */
userRouter.post(
  '/forgot-password',
  userValidator('forgotPassword'),
  userController.forgotPassword
);

/**
 * @swagger
 * /user/update-forgot-password:
 *   post:
 *     tags:
 *      - USER
 *     summary: Update user's password after verifying OTP sent during forgot password process.
 *     description: Update user's password after verifying OTP sent during forgot password process.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               otp:
 *                 type: string
 *                 description: OTP sent to the user's email during forgot password process.
 *               newPassword:
 *                 type: string
 *                 description: New password to be set.
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 */

userRouter.post(
  '/update-forgot-password',
  userValidator('updateForgotPassword'),
  userController.updateForgotPassword
);

/**
 * @swagger
 * /user/update-password:
 *   post:
 *     tags:
 *      - USER
 *     summary: Update user password.
 *     description: Update user's password.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: New password to be set.
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

userRouter.post(
  '/update-password',
  userValidator('updatePassword'),
  userAuthCheck,
  userController.updatePassword
);

/**
 * @swagger
 * /user:
 *   put:
 *     tags:
 *      - USER
 *     summary: Update user's detail.
 *     description: Update user's detail.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name of the user.

 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

userRouter.put(
  '/',
  userValidator('updateUser'),
  userAuthCheck,
  userController.updateUser
);

/**
 * @swagger
 * /user/client:
 *   get:
 *     summary: Get company information By Organization User
 *     tags:
 *      - USER
 *     description: Retrieve information about the company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: boolean

 *         description: Filter by approval status. If true, retrieves approved companies; if false, retrieves unapproved companies.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter companyAdmin by name or email. Provide a partial or full name or email to search for.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Limit the number of results per page.
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: integer
 *         required: false
 *         description: pageNo the results by a specific number of records for pagination.
 *     responses:
 *       200:
 *         description: Successful operation. Returns company information.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
userRouter.get(
  '/client',
  clientAuthCheck,
  clientValidator('pagination'),
  companyController.companyList
);

/**
 * @swagger
 * /user/employee:
 *   get:
 *     tags:
 *      - USER
 *     summary: employee information retrieval endpoint.
 *     description: employee information retrieval endpoint.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter on employee  name . Provide a partial or full name to search for.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Limit the number of results per page.
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: integer
 *         required: false
 *         description: pageNo the results by a specific number of records for pagination.
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
userRouter.get(
  '/employee',
  userAuthCheck,
  clientValidator('pagination'),
  userController.employee
);

userRouter.delete(
  '/delete-employee/:id',
  userAuthCheck,
  userController.deleteEmployee
);

/**
 * @swagger
 * /user/update-email:
 *   put:
 *     tags:
 *      - USER
 *     summary: Request to update user's email.
 *     description: Initiates the process to update the user's email address. A verification email will be sent to the new email address.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newEmail:
 *                 type: string
 *                 description: New email address for the user.
 *     responses:
 *       200:
 *         description: Email reafy for update,Check your email for the update confirmation!.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

userRouter.put(
  '/update-email',
  userAuthCheck,
  userValidator('updateEmail'),
  userController.updateEmail
);

/**
 * @swagger
 * /user/verified-change-email:
 *   post:
 *     tags:
 *      - USER
 *     summary: Verify and update user's email.
 *     description: Verify and update user's email with the new one.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email updated successfully.
 *       400:
 *         description: Bad request. Invalid input or user already registered.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

userRouter.post(
  '/verified-change-email',
  verifyEmailUpdateToken,
  userController.verifiedChangeEmail
);
/**
 * @swagger
 * /user/dashboard:
 *   get:
 *     tags:
 *      - USER
 *     summary: dashboard information retrieval endpoint.
 *     description: dashboard information retrieval endpoint.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: dashboard information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
userRouter.get('/dashboard', userAuthCheck, userController.dashboard);

/**
 * @swagger
 * /user/contact-us:
 *   post:
 *     tags:
 *       - Contact Us
 *     summary: Contact Us
 *     description: Contact Us
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First Name
 *               lastName:
 *                 type: string
 *                 description: Last Name
 *               email:
 *                 type: string
 *                 description: Email
 *               message:
 *                 type: string
 *                 description: Message
 *     responses:
 *       200:
 *         description: Contact Us successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

userRouter.post(
  '/contact-us',
  contactUsValidator('contactUs'),
  contactUsController.contactUs
);

userRouter.post(
  '/request-us',
  requestUsValidator('requestUs'),
  requestUsController.createRequestUs
);
userRouter.put(
  '/request-us/:id',
  requestUsValidator('requestUs'),
  verifySuperAdminToken,
  requestUsController.updateStatus
);

userRouter.get(
  '/request-us',
  verifySuperAdminToken,
  requestUsController.getAllDemoRequest
);

userRouter.post(
  '/blog-upload',
  verifySuperAdminToken,
  userController.blogUpload
);

userRouter.post(
  '/pre-signed-url',
  verifySuperAdminToken,
  userController.getPresignedUrl
);

userRouter.put('/blog/:id', verifySuperAdminToken, userController.updateBlog);

userRouter.get('/blog', userController.getAllBlog);
