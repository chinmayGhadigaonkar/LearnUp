import { Router } from "express";
import {
  addanswer,
  deleteAnswer,
  editanswer,
  getanswer,
} from "../controllers/Answer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const answer = Router();

answer.get("/getanswer", getanswer);
answer.post("/addanswer", authMiddleware, addanswer);
answer.put("/editanswer/:id", authMiddleware, editanswer);
answer.delete("/deleteanswer/:id", authMiddleware, deleteAnswer);

export default answer;
