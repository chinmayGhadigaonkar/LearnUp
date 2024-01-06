import env from "dotenv";
import express from "express";
import fetch from "node-fetch";
import connectDB from "./db/conn.js";
import question from "./routes/QuestionRoutes.js";
import answer from "./routes/AnwerRoutes.js";
import auth from "./routes/UserRoutes.js";
import blog from "./routes/BlogRoutes.js";
import cors from "cors";

import { v2 as cloudinary } from "cloudinary";
import clerkauth from "./routes/ClerkAuthRoutes.js";
import commentRoutes from "./routes/CommentRoutes.js";

const app = express();
env.config();

connectDB();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173", "*"],
  credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

//  Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_SECRETE_KEY,
});

app.get("/", (req, res) => {
  res.send("Welcome to LearnUp app ");
});

// React Assistance API
app.post("/assistance/chats", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: "Say this is a test!" }],
      max_token: 100,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options,
    );
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/question", question);
app.use("/api/answer", answer);
app.use("/api/auth", auth);
app.use("/api/blog", blog);
app.use("/api/clerkauth", clerkauth);
app.use("/api/comments", commentRoutes);

app.listen(5000, () => console.log(`app is listen on port 5000 `));
