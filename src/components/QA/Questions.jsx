import React from "react";
import { useSelector } from "react-redux";

const Questions = ({ que }) => {
  const originalTimestamp = new Date(que.createdAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const formattedDate = originalTimestamp.toLocaleDateString("en-US", options);
  const { title, tags, likes, description } = que;
  // let shortDescription =
  //   description.length > 20 ? description.subStr(0, 20) + "...." : description;
  const { answer } = useSelector((state) => state.answer);

  return (
    <>
      <hr className="border-top-2 border-gray-400 " />
      <div className="w-full  px-10">
        <div className=" w- flex  items-center space-x-10 my-auto ">
          <div className="my-4 pl-4">
            <div className="votes text-black text-xl">{likes} Votes</div>
            <div className="Answer text-black"> 0 Answer</div>
          </div>
          <div className="mt-4 w-full">
            <div className="head-question text-black font-semibold  text-xl my-1">
              <h1>{title}</h1>
            </div>
            <div className="head-question  text-md my-1">
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    description.length > 10
                      ? description.substring(0, 150) + "...."
                      : description,
                }}></p>
            </div>
            <div className="flex justify-between  space-x-12 w-12/12  my-4 ">
              <div className="tags my-auto  flex space-x-3  ">
                {tags &&
                  tags.map((item) => {
                    return (
                      <li
                        key={item}
                        className=" list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none rounded-sm">
                        {item}
                      </li>
                    );
                  })}
              </div>
              <div className=" flex justify-end ">
                <h2 className=" text-black cursor-pointer text-bold">
                  {que.user.name}
                </h2>
                <span className="text-gray-500 mx-2"> {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
