import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { paymentController } from '../controllers/payment-api.js';
import { clientAuthCheck } from '../config/authenticate.js';

export const paymentRouter = express.Router();

// Initialize Razorpay instance with your API key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @swagger
 * /payment/orders:
 *   post:
 *     summary: Create a payment order.
 *     tags:
 *       - Payment
 *     description: Create a payment order using Razorpay.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to be paid.
 *               currency:
 *                 type: string
 *                 description: The currency of the payment (e.g., INR, USD).
 *               receipt_email:
 *                 type: string
 *                 description: The email address to send the payment receipt.
 *               options:
 *                 type: object
 *                 description: Additional options for the payment order (optional).
 *     responses:
 *       200:
 *         description: Payment order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created payment order.
 *       400:
 *         description: Bad request. Invalid input or missing required fields.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
paymentRouter.post('/orders', async (req, res) => {
  try {
    const order = await razorpay.orders.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the payment order.' });
  }
});

/**
 * @swagger
 * /payment/webhook:
 *   post:
 *     summary: Handle Razorpay webhook events.
 *     tags:
 *       - Payment
 *     description: Handle Razorpay webhook events related to payment events.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 type: object
 *                 description: The payload sent by Razorpay containing payment details.
 *               signature:
 *                 type: string
 *                 description: The signature provided by Razorpay for webhook verification.
 *     responses:
 *       200:
 *         description: Webhook processed successfully.
 *       400:
 *         description: Bad request. Invalid webhook signature.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
paymentRouter.post('/webhook', async (req, res) => {
  try {
    const { payload, signature } = req.body;
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (signature === expectedSignature) {
      // Process the webhook payload (e.g., store payment details in a database)
      const paymentData = {
        order_id: payload.order.id,
        razorpay_payment_id: payload.payment.id,
        razorpay_signature: signature,
        amount: payload.payment.amount / 100, // Convert back to original amount
        currency: payload.payment.currency,
        status: payload.payment.status, // e.g., 'captured', 'failed'
      };

      if (paymentData.status === 'captured') {
        console.log('Payment captured');
      }

      res.status(200).json({ message: 'Webhook processed successfully' });
    } else {
      console.error('Webhook signature verification failed');
      res.status(400).json({ error: 'Invalid webhook signature' });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while processing the webhook.' });
  }
});

/**
 * @swagger
 * /payment/analysis/:
 *   get:
 *     summary: Get analysis data
 *     tags:
 *       - Analysis
 *     description: Retrieve analysis data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation. Returns analysis data.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
paymentRouter.get(
  '/analysis',
  clientAuthCheck,
  paymentController.getAnalysisData
);
