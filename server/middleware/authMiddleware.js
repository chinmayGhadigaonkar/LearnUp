import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ClerkAuth from "../models/clerkauth.js";

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ error: "Please authenticate using a valid token" });
//     return;
//   }
//   try {
//     const decodeData = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decodeData.id).select("-password");
//     next();
//   } catch (error) {
//     res.status(401).send({ error: "Something is Wrong " });
//   }
// };

const authMiddleware = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
    return;
  }
  try {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await ClerkAuth.findById(decodeData.id).select("-password");
    next();
  } catch (error) {
    res.status(401).send({ error: "Something is Wrong " });
  }
};

export { authMiddleware };
