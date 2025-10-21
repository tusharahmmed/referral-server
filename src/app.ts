import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import cookieParser from 'cookie-parser';
import { applicationRoutes } from './app/routes';
import { swaggerDocs } from './swagger';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(
  express.urlencoded({ parameterLimit: 100000, limit: '50mb', extended: true }),
);

app.use(express.json());

app.use('/uploads', express.static('uploads'));

// root route
app.get('/', (req: Request, res: Response) => {
  res.send(':) server working successfully');
});

app.use('/api/v1', applicationRoutes);

// swagger docs
swaggerDocs(app);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    statusCode: httpStatus.NOT_FOUND,
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
