import React from "react";
import author from "../../assets/author.png";
import { Link } from "react-router-dom";
const BlogItem = ({ blog }) => {
  return (
    <>
      <div key={blog._id} className="p-4  md:w-1/3">
        <div className="h-full  shadow-lg border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src="https://blog.scientix.eu/files/2015/06/ideyweb_jpeg-640x340.jpg"
            alt="educational blog"
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              EDUCATION
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {blog.title}
            </h1>
            <p
              className="leading-relaxed mb-3"
              dangerouslySetInnerHTML={{
                __html:
                  blog.content.length > 100
                    ? blog.content.substring(0, 200) + " ..... "
                    : blog.content,
              }}></p>
            <div className="flex items-center flex-wrap">
              <Link
                to={`/BlogPost/${blog._id}`}
                className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0">
                Learn More
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
