// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API docs for E-Commerce platform",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1", // Change to your local or production URL
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
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"], // path to your API route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
