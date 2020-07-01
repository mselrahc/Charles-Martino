const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const User = require("./models/User");
require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.DB_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  autoIndex: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const user = new User({
  userName: "charles",
  accountNumber: "8924734435",
  emailAddress: "charles@mail.com",
  identityNumber: "040599045239",
});
user.save();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

module.exports = app;
