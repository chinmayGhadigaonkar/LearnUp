import { Router } from "express";
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  getQuestion,
  getSingleQuestion,
  questionLikes,
  questiondisLikes,
} from "../controllers/Question.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const question = Router();

question
  .get("/getallquestion", getQuestion)
  .get("/getquestion/:id", getSingleQuestion);
question.post("/addquestion", authMiddleware, addQuestion);
question
  .put("/editquestion/:id", authMiddleware, editQuestion)
  .put("/questionlikes/:id", authMiddleware, questionLikes)
  .put("/questiondislikes/:id", authMiddleware, questiondisLikes);
question.delete("/deletequestion/:id", authMiddleware, deleteQuestion);

export default question;
