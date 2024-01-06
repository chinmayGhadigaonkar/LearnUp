import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
// import SignUp from "./pages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { GetAllQuestion } from "./store/slice/questionSlice";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import { VITE_CLERK_PUBLISHABLE_KEY } from "./utils/config";
import { ClerkProvider, SignUp, useUser } from "@clerk/clerk-react";
import SignInPage from "./pages/SignIn";
import { removeUser } from "./store/slice/userSlice";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const isAuthenticate = user ? true : false;
  useEffect(() => {
    dispatch(GetAllQuestion());
    // if (!isSignedIn) {
    //   dispatch(removeUser());
    // }
  }, []);

  // const navigate = useNavigate();
  return (
    <>
      <BrowserRouter>
        <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
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
            <Route to="/" path="/" element={<Home />} />
            <Route path="/allquestion" element={<AllQuestion />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contactus" element={<ContactUS />} />
            {/* <Route path="/Signup" element={<SignUp />} /> */}
            <Route path="/sign-in" element={<SignInPage path="/sign-in" />} />
            <Route
              path="/sign-up"
              element={
                <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
              }
            />

            <Route
              element={<ProtectedRoutes isAuthenticate={isAuthenticate} />}>
              <Route path="/askquestion" element={<AskQuestion />} />
              <Route path="/singlequestion/:id" element={<SingleQuestion />} />
              <Route path="/BlogPost/:id" element={<BlogPost />} />
              <Route path="/createblog" element={<CreateBlog />} />
              <Route path="/aichats" element={<AIChatPage />} />
            </Route>
          </Routes>

          <Footer />
        </ClerkProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
