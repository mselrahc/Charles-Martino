const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

function protectRoute(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      jwt.verify(token, JWT_KEY);
      next();
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).send({
          message: "Unauthorized",
        });
      }
      return res.status(400).send({
        message: "Bad Request",
      });
    }
  } else {
    res.status(500).json({ error: "Login is required" });
  }
}

module.exports = {
  protectRoute,
};
