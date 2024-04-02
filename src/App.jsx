import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
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
import { ClerkProvider, SignUp, useAuth, useUser } from "@clerk/clerk-react";
import SignInPage from "./pages/SignIn";
import { removeUser } from "./store/slice/userSlice";
import Profile from "./components/profile/Profile";
import ProfileMain from "./components/profile/Main";
import ActivityPage from "./components/profile/activity";
import SettingPage from "./components/profile/Setting";
import AnswerActivity from "./components/profile/activity/AnswerActivity";
import QuestionActivity from "./components/profile/activity/QuestionActivity";
import BlogActivity from "./components/profile/activity/BlogActivity";
import Reputation from "./components/profile/activity/Reputation";
import Summary from "./components/profile/activity/Summary";
import { Modal } from "./components/common/modal";
import {
  createProfile,
  getProfile,
  getProfileAnswer,
  getProfileBlog,
  getProfileQuestion,
} from "./store/slice/userprofileSlice";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const [children, setChildren] = useState(<>Model</>);

  // const { isSignedIn } = useAuth();

  const isAuthenticate = user ? true : false;
  useEffect(() => {
    dispatch(GetAllQuestion());
    console.log(isAuthenticate);
    // if (localStorage.getItem("auth-token") && !isSignedIn) {
    //   console.log("remove user");
    //   dispatch(removeUser());
    // }
  }, []);
  // useEffect(() => {
  //   if (isAuthenticate) {
  //     dispatch(createProfile());
  //   }
  // }),
  //   [0];
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getProfileQuestion());
    dispatch(getProfileAnswer());
    dispatch(getProfileBlog());
  }, []);

  // const navigate = useNavigate();
  return (
    <>
      <BrowserRouter>
        <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
          <Navbar />
          <Modal
            children={children}
            showModal={showModal}
            setShowModal={setShowModal}
          />
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
                // <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
                <SignUp />
              }
            />

            <Route
              element={<ProtectedRoutes isAuthenticate={isAuthenticate} />}>
              <Route path="/askquestion" element={<AskQuestion />} />
              <Route path="/singlequestion/:id" element={<SingleQuestion />} />
              <Route path="/BlogPost/:id" element={<BlogPost />} />
              <Route path="/createblog" element={<CreateBlog />} />
              <Route path="/aichats" element={<AIChatPage />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="/profile/main" element={<ProfileMain />} />
                <Route path="/profile/activity" element={<ActivityPage />}>
                  <Route
                    path="/profile/activity/summary"
                    element={<Summary />}
                  />
                  <Route
                    path="/profile/activity/answers"
                    element={<AnswerActivity />}
                  />
                  <Route
                    path="/profile/activity/questions"
                    element={<QuestionActivity />}
                  />
                  <Route
                    path="/profile/activity/blogs"
                    element={<BlogActivity />}
                  />
                  <Route
                    path="/profile/activity/reputation"
                    element={<Reputation />}
                  />
                </Route>
                <Route path="/profile/setting" element={<SettingPage />} />
              </Route>
            </Route>
          </Routes>

          <Footer />
        </ClerkProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
