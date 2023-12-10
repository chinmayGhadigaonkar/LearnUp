import expressAsyncHandler from "express-async-handler";
import Question from "../models/question.js";

export const getQuestion = expressAsyncHandler(async (req, res) => {
  const questions = await Question.find().populate({
    path: "user",
    select: "-password",
  });

  res.status(200).json({ success: true, questions });
});

export const getSingleQuestion = expressAsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id).populate({
    path: "user",
    select: "-password",
  });

  if (question.length === 0) {
    return res
      .status(404)
      .json({ success: false, msg: "No such Question in database " });
  }

  res.status(200).json({ success: true, question });
});

export const addQuestion = expressAsyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;

  const question = await Question.create({
    user: req.user._id,
    title,
    description,
    tags,
  });

  const questions = await Question.find();
  res.status(200).json({
    success: true,
    questions,
    msg: "your question is added successfully ",
  });
});

// update question

export const editQuestion = expressAsyncHandler(async (req, res) => {
  const findQuestion = await Question.find({
    user: req.user._id,
    _id: req.params.id,
  });

  // Check if findQuestion array is empty
  if (findQuestion.length === 0) {
    return res
      .status(404)
      .json({ success: false, msg: "No such Question in database " });
  }

  const data = req.body;

  const questions = await Question.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true },
  );

  res.status(200).json({
    success: true,
    questions,
    msg: "Your question is updated successfully",
  });
});

// delete question
export const deleteQuestion = expressAsyncHandler(async (req, res) => {
  const question = await Question.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id, // Match both the question ID and the user ID
  });

  if (!question) {
    return res.status(404).json({
      success: false,
      msg: "No such Question in database or unauthorized",
    });
  }

  const questions = await Question.find(); // Retrieve remaining questions

  res.status(200).json({
    success: true,
    questions,
    msg: "Your question is deleted successfully",
  });
});

export const questionLikes = expressAsyncHandler(async (req, res) => {
  const findQuestion = await Question.findById(req.params.id);

  // Check if findQuestion array is empty
  if (findQuestion.length === 0) {
    return res
      .status(404)
      .json({ success: false, msg: "No such Question in database " });
  }

  const data = findQuestion.likes + 1;

  const questions = await Question.findByIdAndUpdate(
    req.params.id,
    { $set: { likes: data } },
    { new: true },
  );

  res.status(200).json({
    success: true,
    questions,
    msg: "Your question is updated successfully",
  });
});

export const questiondisLikes = expressAsyncHandler(async (req, res) => {
  const findQuestion = await Question.findById(req.params.id);

  // Check if findQuestion array is empty
  if (findQuestion.length === 0) {
    return res
      .status(404)
      .json({ success: false, msg: "No such Question in database " });
  }

  const data = findQuestion.likes - 1;

  const questions = await Question.findByIdAndUpdate(
    req.params.id,
    { $set: { likes: data } },
    { new: true },
  );

  res.status(200).json({
    success: true,
    questions,
    msg: "Your question is updated successfully",
  });
});
