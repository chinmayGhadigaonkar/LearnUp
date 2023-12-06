import User from "../models/user.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";

import setToken from "../utils/setToken.js";

export const createuser = expressAsyncHandler(async (req, res) => {
  if (req.body.name == "" || req.body.email == "" || req.body.password == "") {
    res.json({ success: false, msg: "All field require to fill" });
    return;
  }

  const data = await User.find({ email: req.body.email });
  console.log(data);
  if (data.length > 0) {
    res.json({ success: false, msg: "Enter email is already used " });
    return;
  }

  let salt = await bcrypt.genSalt(10);
  let password = req.body.password;
  let hashpassword = await bcrypt.hash(password, salt);

  let user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
  });
  setToken(user, 200, res);
});

export const loginuser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    res.json({
      success: false,
      msg: "please try to login with valid credential",
    });
    return;
  }
  const comparepassword = await bcrypt.compare(password, user.password);
  if (!comparepassword) {
    res.json({
      success: true,
      msg: "please try to login with valid credential",
    });
    return;
  }
  setToken(user, 201, res);
});

export const findUser = expressAsyncHandler(async (req, res) => {
  const _id = req.params;

  const user = await User.findById(_id);

  res.status(200).json({ success: true, user });
});
