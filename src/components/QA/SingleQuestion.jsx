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
// import { getProfileById } from "../../store/slice/userprofileSlice";

const SingleQuestion = () => {
  // Timer part remaining for likes and dislikes
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  // const [question, setQuestion] = useState("");
  const getparams = useParams();
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
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
  const getProfileById = async (id) => {
    try {
      const res = await FetchRequest.get(`/profile/getprofile/${id}`);
      const { profile } = res.data;
      // console.log(profile);
      if (profile) setProfile(profile);

      return profile;
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
  const { answer } = useSelector((state) => state.answer);

  const dispatch = useDispatch();
  const handleOnLike = (id) => {
    dispatch(questionLike(id));

    // dispatch(GetAllQuestion());
  };
  const handleOnDisLike = (id) => {
    dispatch(questionDisLike(id));

    // dispatch(GetAllAnswer());
  };
  const debouncedHandleOnLike = debounce(handleOnLike, 100);
  const debouncedHandleOnDisLike = debounce(handleOnDisLike, 100);

  useEffect(() => {
    if (user && question) {
      setUpVote(question.likeById.includes(user));
      setDownVote(question.dislikeById.includes(user));
    }
  }, [getUser]);

  useEffect(() => {
    if (question && question.user && question.user._id) {
      getProfileById(question.user._id);
    } else if (question && question.user) {
      getProfileById(question.user);
    }
  }, [question, answer]);

  return (
    <>
      {question && (
        <div className=" px-2 space-y-6 flex-1 py-10">
          <h1 className="text-3xl font-bold">{question.title}</h1>
          <div className="flex">
            <p className="">
              {" "}
              Asked :{" "}
              <span className=" font-semibold">
                {" "}
                {new Date(question.createdAt).toDateString()}
              </span>
            </p>
            {/* <p className="px-3">
              {" "}
              Modified :{" "}
              <span className=" font-semibold"> {formattedDate2}</span>
            </p> */}
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
                {question.likes > question.dislikes
                  ? question.likes
                  : -question.dislikes}
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
            </div>
          </div>
          {profile && profile[0].user && (
            <div className="flex space-x-2 w-full   items-end justify-end">
              <h1 className="h-32 w-56  py-2 border-2 bg-blue-100 rounded-md shadow-sm    font-semibold px-2  ">
                Asked by :
                <div className="text-blue-600 flex">
                  {" "}
                  <div className="text-blue-600 flex ">
                    {profile[0].user && (
                      <p className=" bg-red-500 flex justify-center items-center text-white w-12 py-auto text-center rounded-md h-10 text-lg mx-1">
                        {profile[0].user.fullname &&
                          profile[0].user.fullname.charAt(0)}
                      </p>
                    )}
                    <div className="flex flex-col border-2 w-full">
                      <p className=" text-sm ">
                        {profile[0].user &&
                          profile[0].user.fullname.slice(0, 18) + "...."}
                      </p>

                      <p className="text-sm ">
                        {profile[0].user &&
                          profile[0].typeOfUser.charAt(0).toUpperCase() +
                            profile[0].typeOfUser.slice(1)}
                      </p>
                      <p className="text-sm ">
                        Reputation : {profile[0] && profile[0].reputation}
                      </p>
                    </div>
                  </div>
                </div>
              </h1>
            </div>
          )}
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
