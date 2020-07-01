const express = require("express");
const router = express.Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const { JWT_KEY, JWT_EXPIRY_SECONDS } = process.env;

router.post("/sign-in/", (req, res) => {
  const { userName } = req.body;
  User.findOne({ userName }).exec((err, user) => {
    if (user) {
      const token = jwt.sign({ userName }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: JWT_EXPIRY_SECONDS * 1000,
      });

      res.send({
        message: "Success",
        token: token,
      });
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  });
});

module.exports = router;
