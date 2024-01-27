import React from "react";

const Reputation = () => {
  return (
    <div className="flex-1">
      <div className="w-full h-56   ">
        <h1 className="p-2  text-lg text-black font-semibold ">1 Reputation</h1>{" "}
        <div className="border-2 p-3 m-2  flex justify-center items-center h-full">
          <p className="text-center ">
            You have no{" "}
            <span className="underline text-blue-600 hover:text-black hover:cursor-pointer">
              reputation
            </span>{" "}
            changes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reputation;
