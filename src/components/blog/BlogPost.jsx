// components/BlogPost.js
import React, { useEffect, useState } from "react";
import BlogComment from "../comments/BlogComment";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FetchRequest from "../../utils/FetchRequest";
import AllComment from "../comments/AllComment";

const BlogPost = () => {
  const [likes, setLikes] = useState(0);
  const [show, setShow] = useState(false);
  const [blog, setBlog] = useState("");

  const params = useParams();

  const GetSingleBlog = async (id) => {
    try {
      const res = await FetchRequest.get(`blog/getblog/${id}`);
      const { success, blogs } = res.data;

      if (success) {
        setBlog(blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSingleBlog(params.id);
  }, []);
  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
        <p className="text-gray-300 text-lg mb-2">
          Published on October 5, 2023
        </p>
        <div className="flex items-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOd6VLrAsHVVG0KJ7dMy-36-RAunP8w48blA&usqp=CAU"
            alt="Author's profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <p className="text-gray-600">By John Doe</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img
            src={
              blog.image
                ? blog.image
                : "https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?b=1&s=612x612&w=0&k=20&c=_C4iNvLOzKbbfbeTMsJ4mQf8OGQwYWJ8GWKLKRglrF8="
            }
            alt="Blog post cover"
            className="sm:w-[60%] h- rounded-lg mx-auto mb-6"
          />
          <div className="text-gray-800 text-lg leading-relaxed">
            <p
              className="leading-relaxed mb-3"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}></p>
          </div>
        </div>
        <AllComment />

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-300">Likes</h2>
          <div className="mt-4 flex items-center">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              onClick={handleLikeClick}>
              Like
            </button>
            <p className="ml-4 text-gray-600">{likes} Likes</p>
          </div>
        </div>
        <div className="mt-8">
          {!show ? (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={() => setShow(true)}>
              Add Your Comment
            </button>
          ) : (
            <BlogComment></BlogComment>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
