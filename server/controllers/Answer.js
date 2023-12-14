import expressAsyncHandler from "express-async-handler";
import Answer from "../models/answer.js";
import Question from "../models/question.js";

export const getanswer = expressAsyncHandler(async (req, res) => {
  const questionId = req.body;
  const question = await Question.findById(questionId);
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }
  const answer = await Answer.find({ question: questionId }).populate(
    "question",
  );
  if (!answer) {
    return res
      .status(404)
      .json({ success: false, message: "Answer not found" });
  }

  res.status(200).json({ success: true, answer });
});

export const addanswer = expressAsyncHandler(async (req, res) => {
  const { questionId, answer } = req.body;

  const question = await Question.findById({ _id: questionId });
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }
  // working
  console.log(question);
  if (req.user._id === question.user._id) {
    console.log("sdasds ");
    return res.status(404).json({
      success: false,
      message: "You have already answer for this question",
    });
  }
  const addanswer = await Answer({
    user: req.user._id,
    question: questionId,
    answer: answer,
  });

  const data = await addanswer.save();
  if (!data) {
    return res.status(404).json({ message: "something went to wrong " });
  }

  res
    .status(200)
    .json({ success: true, answer: data, msg: " Answer added Successfully  " });
});

export const editanswer = expressAsyncHandler(async (req, res) => {
  const findAnswer = await Answer.find({
    user: req.user._id,
    _id: req.params.id,
  });

  if (!findAnswer) {
    res
      .status(404)
      .json({ success: false, msg: "No such Answer in database " });
    return;
  }

  const data = req.body;

  const updateAnswer = await Answer.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { new: true },
  );

  res.status(200).json({
    success: true,
    data: updateAnswer,
    msg: "Update Answer Successfully  ",
  });
});

export const deleteAnswer = expressAsyncHandler(async (req, res) => {
  const answer = await Answer.findByIdAndDelete(req.params.id);
  if (!answer) {
    res
      .status(404)
      .json({ success: false, msg: "No such answer in database " });
    return;
  }

  res.status(200).json({
    success: true,
    answer,
    msg: "your answer is delete successfully ",
  });
});

export const likesOnAnswer = expressAsyncHandler(async (req, res) => {
  const findAnswer = await Answer.findById(req.params.id);
  // console.log(findAnswer);

  if (!findAnswer) {
    res
      .status(404)
      .json({ success: false, msg: "No such Answer in database " });
    return;
  }
  console.log(findAnswer.likes);

  const data = findAnswer.likes + 1;

  const updateAnswer = await Answer.findByIdAndUpdate(
    req.params.id,
    { $set: { likes: data } },
    { new: true },
  );

  res.status(200).json({
    success: true,
    data: updateAnswer,
    msg: "Update Answer Successfully  ",
  });
});

export const dislikesOnAnswer = expressAsyncHandler(async (req, res) => {
  const findAnswer = await Answer.findById(req.params.id);
  // console.log(findAnswer);

  if (!findAnswer) {
    res
      .status(404)
      .json({ success: false, msg: "No such Answer in database " });
    return;
  }
  console.log(findAnswer.likes);

  const data = findAnswer.likes - 1;

  const updateAnswer = await Answer.findByIdAndUpdate(
    req.params.id,
    { $set: { likes: data } },
    { new: true },
  );

  res.status(200).json({
    success: true,
    data: updateAnswer,
    msg: "Update Answer Successfully  ",
  });
});
