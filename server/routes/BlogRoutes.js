import { Router } from "express";
import {
  addblog,
  editblog,
  getallblog,
  getoneblog,
} from "../controllers/Blog.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import singleUpload from "../middleware/singleUpload.js";

const blog = Router();

blog.get("/getallblog", getallblog).get("/getblog/:id", getoneblog);
blog.post("/addblog", authMiddleware, singleUpload, addblog);
blog.put("/editblog/:id", authMiddleware, editblog);

export default blog;
