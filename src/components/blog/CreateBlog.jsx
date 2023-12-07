import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddBlog } from "../../store/slice/blogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [readTime, setreadTime] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Custom styles for ReactQuill
  // console.log(image);
  const handleOnPost = () => {
    if (title === "") {
      toast.warn("Title should not be blank");
      return;
    }
    if (description === "") {
      toast.warn("Description should not be blank");
      return;
    }
    const data = {
      title: title,
      content: description,
      image: image,
      readtime: readTime,
    };
    dispatch(AddBlog(data));

    navigate("/blogs");
  };

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

  console.log(image);
  return (
    <section className="text-gray-600 body-font">
      <div className=" md:px-5 py-8 md:py-24 ">
        <div className="flex flex-col w-full mb-12">
          <h1 className="text-2xl font-semibold  text-gray-900  my-2">
            Add Your Blog
          </h1>
        </div>
        <div className="lg:w-3/3  md:w-3/3  ">
          <div className="flex flex-col  flex-wrap -m-2">
            <div className="p-2 md:w-5/5 w-4/5">
              <div className="">
                <label
                  htmlFor="heading"
                  className="leading-7 text-lg text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  className="w-full mt-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none  py-1 px-3 text-black  leading-8 transition-colors duration-200 ease-in-out"
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
                  value={description}
                  onChange={(value) => setDescription(value)}
                  style={editorStyle} // Apply styles to the editor container
                  modules={{
                    toolbar: toolbarStyle, // Apply styles to the toolbar container
                  }}
                />
              </div>
            </div>
            <div className="p-2  md:w-5/5 w-4/5">
              <div className="">
                <label
                  htmlFor="tag"
                  className="leading-7 text-lg my-2 text-gray-600">
                  Add Image
                </label>
                <br />
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  className=" h-12 mt-2 "
                />
              </div>
            </div>

            <div className="p-2  md:w-5/5 w-4/5">
              <div className="">
                <label
                  htmlFor="ReadTime"
                  className="leading-7 text-lg my-2 text-gray-600">
                  Read Time
                </label>
                <input
                  type="number"
                  id="readTime"
                  name="readTime"
                  value={readTime}
                  onChange={(e) => setreadTime(e.target.value)}
                  className="w-full h-12 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <button
                onClick={() => handleOnPost()}
                className="flex  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBlog;
