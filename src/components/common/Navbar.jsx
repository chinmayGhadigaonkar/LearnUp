import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-black rounded-full"
              viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-2 text-red-500 text-2xl  font-bold">LearnUp.</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900" to="/allquestion">Q-A</Link>
            <Link className="mr-5 hover:text-gray-900" to="/blogs" >Blog</Link>
            <Link className="mr-5 hover:text-gray-900">Chats With AI</Link>
            <Link className="mr-5 hover:text-gray-900">Contact Us</Link>
          </nav>
          <button className="inline-flex items-center bg-red-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500 rounded text-base mt-4 md:mt-0">
           Login
            {/* <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg> */}
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;