import mongoose, { model } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Enter your name"],
    },
    email: {
      type: String,
      require: [true, "Enter your email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Enter your password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const User = mongoose.model("User", userSchema);

export default User;
