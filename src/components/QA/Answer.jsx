import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDown, FaArrowUp } from "react-icons/fa"; // Assuming FaArrowDown and FaArrowUp are used elsewhere
import { Check, ShieldCheck, Triangle } from "lucide-react"; // Assuming Triangle is used elsewhere
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
  const [profiles, setProfiles] = useState({});

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
  const debouncedHandleOnLike = useCallback(debounce(handleOnLike, 1000), []);

  const handleOnDisLike = (id) => {
    dispatch(answerDisLike(id));
  };
  const debouncedHandleOnDisLike = useCallback(
    debounce(handleOnDisLike, 1000),
    [],
  );

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
  }, [dispatch, params.id]);

  useEffect(() => {
    if (user && answer) {
      const newUpVotes = {};
      const newDownVotes = {};
      answer.forEach((item) => {
        console.log(item);
        newUpVotes[item._id] = item?.likeById?.includes(user);
        newDownVotes[item._id] = item?.dislikeById?.includes(user);
        setUpVotes(newUpVotes);
        setDownVotes(newDownVotes);
      });
      // for (let item in answer) {
      //   // console.log(answer[item]);
      //   newUpVotes[item._id] = answer[item]?.likeById.includes(user);
      //   newDownVotes[item._id] = answer[item]?.dislikeById.includes(user);
      //   setUpVotes(newUpVotes);
      //   setDownVotes(newDownVotes);
      // }
      // console.log(typeof answer);
    }
  }, [user, answer]);
  const getProfileById = async (id) => {
    try {
      const res = await FetchRequest.get(`/profile/getprofile/${id}`);
      const { success, profile } = res.data;
      // console.log(profile);
      if (success) return profile;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const FetchData = () => {
      answer.forEach(async (item) => {
        // console.log(item.user._id, item.userId);
        if (item.user && !item.user._id && profiles[item._id]) {
          const result = await getProfileById(item.user);

          setProfiles((prevProfiles) => ({
            ...prevProfiles,
            [item._id]: result,
          }));

          return;
        }
        const result = await getProfileById(item.user._id);
        // console.log(result);
        setProfiles((prev) => ({ ...prev, [item._id]: result }));
      });
    };
    FetchData();
  }, [answer]);

  return (
    <div className="px-2">
      <h1 className="text-2xl py-2 px-2 font-semibold">
        {answer && answer.length} Answer
      </h1>
      <hr />
      {answer &&
        answer.map((item) => {
          return (
            <div key={item._id} className="px-2 space-y-6 flex-1 py-10">
              <div className="flex  md:w-10/12 space-x-4">
                <div className="flex flex-col md:w-4/12">
                  <button
                    className={`mx-auto h-12 w-12 my-1 text-center shadow-md text-black border-2 rounded-full p-2 ${
                      upVotes[item._id] && !downVotes[item._id]
                        ? "bg-red-500 hover:bg-red-100"
                        : "bg-white"
                    }`}
                    onClick={() => debouncedHandleOnLike(item._id)}>
                    <Triangle fill="black" color="none" />
                  </button>
                  <h1 className="mx-auto my-1 font-semibold text-xl">
                    {item.likes - item.dislikes}
                  </h1>
                  <button
                    className={`mx-auto h-12 w-12 text-center shadow-md text-black border-2 rounded-full p-2 ${
                      !upVotes[item._id] && downVotes[item._id]
                        ? "bg-red-500 hover:bg-red-100"
                        : "bg-white"
                    }`}
                    onClick={() => debouncedHandleOnDisLike(item._id)}>
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
              </div>
              {/* <h1>{item.user._id}</h1> */}

              {/* {profiles[item.user._id] && profiles[item.user._id].fullname} */}
              {/* {profiles &&
                Object.keys(profiles).map((key) =>
                  profiles[key].map((profile) =>
                    profile && item.user._id === profile.user._id ? (
                      <div
                        className="flex space-x-2 w-full items-end justify-end"
                        key={profile.user._id}>
                        <h1
                          className={`h-36 w-56 py-2 border-2 ${
                            profile.typeOfUser === "student"
                              ? "bg-yellow-100"
                              : "bg-blue-100"
                          } bg-blue-100 rounded-md shadow-lg font-semibold px-2`}>
                          Answer by:
                          <div className="text-blue-600 flex ">
                            {profile.user && (
                              <div className="text-blue-600 flex">
                                {profile.user && (
                                  <p className="border-2 bg-red-500 flex justify-center items-center text-white w-12 py-auto text-center rounded-md h-10 text-lg mx-1">
                                    {profile.user.fullname &&
                                      profile.user.fullname.charAt(0)}
                                  </p>
                                )}
                                <div className="flex flex-col  w-full">
                                  <p className="text-sm">
                                    {profile.user.fullname &&
                                      profile.user.fullname.slice(0, 18) +
                                        "..."}
                                    <span>
                                      {profile.reputation > 100 ? (
                                        <ShieldCheck />
                                      ) : (
                                        <Check />
                                      )}
                                    </span>
                                  </p>

                                  <p className=" text-sm">
                                    {profile.typeOfUser &&
                                      profile.typeOfUser
                                        .charAt(0)
                                        .toUpperCase() +
                                        profile.typeOfUser.slice(1)}
                                  </p>
                                  <p className=" text-sm">
                                    Reputation:{" "}
                                    {profile.reputation && profile.reputation}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </h1>
                      </div>
                    ) : null,
                  ),
                )} */}

              <UserProfile
                profiles={profiles}
                item={item}
                key={item.user._id}
              />
              <hr key={`hr-${item._id}`} />
            </div>
          );
        })}
    </div>
  );
};

export default Answer;

function UserProfile({ profiles, item, key }) {
  const profile = Object.keys(profiles).filter((i) => {
    if (profiles[i] && profiles[i].length > 0) {
      console.log(profiles[i][0]._id);
      return profiles[i][0]._id === key;
    }
    return false; // or return undefined, depending on your logic
  });

  console.log(profile); // [ '1' ]

  // if (profile) {
  //   return (
  //     <div
  //       className="flex space-x-2 w-full items-end justify-end"
  //       key={profile.user._id}>
  //       <h1
  //         className={`h-36 w-56 py-2 border-2 ${
  //           profile.typeOfUser === "student" ? "bg-yellow-100" : "bg-blue-100"
  //         } bg-blue-100 rounded-md shadow-lg font-semibold px-2`}>
  //         Answer by:
  //         <div className="text-blue-600 flex ">
  //           <div className="text-blue-600 flex">
  //             {profile.user && (
  //               <div className="text-blue-600 flex">
  //                 {profile.user && (
  //                   <p className="border-2 bg-red-500 flex justify-center items-center text-white w-12 py-auto text-center rounded-md h-10 text-lg mx-1">
  //                     {profile.user.fullname && profile.user.fullname.charAt(0)}
  //                   </p>
  //                 )}
  //                 <div className="flex flex-col  w-full">
  //                   <p className="text-sm">
  //                     {profile.user.fullname &&
  //                       profile.user.fullname.slice(0, 18) + "..."}
  //                     <span>
  //                       {profile.reputation > 100 ? <ShieldCheck /> : <Check />}
  //                     </span>
  //                   </p>

  //                   <p className=" text-sm">
  //                     {profile.typeOfUser &&
  //                       profile.typeOfUser.charAt(0).toUpperCase() +
  //                         profile.typeOfUser.slice(1)}
  //                   </p>
  //                   <p className=" text-sm">
  //                     Reputation: {profile.reputation && profile.reputation}
  //                   </p>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </h1>
  //     </div>
  //   );
  // } else {
  //   return null;
  // }
}
