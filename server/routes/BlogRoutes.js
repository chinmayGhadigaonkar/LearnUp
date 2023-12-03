import { Router } from "express";
import { addblog, editblog, getallblog } from "../controllers/Blog.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const blog = Router();

blog.get("/getallblog", getallblog);
blog.post("/addblog", authMiddleware, addblog);
blog.put("/editblog/:id", authMiddleware, editblog);

export default blog;
