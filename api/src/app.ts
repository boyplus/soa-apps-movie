import 'reflect-metadata';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import CORS from 'cors';

import errorHandler from 'api-error-handler';

import Routes from './routes';
import { ApiError } from './utils/ApiError';

interface UserAuth {
  id: string;
  locationId?: number;
}

declare global {
  namespace Express {
    interface Request {
      user: UserAuth;
    }
  }
}

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(errorHandler());

app.use(
  CORS({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
  })
);

app.use('/api', Routes);

app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      showExplorer: true,
      url: '/swagger.json',
    },
  })
);

app.use(express.static('public'));

export default app;
