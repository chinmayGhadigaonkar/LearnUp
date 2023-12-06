import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { CreateQuestion } from "../../store/slice/questionSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const AskQuestion = () => {
  const { status } = useSelector((state) => state.question);
  const [question, setQuestion] = useState({
    title: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [tag, setTag] = useState([]);
  const [editorValue, setEditorValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editorStyle = {
    background: "#f9f9fa",
    borderRadius: "3px ",
    Height: "300px",
    position: "relative",
    zIndex: 1,
  };

  const toolbarStyle = {
    position: "relative",
    Height: "42px",
    zIndex: 2,
  };

  const DeleteTag = (item) => {
    console.log(item);
    let newArray = tag.filter((t) => t != item);
    setTag(newArray);
  };

  const handleOnPost = () => {
    if (question.title === "" || tag.length == 0 || editorValue === "") {
      toast.error("All field require to fill ");
      return;
    }
    const data = {
      title: question.title,
      description: editorValue,
      tags: tag,
    };
    if (!localStorage.getItem("auth-token")) {
      toast.error("Plz Login Before Post your question ");
      return;
    }
    dispatch(CreateQuestion(data));
    if (status === "idle") {
      setEditorValue("");
      setQuestion("");
      navigate("/allquestion");
    }
  };
  const addTag = (e) => {
    e.preventDefault();
    if (tagInput === "") {
      toast.error("cannot be empty");
    }
    for (let index = 0; index < tag.length; index++) {
      if (tag[index] == tagInput) {
        toast.warn("Tag should be Unique");
        return;
      }
    }
    setTag((prev) => [...prev, tagInput]);
    setTagInput("");
  };
  const handleOnChange = (e) => {
    setQuestion({ ...question, [e.target.name]: [e.target.value] });
  };
  return (
    <>
      <section className="text-gray-600 body-font flex-1">
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
                    style={editorStyle} // Apply styles to the editor container
                    modules={{
                      toolbar: toolbarStyle, // Apply styles to the toolbar container
                    }}
                  />
                </div>
              </div>
              <div className="p-2  md:w-5/5 w-4/5">
                <form className="" onSubmit={addTag}>
                  <label
                    htmlFor="tag"
                    className="leading-7 text-lg my-2 text-gray-600">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    onChange={(e) => setTagInput(e.target.value)}
                    value={tagInput}
                    className="w-full h-12 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <button type="submit" className="hidden">
                    add tag
                  </button>
                </form>
                <div className="tag-container flex space-x-2 my-3">
                  {tag &&
                    tag.map((item, index) => (
                      <li
                        key={index}
                        className=" flex list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none rounded-sm">
                        {item}
                        <span
                          className="my-auto ml-2 cursor-pointer"
                          onClick={() => DeleteTag(item)}>
                          <X size={16} color="#ffffff" />
                        </span>
                      </li>
                    ))}
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
