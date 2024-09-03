import express from 'express';
import { inviteController } from '../controllers/invite-api.js';
import { inviteValidator } from '../validators/invite.validator.js';
import { inviteAuthCheck, verifyInviteToken } from '../config/authenticate.js';
export const inviteRouter = express.Router();

/**
 * @swagger
 * /invite:
 *   post:
 *     tags:
 *      - [INVITE]
 *     summary: Send invitation.
 *     description: Send invitation to a user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: invitee firstname.
 *               lastname:
 *                 type: string
 *                 description: invitee lastname.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user to invite.
 *               userType:
 *                 type: string
 *                 enum:
 *                   - company
 *                   - employee
 *                 description: Type of user to invite (company or employee).
 *     responses:
 *       200:
 *         description: Invitation sent successfully.
 *       400:
 *         description: Bad request. Invalid input or user already registered.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

inviteRouter.post(
  '/',
  inviteValidator('inviteSend'),
  inviteAuthCheck,
  inviteController.invitation
);

/**
 * @swagger
 * /invite/setpassword:
 *   post:
 *     tags:
 *      - [INVITE]
 *     summary: Set password for invited user.
 *     description: Set password for the user invited via email.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password for the user.
 *     responses:
 *       200:
 *         description: Password set successfully.
 *       400:
 *         description: Bad request. Invalid input or user already registered.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

inviteRouter.post(
  '/setpassword',
  inviteValidator('invitation'),
  verifyInviteToken,
  inviteController.invitee // Handler for processing the validated request
);
