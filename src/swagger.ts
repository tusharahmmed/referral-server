/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';

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
      {
        url: 'https://filesure-server.vercel.app/api/v1',
        description: 'Production',
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
  // Serve custom HTML for Swagger UI (works reliably on Vercel)
  app.get('/api-docs', (_req: any, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Filesure API Documentation</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
        <style>
          body { 
            margin: 0; 
            padding: 0; 
          }
          .topbar {
            display: none;
          }
        </style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
        <script>
          window.onload = function() {
            window.ui = SwaggerUIBundle({
              url: '/api-docs.json',
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
              ],
              layout: "StandaloneLayout",
              persistAuthorization: true,
            });
          };
        </script>
      </body>
      </html>
    `);
  });

  // Docs in JSON format
  app.get('/api-docs.json', (_req: any, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
