import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { CreateQuestion } from "../../store/slice/questionSlice";
import { toast } from "react-toastify";

const AskQuestion = () => {
  const [question, setQuestion] = useState({
    title: "",
    tags: "",
  });
  const [editorValue, setEditorValue] = useState("");

  const dispatch = useDispatch();

  const handleOnPost = () => {
    if (question.title === "" || question.description === "") {
      toast.error("All field require to fill ");
      return;
    }
    const data = {
      title: question.title,
      description: editorValue,
      tags: question.tags,
    };
    dispatch(CreateQuestion(data));
  };
  // console.log( editorValue);

  const handleOnChange = (e) => {
    setQuestion({ ...question, [e.target.name]: [e.target.value] });
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className=" md:px-5 py-8 md:py-24 ">
          <div className="flex flex-col w-full mb-12">
            <h1 className="text-2xl font-semibold  text-gray-900  my-2">
              Ask Question Here
            </h1>
          </div>
          <div className="lg:w-3/3  md:w-3/3  ">
            <div className="flex flex-col  flex-wrap -m-2">
              <div className="p-2 md:w-5/5 w-4/5">
                <div className="">
                  <label
                    htmlFor="heading"
                    className="leading-7 text-sm text-gray-600">
                    Title
                  </label>

                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleOnChange}
                    value={question.title}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none  py-1 px-3 text-black  leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2  md:w-5/5 w-4/5">
                <div className="">
                  <label
                    htmlFor="tag"
                    className="leading-7 text-lg my-2 text-gray-600">
                    Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={editorValue}
                    onChange={(value) => setEditorValue(value)}
                  />
                </div>
              </div>
              <div className="p-2  md:w-5/5 w-4/5">
                <div className="">
                  <label
                    htmlFor="tag"
                    className="leading-7 text-lg my-2 text-gray-600">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    onChange={handleOnChange}
                    value={question.tags}
                    className="w-full h-12 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  onClick={() => {
                    handleOnPost();
                  }}
                  className="flex  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AskQuestion;
