const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});

const AuthModel = mongoose.model("user", authSchema);

module.exports = {
  AuthModel,
};
