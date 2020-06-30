const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Username can not be blank"],
  },
  accountNumber: {
    type: String,
    required: [true, "Account number can not be blank"],
    validate: {
      validator: (v) => /\d{6,12}/.test(v),
      message: (props) => "Account number must contains 6 to 12 digits",
    },
    index: true,
    unique: true,
  },
  emailAddress: {
    type: mongoose.SchemaTypes.Email,
    required: [true, "Email address is not valid"],
  },
  identityNumber: {
    type: String,
    required: [true, "Identity number can not be blank"],
    validate: {
      validator: (v) => /\d{6,12}/.test(v),
      message: (props) => "Identity number must contains 6 to 12 digits",
    },
    index: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
