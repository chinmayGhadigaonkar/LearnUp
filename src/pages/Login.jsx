import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container md:px-5 py-8 md:py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-2xl font-semibold  text-gray-900  my-2">
              Login Here
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3  mx-auto">
            <div className="flex flex-col justify-center items-center flex-wrap -m-2">
              <div className="p-2 md:w-3/5 w-4/5">
                <div className="">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none  py-1 px-3 text-black  leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2  md:w-3/5 w-4/5">
                <div className="">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-600">
                    Password{" "}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <Link to="/Signup">
                {" "}
                <p className="text-sm py-1 text-red-500 cursor-pointer">
                  Create new Account
                </p>
              </Link>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
