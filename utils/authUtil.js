const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
const User = require("../models/User");

function protectRoute(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const { userName } = jwt.verify(token, JWT_KEY);
      User.findOne({ userName }).exec((err, user) => {
        if (user == null) {
          return res.status(401).send({
            message: "Unauthorized",
          });
        } else {
          next();
        }
      });
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).send({
          message: "Unauthorized",
        });
      }
      return res.status(400).send({
        message: "Bad Request",
        err,
      });
    }
  } else {
    res.status(500).json({ error: "Login is required" });
  }
}

module.exports = {
  protectRoute,
};
