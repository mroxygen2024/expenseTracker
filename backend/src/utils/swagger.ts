import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export const setupSwagger = (app: Application) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Expense Tracker API",
        version: "1.0.0",
        description: "API documentation for your Expense Tracker backend",
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Local Server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: ["./src/routes/*.ts"],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
