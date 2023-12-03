import { Router } from "express";

import { createuser, loginuser } from "../controllers/User.js";

const auth = Router();

auth.post("/createuser", createuser);
auth.post("/loginuser", loginuser);
// auth.get("logout", logout);
export default auth;
