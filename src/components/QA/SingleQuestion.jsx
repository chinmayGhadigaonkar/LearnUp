import React, { useCallback, useEffect, useState } from "react";
import AnsForm from "./AnsForm";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FetchRequest from "../../utils/FetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "lucide-react";
import Answer from "./Answer";
import formatDateDifference from "../../utils/FormatDate";
import {
  getSingleQuestion,
  questionDisLike,
  questionLike,
} from "../../store/slice/SingleQuestionSlice";

const SingleQuestion = () => {
  // Timer part remaining for likes and dislikes
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  // const [question, setQuestion] = useState("");
  const getparams = useParams();
  const [user, setUser] = useState();

  // const getSingleQuestion = async (id) => {
  //   try {
  //     const res = await FetchRequest.get(`question/getquestion/${id}`);
  //     const { success, question } = res.data;

  //     if (success) {
  //       setQuestion(question);
  //       setUpVote(question.likes);
  //       setDownVote(question.dislikes);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(question.updatedAt);

  // console.log(createDate);

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

  useEffect(() => {
    getUser();
    dispatch(getSingleQuestion(getparams.id));
  }, []);
  // const upVote = user && question.likeById.includes(user);
  // const downVote = user && question.dislikeById.includes(user);

  const { question } = useSelector((state) => state.singleQuestion);

  const originalTimestamp = new Date(question.updatedAt);
  const originalTimestamp2 = new Date(question.createdAt);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const formattedDate = originalTimestamp.toLocaleDateString("en-US", options);
  const formattedDate2 = originalTimestamp2.toLocaleDateString(
    "en-US",
    options,
  );

  const dispatch = useDispatch();
  const handleOnLike = (id) => {
    dispatch(questionLike(id));

    // dispatch(GetAllQuestion());
  };
  const handleOnDisLike = (id) => {
    dispatch(questionDisLike(id));

    // dispatch(GetAllAnswer());
  };
  const debouncedHandleOnLike = debounce(handleOnLike, 800);
  const debouncedHandleOnDisLike = debounce(handleOnDisLike, 800);

  useEffect(() => {
    if (user && question) {
      setUpVote(question.likeById.includes(user));
      setDownVote(question.dislikeById.includes(user));
    }
  }, [getUser]);

  console.log(question);
  return (
    <>
      {question && (
        <div className=" px-2 space-y-6 flex-1 py-10">
          <h1 className="text-3xl font-bold">{question.title}</h1>
          <div className="flex">
            <p className="">
              {" "}
              Asked : <span className=" font-semibold"> {formattedDate}</span>
            </p>
            <p className="px-3">
              {" "}
              Modified :{" "}
              <span className=" font-semibold"> {formattedDate2}</span>
            </p>
          </div>

          <hr />
          <div className="flex  md:w-10/12 space-x-4">
            <div className="flex flex-col md:w-4/12">
              <button
                className={` mx-auto h-12 w-12 my-1 text-center shadow-md  text-black border-2  rounded-full p-2 ${
                  upVote && !downVote
                    ? " bg-red-500  hover:bg-red-100"
                    : "bg-white "
                }`}
                onClick={() => debouncedHandleOnLike(getparams.id)}>
                <Triangle fill="black" color="none" />
                {/* <Triangle color="#ffffff" strokeWidth={1.5} /> */}
              </button>
              <h1 className="mx-auto my-1 font-semibold  text-xl">
                {question.likes - question.dislikes}
              </h1>
              <button
                className={` mx-auto h-12 w-12 text-center shadow-md  text-black border-2 rounded-full p-2  ${
                  !upVote && downVote
                    ? " bg-red-500 hover:bg-red-100"
                    : "bg-white"
                }`}
                onClick={() => debouncedHandleOnDisLike(getparams.id)}>
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
                  __html: question.description,
                }}></div>
              <div className="tags  flex space-x-3 my-2   ">
                {question.tags &&
                  question.tags[0].map((item) => {
                    return (
                      <li
                        key={item}
                        className=" list-none border-2  w-fit px-2 py-1 bg-red-500 text-white  border-none rounded-sm">
                        {item}
                      </li>
                    );
                  })}
              </div>

              {/* <div className="flex space-x-2  items-end justify-end">
                <h1 className="h-10 py-2 text-end font-semibold px-2 ">
                  Asked by : {question.user.username}{" "}
                </h1>
              </div> */}
            </div>
          </div>
        </div>
      )}

      <hr className=" border-1 border-solid border-black mt-2" />
      <Answer />

      <hr className=" border-1 border-solid border-black mt-2" />
      <AnsForm id={getparams.id} />
    </>
  );
};

export default SingleQuestion;
