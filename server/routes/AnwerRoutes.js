import { Router } from "express";
import {
  addanswer,
  deleteAnswer,
  dislikesOnAnswer,
  editanswer,
  getanswer,
  likesOnAnswer,
} from "../controllers/Answer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const answer = Router();

answer.post("/getanswer", getanswer);
answer.post("/addanswer", authMiddleware, addanswer);
answer.put("/editanswer/:id", authMiddleware, editanswer);
answer
  .put("/answerlikes/:id", authMiddleware, likesOnAnswer)
  .put("/answerdislikes/:id", authMiddleware, dislikesOnAnswer);

answer.delete("/deleteanswer/:id", authMiddleware, deleteAnswer);

export default answer;
