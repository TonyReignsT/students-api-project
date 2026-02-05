const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Students API",
      version: "1.0.0",
      description: "CRUD API for Students and Courses (W03 Project)"
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Local server"
      }
    ]
  },
  apis: ["./routes/*.js"] 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};