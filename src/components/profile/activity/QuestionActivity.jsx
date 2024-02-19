import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import FetchRequest from "../../../utils/FetchRequest";
import { Link } from "react-router-dom";

const QuestionActivity = () => {
  const [question, setQuestion] = useState();
  const FetchData = async () => {
    try {
      const res = await FetchRequest.get(`/question/getuserquestion`);
      const { question } = res.data;
      console.log(question);
      setQuestion(question);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="flex-1">
      <div className="w-full">
        <h1 className="p-2 text-lg text-black font-semibold">
          Question {question && question.length}{" "}
        </h1>{" "}
        <div className="border-2 py-4 px-2 m-2 space-y-4 h-full">
          {question && question.length === 0 ? (
            <div className="border-2 p-3 m-2 flex justify-center items-center h-full">
              <p className="text-center ">
                You have not{" "}
                <span className="underline text-blue-600 hover:text-black hover:cursor-pointer">
                  asked
                </span>{" "}
                any questions
              </p>
            </div>
          ) : (
            question &&
            question.map((data) => (
              <div key={data._id}>
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg hover:text-red-500 cursor-pointer text-black font-semibold">
                      <Link to={`/singlequestion/${data._id}`}>
                        {data.title}
                      </Link>
                    </h1>
                    <p>Votes {data.likes - data.dislikes} </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button className="cursor-pointer border-2 rounded-md bg-black flex px-2 py-2 w-25">
                      <p className="text-white text-sm"> Edit </p>
                      <span className="px-1 py-0.5s">
                        {" "}
                        <Pencil color="white" size={16} />{" "}
                      </span>
                    </button>
                    <button className="cursor-pointer border-2 rounded-md bg-black flex px-2 py-2 w-25">
                      <p className="text-white text-sm"> Delete </p>
                      <span className="px-1 py-0.5s">
                        {" "}
                        <Trash2 color="white" size={16} />{" "}
                      </span>
                    </button>
                  </div>
                </div>
                <hr className="border-1 border-black " />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionActivity;
