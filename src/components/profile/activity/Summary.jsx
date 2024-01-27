import React from "react";

const Summary = () => {
  return (
    <div>
      <div className="">
        <div className="flex w-full space-x-2 h-81">
          <div className="w-1/2    ">
            <h1 className="p-2  text-lg text-black font-semibold ">
              Answers :
            </h1>{" "}
            <div className="border-2 p-3 m-2 h-40 flex justify-center items-center">
              <p className="text-center ">
                You have not{" "}
                <span className="underline text-blue-600 hover:text-black hover:cursor-pointer">
                  answered
                </span>{" "}
                any questions
              </p>
            </div>
          </div>
          <div className="w-1/2    ">
            <h1 className="p-2  text-lg text-black font-semibold ">
              Questions :
            </h1>{" "}
            <div className="border-2 p-3 m-2 h-40 flex justify-center items-center">
              <p className="text-center ">
                You have not{" "}
                <span className="underline text-blue-600 hover:text-black hover:cursor-pointer">
                  asked
                </span>{" "}
                any questions
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full space-x-2 h-81">
          <div className="w-1/2    ">
            <h1 className="p-2  text-lg text-black font-semibold ">Blogs :</h1>{" "}
            <div className="border-2 p-3 m-2 flex h-40 justify-center items-center">
              <p className="text-center ">
                You have not{" "}
                <span className="underline text-blue-600 hover:text-black hover:cursor-pointer">
                  added
                </span>{" "}
                any questions
              </p>
            </div>
          </div>
          <div className="w-1/2    ">
            <h1 className="p-2  text-lg text-black font-semibold ">
              reputation :
            </h1>{" "}
            <div className="border-2 p-3 m-2 flex h-40 justify-center items-center">
              <p className="text-center ">
                You have no recent{" "}
                <span className="underline text-blue-600 hover:text-black hover:cursor-pointer">
                  reputation
                </span>{" "}
                changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
