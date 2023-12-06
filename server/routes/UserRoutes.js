import { Router } from "express";

import { createuser, findUser, loginuser } from "../controllers/User.js";

const auth = Router();

auth.post("/createuser", createuser);
auth.post("/loginuser", loginuser);
auth.get("/finduser", findUser);
export default auth;
