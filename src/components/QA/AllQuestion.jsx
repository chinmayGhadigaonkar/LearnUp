import React from "react";
import Questions from "./Questions";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AllQuestion = () => {
  const { questions } = useSelector((state) => state.question);

  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-1 h-full px-2 py-3 w-full space-x-2">
        {/* <div className=" h-full w-3/12 bg-red-500">
          <li>Newest</li>
        </div> */}

        <div className="w-11/12 mx-auto  my-2 ">
          <header className="flex justify-between py-3 h-20  ">
            <h1 className="text-xl ml-2 font-semibold  my-auto ">
              Top Questions
            </h1>
            <button
              onClick={() => {
                navigate("/askquestion");
              }}
              className=" my-auto text-white bg-black border-0 py-1 px-2 h-10 focus:outline-none hover:bg-white hover:border-red-500  hover:border-2 hover:text-red-500 rounded text-lg ">
              Ask Question
            </button>
          </header>
          <div className="flex-1 ">
            {questions.map((q) => {
              return (
                <div key={q._id}>
                  <Link to={`/singlequestion/${q._id}`}>
                    <Questions que={q} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllQuestion;
