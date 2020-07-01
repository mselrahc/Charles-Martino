const express = require("express");
const router = express.Router();
const { protectRoute } = require("../utils/authUtil");

const User = require("../models/User");

const redis = require("redis");

const portRedis = process.env.PORT || process.env.REDIS_PORT;
const cacheExpire = 600;
const redisClient = redis.createClient(portRedis, process.env.REDIS_HOST);

checkCache = (req, res, next) => {
  const { id } = req.params;

  redisClient.get(id, (err, user) => {
    if (err) {
      res.status(500).send({
        message: "Server error",
        error: err,
      });
    }
    user = JSON.parse(user);
    if (user != null) {
      res.send({
        message: "User found",
        data: user,
      });
    } else {
      next();
    }
  });
};

function setCache(id, user) {
  redisClient.setex(id, cacheExpire, JSON.stringify(user));
}

function findUser(filter, res) {
  User.findOne(filter).exec(function (err, user) {
    if (user) {
      setCache(user.id, user);
      res.send({
        message: "User found",
        data: user,
      });
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  });
}

router.get("/:id", protectRoute, checkCache, function (req, res, next) {
  findUser({ _id: req.params.id }, res);
});

router.get("/account-number/:accountNumber", protectRoute, function (
  req,
  res,
  next
) {
  findUser({ accountNumber: req.params.accountNumber }, res);
});

router.get("/identity-number/:identityNumber", protectRoute, function (
  req,
  res,
  next
) {
  findUser({ identityNumber: req.params.identityNumber }, res);
});

router.post("/", protectRoute, function (req, res, next) {
  const user = new User(req.body);
  user
    .save()
    .then(function () {
      res.send({
        message: "User added",
        data: user,
      });
    })
    .catch((err) => {
      if (err.errors) {
        res.status(400).send(err);
      } else {
        res.status(500).send({
          message: "Server error",
          error: err,
        });
      }
    });
});

router.put("/:id", protectRoute, function (req, res, next) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
    function (err, user) {
      if (err) {
        res.status(400).send({
          message: "Invalid user",
          error: err,
        });
      } else {
        setCache(user.id, user);
        res.send({
          message: "User updated",
          data: user,
        });
      }
    }
  );
});

router.delete("/:id", protectRoute, function (req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, user) {
    if (user) {
      setCache(user.id, null);
      res.send({
        message: "User deleted",
        data: user,
      });
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  });
});

module.exports = router;
