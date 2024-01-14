import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Triangle } from "lucide-react";
import {
  GetAllAnswer,
  answerDisLike,
  answerLike,
} from "../../store/slice/answerSlice";
import { useParams } from "react-router-dom";
const Answer = () => {
  const [upVote, setDownVote] = useState();
  const { answer } = useSelector((state) => state.answer);

  const dispatch = useDispatch();

  const handleOnLike = (id) => {
    dispatch(answerLike(id));
  };
  const handleOnDisLike = (id) => {
    dispatch(answerDisLike(id));
  };
  const params = useParams();

  // useEffect(() => {
  //   dispatch(GetAllAnswer(params.id));
  // }, []);

  return (
    <div className="px-2">
      <h1 className="text-2xl py-2  px-2 font-semibold">
        {answer.length} Answer
      </h1>
      {answer &&
        answer.map((item) => {
          return (
            <div key={item._id} className=" px-2 space-y-6 flex-1 py-10">
              <div className="flex  md:w-10/12 space-x-4">
                <div className="flex flex-col md:w-4/12">
                  <button
                    className={` mx-auto h-12 w-12 my-1 text-center shadow-md  text-black border-2  rounded-full p-2 ${
                      upVote ? " text-red-500  hover:bg-red-100" : "bg-white"
                    }`}
                    onClick={() => handleOnLike(item._id)}>
                    <Triangle fill="black" color="none" />
                    {/* <Triangle color="#ffffff" strokeWidth={1.5} /> */}
                  </button>
                  <h1 className="mx-auto my-1 font-semibold  text-xl">
                    {item.likes - item.dislikes}
                  </h1>
                  <button
                    className={` mx-auto h-12 w-12 text-center shadow-md  text-black border-2 rounded-full p-2  ${
                      !upVote ? "text-red-500 hover:bg-red-100" : "bg-white"
                    }`}
                    onClick={() => {
                      handleOnDisLike(item._id);
                    }}>
                    <Triangle
                      fill="black"
                      color="none"
                      transform="rotate(180 0 0)"
                    />
                  </button>
                </div>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.answer,
                    }}></div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default Answer;
