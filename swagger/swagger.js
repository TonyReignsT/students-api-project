const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Students API",
      version: "1.0.0",
      description: "CRUD API for Students and Courses (W03 Project)",
    },
    servers: [
      {
        url: "https://students-api-project.onrender.com",
        description: "Deployed server",
        // url: "http://localhost:8000",
        // description: "Local server"
      },
    ],
    // To show protected routes
    components: {
      securitySchemes: {
        OAuth2: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: "/auth/google",
              tokenUrl: "/auth/google/callback",
              scopes: {},
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
