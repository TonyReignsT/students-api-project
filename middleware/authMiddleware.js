// Checks if the user is logged in
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // user is allowed
  }

  res.status(401).json({ message: "Unauthorized" });
}

module.exports = isAuth;
