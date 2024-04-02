import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import FetchRequest from "../../../utils/FetchRequest";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../../store/slice/userprofileSlice";

const AnswerActivity = () => {
  const { answer } = useSelector((state) => state.userprofile);
  const dispatch = useDispatch();

  return (
    <div className="flex-1">
      <div className="w-full">
        <h1 className="p-2 text-lg text-black font-semibold">
          Answer {answer && answer.length}
        </h1>{" "}
        <div className="border-2 py-4 px-2 m-2 space-y-4 h-full">
          {answer && answer.length === 0 ? (
            <div className="border-2 p-3 m-2 flex justify-center items-center h-full">
              <p className="text-center ">
                You have not{" "}
                <span className="underline text-blue-600 hover:text-black hover:cursor-pointer">
                  answered{" "}
                </span>{" "}
                any questions
              </p>
            </div>
          ) : (
            answer &&
            answer.map((data) => (
              <div key={data._id}>
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg hover:text-red-500 cursor-pointer text-black font-medium">
                      <span className="font-bold">Question : </span>{" "}
                      {/* {data.question.title} */}
                    </h1>
                    <h1 className="text-lg cursor-pointer text-black font-medium">
                      <span className="font-bold">Answer : </span>{" "}
                      <span
                        className=" hover:text-red-500 cursor-pointer "
                        dangerouslySetInnerHTML={{
                          __html:
                            data.answer.length > 10
                              ? data.answer.substring(0, 150) + "...."
                              : data.answer,
                        }}></span>
                    </h1>
                    <p>Votes {data.likes}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    {/* <button className="cursor-pointer border-2 rounded-md bg-black flex px-2 py-2 w-25">
                      <p className="text-white text-sm"> Edit </p>
                      <span className="px-1 py-0.5s">
                        {" "}
                        <Pencil color="white" size={16} />{" "}
                      </span>
                    </button> */}
                    <button
                      onClick={() => {
                        dispatch(deleteAnswer(data._id));
                      }}
                      className="cursor-pointer border-2 rounded-md bg-black flex px-2 py-2 w-25">
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

export default AnswerActivity;
