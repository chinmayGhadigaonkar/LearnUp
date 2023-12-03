// components/BlogPost.js
import React, { useState } from "react";
import BlogComment from "../comments/BlogComment";

const BlogPost = () => {
  const [likes, setLikes] = useState(0);
  const [show, setShow] = useState(false);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Title of Your Blog Post</h1>
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
            src="https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?b=1&s=612x612&w=0&k=20&c=_C4iNvLOzKbbfbeTMsJ4mQf8OGQwYWJ8GWKLKRglrF8="
            alt="Blog post cover"
            className="w-auto h- rounded-lg mx-auto mb-6"
          />
          <div className="text-gray-800 text-lg leading-relaxed">
            <p>
              This is the content of your blog post. You can write your blog
              content here.
            </p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
              ex et ante cursus sollicitudin. Quisque tristique, massa a
              pharetra tincidunt, purus justo hendrerit arcu, a feugiat dolor
              tellus ut justo. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Duis eu euismod dui.
              Nunc congue arcu et dolor auctor, at pharetra sapien congue.
            </p>
          </div>
        </div>
        <div className="mt-8 text-gray-300">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-start mb-4">
              <div className="">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOd6VLrAsHVVG0KJ7dMy-36-RAunP8w48blA&usqp=CAU"
                  alt="Author's profile"
                  className="w-10 h-10 rounded-full mr-4"
                />
              </div>
              <div className="ml-4">
                <p className="text-gray-800 font-semibold">John Doe</p>
                <p className="text-gray-600">October 6, 2023</p>
              </div>
            </div>
            <p className="text-gray-800">
              Great post! I learned a lot from this. Thanks for sharing.
            </p>
          </div>
        </div>
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
