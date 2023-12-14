import { Router } from "express";
import ClerkAuth from "../models/clerkauth.js";
import { adduser, finduser, getuser } from "../controllers/Clerk.js";

const clerkauth = Router();

clerkauth.get("/getuser", getuser).get("/getemail", finduser);
clerkauth.post("/adduser", adduser);
export default clerkauth;
