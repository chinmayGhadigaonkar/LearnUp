import React from "react";

const BlogActivity = () => {
  return (
    <div className="flex-1">
      <div className="w-full h-56   ">
        <h1 className="p-2  text-lg text-black font-semibold ">Blog 0 </h1>{" "}
        <div className="border-2 p-3 m-2  flex justify-center items-center h-full">
          <p className="text-center ">
            You have not{" "}
            <span className="underline text-blue-600 hover:text-black hover:cursor-pointer">
              added
            </span>{" "}
            any blog
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogActivity;
