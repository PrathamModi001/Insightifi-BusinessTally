import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routes/userRouter.js';
import { inviteRouter } from './routes/inviteRouter.js';
import swaggerMiddleware from './swagger.js';
import { powerbiRouter } from './routes/powerbiRouter.js';
import cors from 'cors';
import { companyRouter } from './routes/companyRouter.js';
import { organizationRouter } from './routes/organizationRouter.js';
import pino from 'pino';
import { fileURLToPath } from 'url';
import path from 'path';
import { paymentRouter } from './routes/paymentRouter.js';

export const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileTransport = pino.transport({
  target: 'pino/file',
  options: { destination: `${__dirname}/log.json` },
});

export const logger = pino(
  {
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  fileTransport
);

swaggerMiddleware(app);
app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  const logMessage = {
    method: req.method,
    url: req.url,
  };
  logger.info(logMessage);
  logger.info('Received a GET request to the root path');
  next();
});

app.use('/organization', organizationRouter);
app.use('/user', userRouter);
app.use('/invite', inviteRouter);
app.use('/power-bi', powerbiRouter);
app.use('/company', companyRouter);
app.use('/payment', paymentRouter);
app.use('/', (req, res) => res.send('Server up and running for debugging'));
