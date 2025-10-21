/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Filesure',
      version: '1.0.0',
      description: 'API documentation for the Filesure application',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Localhost',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    `${__dirname}/app/modules/**/*.route.js`,
    `${__dirname}/app/modules/**/*.route.ts`,
    `${__dirname}/swagger.js`,
    `${__dirname}/swagger.ts`,
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: any) => {
  // swagger page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // docs in json format
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
