import React, { useEffect } from "react";
import BlogItem from "./BlogItem";
import { Link, useNavigate } from "react-router-dom";
import ProfileSidebar from "../profile/ProfileSideBar";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBlog } from "../../store/slice/blogSlice";
const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs } = useSelector((state) => state.blog);

  console.log(blogs);
  useEffect(() => {
    dispatch(GetAllBlog());
  }, []);

  return (
    <>
      <div className="flex flex-1 h-full px-2 py-3 w-full space-x-2">
        {/* <ProfileSidebar></ProfileSidebar> */}
        <div className="h-full mx-auto w-11/12">
          <header className="flex justify-between py-3 h-20   ">
            <h1 className="text-xl ml-2 font-semibold  my-auto">Top Blogs</h1>
            <button
              onClick={() => {
                navigate("/createblog");
              }}
              className=" my-auto text-white bg-black border-0 py-1 px-2 h-10 focus:outline-none hover:bg-white hover:border-red-500  hover:border-2 hover:text-red-500 rounded text-lg ">
              Create Your Blog
            </button>
          </header>

          <div className="flex  flex-wrap mx-auto w-[80%] ">
            {blogs &&
              blogs.map((Item) => {
                return <BlogItem blog={Item} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
