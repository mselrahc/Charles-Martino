const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.send("This is index.");
});

module.exports = router;
