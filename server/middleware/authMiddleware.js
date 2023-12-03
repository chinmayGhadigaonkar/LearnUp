import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
    return;
  }
  try {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData.id).select("-password");
    next();
  } catch (error) {
    res.status(401).send({ error: "Something is Wrong " });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.isAdmin)) {
      return next(
        res.status(403).send({
          error:
            "Role: ${req.user.isAdmin} is not allowed to access this resource  ",
        }),
      );
    }

    next();
  };
};

export { authMiddleware, authorizeRoles };
