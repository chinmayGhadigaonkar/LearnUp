import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../store/slice/userSlice";
import { toast } from "react-toastify";
import { LogIn, LogOut } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import SignIn from "../../pages/SignIn";
import SignInNormal from "../../pages/SignIn";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Data = () => {
    // token not define
    // console.log(localStorage.getItem("auth-token"));
    return (
      <>
        {localStorage.getItem("auth-token") ? (
          <>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <Link to={"/sign-in"}>
            <button className="inline-flex items-center w-20 bg-red-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500 rounded text-base mt-4 md:mt-0">
              Login <LogIn size={20} />
            </button>
          </Link>
        )}
      </>
    );
  };

  const handleonLogout = () => {
    dispatch(removeUser());
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <>
      <header className="text-gray-600 body-font border-b-2">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-black rounded-full"
              viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-2 text-red-500 text-2xl  font-bold">
              LearnUp.
            </span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link
              className="mr-5 text-gray-900 font-semibold  text-lg hover:text-lg transition-all  px-1  hover:delay-100 hover:text-red-500 "
              to="/allquestion">
              Questions
            </Link>
            <Link
              className="mr-5  text-gray-900 font-semibold  text-lg hover:text-lg transition-all  px-1  hover:delay-100 hover:text-red-500 "
              to="/blogs">
              Blog
            </Link>
            <Link
              className="mr-5  text-gray-900 font-semibold  text-lg hover:text-lg transition-all  px-1  hover:delay-100 hover:text-red-500 "
              to="/aichats">
              Chats With AI
            </Link>
            <Link
              className="mr-5  text-gray-900 font-semibold  text-lg hover:text-lg transition-all  px-1  hover:delay-100 hover:text-red-500 "
              to="/profile/main">
              Profile
            </Link>
          </nav>
          {/* 
          {!localStorage.getItem("auth-token") ? (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="inline-flex items-center w-20 bg-red-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500 rounded text-base mt-4 md:mt-0">
              Login <LogIn size={20} />
            </button>
          ) : (
            <button
              onClick={() => {
                handleonLogout();
              }}
              className="inline-flex items-center w-20 bg-red-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500 rounded text-base mt-4 md:mt-0">
              LogOut <LogOut size={24} />
            </button>
          )} */}
          <Data />
        </div>
      </header>
    </>
  );
};

export default Navbar;
