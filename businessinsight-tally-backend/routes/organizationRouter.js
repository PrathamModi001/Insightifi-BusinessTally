import express from 'express';
import dotenv from 'dotenv';
import { superAdminAuthCheck } from '../config/authenticate.js';
import { organizationController } from '../controllers/organization-api.js';
import { superAdminValidator } from '../validators/superAdmin.validator.js';
import { clientValidator } from '../validators/client.validator.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express Router for super admin routes
export const organizationRouter = express.Router();

/**
 * @swagger
 * /organization/:
 *   get:
 *     summary: Get user & organization information By superAdmin
 *     tags:
 *      - superadmin
 *     description: Get user & organization information By superAdmin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter on organizationAdmin  name . Provide a partial or full name to search for.
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

organizationRouter.get(
  '/',
  superAdminAuthCheck,
  clientValidator('pagination'),
  organizationController.getUserOrganization
);

/**
 * @swagger
 * /organization/{id}:
 *   put:
 *     tags:
 *       - superadmin
 *     summary: Update isApproved field of a organization.
 *     description: Update the isApproved field of a organization.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the company to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isApproved:
 *                 type: boolean
 *                 description: The new value of the isApproved field.
 *     responses:
 *       200:
 *         description: SuperAdmin details updated successfully.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

organizationRouter.put(
  '/:id',
  superAdminValidator('validateIsVerifiedField'),
  superAdminAuthCheck,
  organizationController.updateOrganization
);

export default organizationRouter;
