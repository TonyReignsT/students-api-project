const express = require("express");
const passport = require("passport");

const router = express.Router();

// Start OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("Login successful!");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged out");
  });
});

module.exports = router;
