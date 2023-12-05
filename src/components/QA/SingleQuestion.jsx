import React, { useEffect, useState } from "react";
import AnsForm from "./AnsForm";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FetchRequest from "../../utils/FetchRequest";
import { useDispatch } from "react-redux";
import Answer from "./Answer";

const SingleQuestion = () => {
  const [upVote, setDownVote] = useState();
  const [question, setQuestion] = useState("");
  const getparams = useParams();

  const getSingleQuestion = async (id) => {
    try {
      const res = await FetchRequest.get(`question/getquestion/${id}`);
      const { success, question } = res.data;

      if (success) {
        setQuestion(question);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleQuestion(getparams.id);
  }, []);
  return (
    <>
      {question && (
        <div className=" px-2 space-y-6 flex-1 py-10">
          <h1 className="text-3xl font-bold">{question.title}</h1>
          <hr />
          <div className="flex  md:w-10/12 space-x-4">
            <div className="flex flex-col md:w-4/12">
              <button
                className={` mx-auto h-12 w-12 my-1 text-center  text-black border-2  rounded-full p-2 ${
                  upVote ? " text-red-500 border-red-500" : "bg-white"
                }`}
                onClick={() => setDownVote(true)}>
                <FaArrowUp size={20} />
              </button>
              <h1 className="mx-auto my-1 font-semibold  text-xl">
                {question.likes}
              </h1>
              <button
                className={` mx-auto h-12 w-12 text-center  text-black border-2 rounded-full p-2  ${
                  !upVote ? "text-red-500 border-red-500" : "bg-white"
                }`}
                onClick={() => setDownVote()}>
                <FaArrowDown size={20} />
              </button>
            </div>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: question.description,
                }}></div>
              <div className="tags  flex space-x-3 my-2   ">
                {question.tags &&
                  question.tags.map((item) => {
                    return (
                      <li
                        key={item}
                        className=" list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none rounded-sm">
                        {item}
                      </li>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className=" border-1 border-solid border-black mt-2" />
      <Answer />

      <hr className=" border-1 border-solid border-black mt-2" />
      <AnsForm id={getparams.id} />
    </>
  );
};

export default SingleQuestion;
