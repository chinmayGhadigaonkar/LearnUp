import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Triangle } from "lucide-react";
const Answer = () => {
  const [upVote, setDownVote] = useState();
  const { answer } = useSelector((state) => state.answer);

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
                    onClick={() => setDownVote(true)}>
                    <Triangle fill="black" color="none" />
                    {/* <Triangle color="#ffffff" strokeWidth={1.5} /> */}
                  </button>
                  <h1 className="mx-auto my-1 font-semibold  text-xl">0</h1>
                  <button
                    className={` mx-auto h-12 w-12 text-center shadow-md  text-black border-2 rounded-full p-2  ${
                      !upVote ? "text-red-500 hover:bg-red-100" : "bg-white"
                    }`}
                    onClick={() => setDownVote()}>
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
