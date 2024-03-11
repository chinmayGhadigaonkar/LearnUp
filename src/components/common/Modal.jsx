import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export const Modal = ({ children, showModal, setShowModal }) => {
  if (!showModal) return null;
  return (
    <div className="absolute   inset-0 my-[30px] mx-5 sm:mx-0  max-w-screen max-h-screen flex items-center justify-center z-50   ">
      <div className="lg:w-[500px] border-2 w-[400px] h-[500px] flex flex-col shadow-md rounded-md bg-white">
        <div className="flex  justify-between px-2 py-2">
          <h3>{"Title"}</h3>
          <AiFillCloseCircle
            className="ml-auto  cursor-pointer text-xl  "
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};
