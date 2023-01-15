const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { AuthModel } = require("../models/auth.model");
const authrouter = express.Router();

authrouter.get("/", async (req, res) => {
  const data = await AuthModel.find();
  res.send(data);
});
authrouter.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  //  console.log(payload);
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new AuthModel({
          email,
          password: secure_password,
          name,
          age,
        });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (e) {
    res.send("Error in registering the user");
    console.log(e);
  }
});
authrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthModel.find({ email });
    // console.log(user);

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "Logged in Successfull", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (e) {
    res.send("Logged In Failed");
    console.log(e);
  }
});
authrouter.get("/data", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.key, (err, decoded) => {
    if (err) {
      res.send("Invalid token");
      console.log(err);
    } else {
      res.send("Data...");
    }
  });
});
module.exports = {
  authrouter,
};
