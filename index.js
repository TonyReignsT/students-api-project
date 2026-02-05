const express = require('express');
require("dotenv").config();
const {MongoClient} = require('mongodb');

const session = require("express-session");
const passport = require("passport");
const isAuth = require("./middleware/authMiddleware"); // protect/ authorize/authenticate routes

require("./config/passport");


const studentsRoutes = require("./routes/studentsRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const authRoutes = require("./routes/authRoutes");

// Swagger
const {swaggerUi, swaggerSpec} = require("./swagger/swagger");



const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/students", studentsRoutes);
app.use("/courses", coursesRoutes);
// app.use("/students", isAuth, studentsRoutes);
// app.use("/courses", isAuth,coursesRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Students API");
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})