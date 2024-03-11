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
import FetchRequest from "../../utils/FetchRequest";
const Answer = () => {
  const [upVotes, setUpVotes] = useState({});
  const [downVotes, setDownVotes] = useState({});

  const [user, setUser] = useState();
  const { answer } = useSelector((state) => state.answer);

  const dispatch = useDispatch();

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const handleOnLike = (id) => {
    dispatch(answerLike(id));
  };
  const debouncedHandleOnLike = debounce(handleOnLike, 1000);
  const handleOnDisLike = (id) => {
    dispatch(answerDisLike(id));
  };
  const debouncedHandleOnDisLike = debounce(handleOnDisLike, 1000);
  const getUser = async () => {
    try {
      const res = await FetchRequest.get(`clerkauth/getuser`);
      const { success, users } = res.data;
      if (success) {
        setUser(users._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const params = useParams();

  useEffect(() => {
    getUser();
    dispatch(GetAllAnswer(params.id));
  }, [, dispatch]);

  useEffect(() => {
    if (user && answer) {
      const newUpVotes = {};
      const newDownVotes = {};
      answer.forEach((item) => {
        newUpVotes[item._id] = item.likeById.includes(user);
        newDownVotes[item._id] = item.dislikeById.includes(user);
      });
      setUpVotes(newUpVotes);
      setDownVotes(newDownVotes);
    }
  }, [user, answer]);

  // console.log(answer[0].user.fullname);
  // console.log(answer[0].user.username);
  return (
    <div className="px-2">
      <h1 className="text-2xl py-2  px-2 font-semibold">
        {answer && answer.length} Answer
      </h1>
      {answer &&
        answer.map((item) => {
          return (
            <div key={item._id} className=" px-2 space-y-6 flex-1 py-10">
              <div className="flex  md:w-10/12 space-x-4">
                <div className="flex flex-col md:w-4/12">
                  <button
                    className={` mx-auto h-12 w-12 my-1 text-center shadow-md  text-black border-2  rounded-full p-2 ${
                      upVotes[item._id] && !downVotes[item._id]
                        ? " bg-red-500  hover:bg-red-100"
                        : "bg-white "
                    }`}
                    onClick={() => debouncedHandleOnLike(item._id)}>
                    <Triangle fill="black" color="none" />
                    {/* <Triangle color="#ffffff" strokeWidth={1.5} /> */}
                  </button>
                  <h1 className="mx-auto my-1 font-semibold  text-xl">
                    {item.likes - item.dislikes}
                  </h1>
                  <button
                    className={` mx-auto h-12 w-12 text-center shadow-md  text-black border-2 rounded-full p-2  ${
                      !upVotes[item._id] && downVotes[item._id]
                        ? " bg-red-500 hover:bg-red-100"
                        : "bg-white"
                    }`}
                    onClick={() => {
                      debouncedHandleOnDisLike(item._id);
                    }}>
                    <Triangle
                      fill="black"
                      color="none"
                      transform="rotate(180 0 0)"
                    />
                  </button>
                </div>
                <div className="w-full">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.answer,
                    }}></div>
                </div>

                {/* <div className="flex space-x-2  items-end justify-end">
                  <h1 className="h-10 py-2 text-end font-semibold px-2 ">
                    Answer by : {answer[0].user.username}{" "}
                  </h1>
                </div> */}
              </div>
              <div className="flex space-x-2 w-full   items-end justify-end">
                <h1 className="h-24 w-40  py-2 border-2 bg-blue-100 rounded-md shadow-sm    font-semibold px-2 ">
                  Answer by :
                  <div className="text-blue-600 flex">
                    {" "}
                    <p className="border-2 flex justify-center items-center bg-red-500 text-white w-12 py-auto text-center rounded-md h-10 text-lg mx-1">
                      {answer[0].user.fullname &&
                        answer[0].user.fullname.charAt(0)}
                    </p>{" "}
                    {answer[0].user.username && answer[0].user.username}{" "}
                  </div>
                </h1>
              </div>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default Answer;
