import React, { useState } from "react";
import AnsForm from "./AnsForm";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
const SingleQuestion = () => {
  const [upVote, setDownVote] = useState();
  return (
    <>
      <div className=" px-2 space-y-3">
        <h1 className="text-3xl font-bold">Finding the sum of a subset</h1>
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
            <h1 className="mx-auto my-1 font-semibold  text-xl">1</h1>
            <button
              className={` mx-auto h-12 w-12 text-center  text-black border-2 rounded-full p-2  ${
                !upVote ? "text-red-500 border-red-500" : "bg-white"
              }`}
              onClick={() => setDownVote()}>
              <FaArrowDown size={20} />
            </button>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              enim fuga fugiat nulla praesentium delectus quod est explicabo
              minus inventore, dignissimos, ea nam. Saepe, ipsa culpa! Eveniet,
              libero. Libero, blanditiis adipisci ducimus est sit vitae . Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempora
              perferendis, rerum commodi porro non, ea ullam distinctio
              obcaecati, fugit mollitia laborum placeat reprehenderit laboriosam
              fuga. Odio, eius consectetur. Voluptatem dolore inventore nulla ab
              error.
            </p>
            <div className="tags  flex space-x-3 my-2   ">
              <li className=" list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none rounded-sm">
                tags
              </li>
              <li className=" list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none  rounded-sm ">
                tags
              </li>
            </div>
          </div>
        </div>

        
      </div>
      <hr className=" border-1 border-solid border-black mt-2" />
      <AnsForm />
    </>
  );
};

export default SingleQuestion;
