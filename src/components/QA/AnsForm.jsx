import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { AddAnswer, GetAllAnswer } from "../../store/slice/answerSlice";
import { toast } from "react-toastify";
const AnsForm = ({ id }) => {
  const dispatch = useDispatch();
  const [editorValue, setEditorValue] = useState("");

  const handleOnAnswer = () => {
    if (editorValue === "") {
      toast.error("Answer Should Not be Blank ");
      return;
    }

    const data = {
      questionId: id,
      answers: editorValue,
    };
    dispatch(AddAnswer(data));
  };

  useEffect(() => {
    dispatch(GetAllAnswer(id));
  }, []);
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
  return (
    <>
      <div className=" space-y-6 flex-1 py-5 ">
        <h1 className="text-2xl font-semibold">Your Answer</h1>
        <ReactQuill
          theme="snow"
          style={editorStyle} // Apply styles to the editor container
          onChange={(value) => setEditorValue(value)}
          modules={{
            toolbar: toolbarStyle, // Apply styles to the toolbar container
          }}
          value={editorValue}
        />
        <div className=" w-full ">
          <button
            onClick={() => handleOnAnswer()}
            className="flex  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
            Post Your Answer
          </button>
        </div>
      </div>
    </>
  );
};

export default AnsForm;
