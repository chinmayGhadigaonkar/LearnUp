import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import AllQuestion from "./components/QA/AllQuestion";
import Blog from "./components/blog/Blog";
import CreateBlog from "./components/blog/CreateBlog";
import Login from "./pages/Login";
import AskQuestion from "./components/QA/AskQuestion";
import SingleQuestion from "./components/QA/SingleQuestion";
import AIChatPage from "./components/ai/AIChatPage";
import ContactUS from "./pages/ContactUS";
import BlogPost from "./components/blog/BlogPost";
import SignUp from "./pages/SignUp";
import { useDispatch } from "react-redux";
import { GetAllQuestion } from "./store/slice/questionSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllQuestion());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allquestion" element={<AllQuestion />} />
          <Route path="/askquestion" element={<AskQuestion />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singlequestion" element={<SingleQuestion />} />
          <Route path="/aichats" element={<AIChatPage />} />
          <Route path="/contactus" element={<ContactUS />} />
          <Route path="/BlogPost" element={<BlogPost />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/createblog" element={<CreateBlog />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
