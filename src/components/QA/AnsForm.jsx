import React from "react";
import ReactQuill from "react-quill";
const AnsForm = () => {
  return (
    <>
      <div className=" space-y-5">
        <h1 className="text-2xl font-semibold">Your Answer</h1>
        <ReactQuill theme="snow" style={{ height: "150px" }} />
      </div>
      <div className=" w-full ">
          <button className="flex  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
            Post Your Answer
          </button>
        </div>
    </>
  );
};

export default AnsForm;
