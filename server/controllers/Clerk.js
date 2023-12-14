import ClerkAuth from "../models/clerkauth.js";
import expressAsyncHandler from "express-async-handler";
import setToken from "../utils/setToken.js";
export const getuser = expressAsyncHandler(async (req, res) => {
  const users = await ClerkAuth.find();
  res.status(200).json({ success: true, users });
});

// find user if present
export const finduser = expressAsyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await ClerkAuth.find({ email: email });

  if (user && user.length == 0) {
    res.status(200).json({ success: false, msg: " No user in database  " });
    return;
  }
  console.log(user);

  // res.status(200).json({ success: true, user });
  setToken(user[0], 200, res);
});

export const adduser = expressAsyncHandler(async (req, res) => {
  const { userId, username, fullname, email } = req.body;

  if (
    userId === undefined ||
    username === undefined ||
    fullname === undefined ||
    email === undefined
  ) {
    res.status(400).json({ success: false, msg: "All field require to fill" });
    return;
  }
  const emailduplication = await ClerkAuth.find({ email: email });
  if (emailduplication.length > 0) {
    res
      .status(400)
      .json({ success: false, msg: "email is already in database   " });
    return;
  }

  const users = await ClerkAuth.create({ userId, username, fullname, email });

  setToken(users, 200, res);
});
