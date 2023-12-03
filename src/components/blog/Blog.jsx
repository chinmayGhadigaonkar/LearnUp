import React from "react";
import BlogItem from "./BlogItem";
import { Link, useNavigate } from "react-router-dom";
import ProfileSidebar from "../profile/ProfileSideBar";
const Blog = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex ">
        <ProfileSidebar></ProfileSidebar>
        <div className="h-full mx-auto w-11/12">
          <header className="flex justify-between py-3 h-20  ">
            <h1 className="text-xl ml-2 font-semibold ">Top Blogs</h1>
            <button
              onClick={() => {
                navigate("/createblog");
              }}
              className=" text-white bg-black border-0 py-1 px-2 h-10 focus:outline-none hover:bg-white hover:border-red-500  hover:border-2 hover:text-red-500 rounded text-lg ">
              Create Your Blog
            </button>
          </header>

          <div className="flex  flex-wrap mx-auto w-[80%] ">
            <BlogItem />

            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
