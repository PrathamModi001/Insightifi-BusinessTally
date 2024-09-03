import express from 'express';
import { clientValidator } from '../validators/client.validator.js';
import { powerBiDashboardController } from '../controllers/powerbidashboards.js';
import { superAdminAuthCheck, userAuthCheck } from '../config/authenticate.js';
import { powerbiValidator } from '../validators/powerbidashboard.validator.js';

export const powerbiRouter = express.Router();

/**
 * @swagger
 * /power-bi/:
 *   get:
 *     summary: Get company information
 *     tags: [PowerBiDashboard-company]
 *     description: Retrieve information about the company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by approval status. If true, retrieves approved companies; if false, retrieves unapproved companies.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Filter by approval company name.
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
powerbiRouter.get(
  '/',
  userAuthCheck,
  clientValidator('pagination'),
  powerBiDashboardController.getPowerBiDashboards
);

/**
 * @swagger
 * /power-bi/:
 *   post:
 *     tags: [PowerBiDashboard-company]
 *     summary: Add a Power BI dashboard.
 *     description: Add a Power BI dashboard for a company.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: number
 *                 description: company id.
 *               dashboardId:
 *                 type: String
 *                 description: dashboard id.
 *
 *     responses:
 *       200:
 *         description: Power BI dashboard added successfully.
 *       400:
 *         description: Bad request.Invalid input or company dashboard already exists.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

powerbiRouter.post(
  '/',
  superAdminAuthCheck,
  powerbiValidator('powerbiAdd'),
  powerBiDashboardController.addPowerBiDashboard
);

/**
 * @swagger
 * /power-bi/{id}:
 *   put:
 *     tags: [PowerBiDashboard-company]
 *     summary: Patch Power BI Dashboard by ID.
 *     description: Update a Power BI Dashboard by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Power BI Dashboard.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: number
 *                 description: The new value of the company field.
 *               dashboard:
 *                 type: string
 *                 description: The new value of the dashboardId field.
 *               isActive:
 *                 type: boolean
 *                 description: The new value of the isActive field.
 *     responses:
 *       200:
 *         description: Success. Update the Power BI.
 *       400:
 *         description: Bad request. Invalid ID format or request body.
 *       404:
 *         description: Not found. Power BI Dashboard with the specified ID does not exist.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
powerbiRouter.put(
  '/:id',
  powerbiValidator('updatePowerBi'),
  powerBiDashboardController.updatePowerBi
);

/**
 * @swagger
 * /power-bi/{id}:
 *   delete:
 *     tags: [PowerBiDashboard-company]
 *     summary: Delete Power BI Dashboard by ID.
 *     description: Delete a Power BI Dashboard by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Power BI Dashboard.
 *     responses:
 *       200:
 *         description: Success. Deleted the Power BI Dashboard.
 *       400:
 *         description: Bad request. Invalid ID format.
 *       404:
 *         description: Not found. Power BI Dashboard with the specified ID does not exist.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
powerbiRouter.delete(
  '/:id',
  superAdminAuthCheck,
  powerBiDashboardController.deletePowerBi
);
