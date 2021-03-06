const jwt = require("jsonwebtoken");
const config = require("config");

exports.authenticate = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Please log in to use this feature!");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
    }
    next();
  };
};
