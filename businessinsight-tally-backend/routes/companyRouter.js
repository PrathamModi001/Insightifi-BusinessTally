import express from 'express';
import {
  companyAdminSuperAdminAuthCheck,
  inviteAuthCheck,
  superAdminAuthCheck,
} from '../config/authenticate.js';
import { companyController } from '../controllers/company-api.js';
import { companyValidator } from '../validators/company.validator.js';
import { clientValidator } from '../validators/client.validator.js';

export const companyRouter = express.Router();

/**
 * @swagger
 * /company:
 *   put:
 *     tags:
 *      - COMPANY
 *     summary: Update company's detail.
 *     description: Update company's detail.
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
 *               state:
 *                 type: string
 *                 description: state of the company.
 *               city:
 *                 type: string
 *                 description: city of the company.

 *     responses:
 *       200:
 *         description: Company detail's updated successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

companyRouter.put(
  '/',
  companyValidator('companyUpdate'),
  inviteAuthCheck,
  companyController.updateCompany
);

/**
 * @swagger
 * /company/:
 *   get:
 *     summary: Get company information
 *     tags:
 *      - COMPANY
 *     description: Retrieve information about the company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by company name.
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

companyRouter.get(
  '/',
  companyAdminSuperAdminAuthCheck,
  clientValidator('pagination'),
  companyController.getCompany
);

/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Get company information by ID.
 *     tags:
 *       - COMPANY
 *     description: Retrieve information about the company by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the company.
 *     responses:
 *       200:
 *         description: Successful operation. Returns company information.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

companyRouter.get(
  '/:id',
  superAdminAuthCheck,
  companyController.getCompanyById
);
