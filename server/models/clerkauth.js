import mongoose, { model } from "mongoose";
import jwt from "jsonwebtoken";

const ClerkAuthSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: [true, "Enter your name"],
    },
    fullname: {
      type: String,
      require: [true, "Enter your FullName"],
    },
    username: {
      type: String,
      require: [true, "Enter Your UserName"],
    },
    email: {
      type: String,
      require: [true, "Enter your email"],
      unique: true,
    },
  },
  { timestamps: true },
);

ClerkAuthSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const ClerkAuth = mongoose.model("ClerkAuth", ClerkAuthSchema);

export default ClerkAuth;
