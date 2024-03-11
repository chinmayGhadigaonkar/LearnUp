import React, { useEffect, useState } from "react";
import FetchRequest from "../../utils/FetchRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  getProfileAnswer,
  getProfileBlog,
  getProfileQuestion,
} from "../../store/slice/userprofileSlice";

const ProfileMain = () => {
  const { user, questions, answer, blog } = useSelector(
    (state) => state.userprofile,
  );
  const dispatch = useDispatch();

  const [userData, setUserData] = useState();
  const fetchData = async () => {
    try {
      const res = await FetchRequest.get("/profile/getprofile");
      const { profile } = res.data;
      // console.log(profile);
      setUserData(profile);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user + "  " + questions + " " + answer + " " + blog);

  console.log(user);
  useEffect(() => {
    fetchData();
    dispatch(getProfile());
    dispatch(getProfileQuestion());
    dispatch(getProfileAnswer());
    dispatch(getProfileBlog());
  }, []);
  // console.log(userData[0].reputation);
  // console.log(user[0].bio);
  return (
    <div>
      <div className="md:flex md:flex-col md:space-x-2">
        <div className="order-2">
          <h1 className=" font-medium text-xl py-2">Stats :</h1>
          <div className="md:hidden border-2 flex w-full md:w-81 h-20 my-auto ">
            <div className="mr-auto w-1/5  my-auto ">
              <h1 className="text-start px-2">
                {/* {userData[0] && userData[0].reputation} +++66 */}1
              </h1>
              <p className="text-start px-2">Reputation</p>
            </div>
            <div className="mr-auto w-1/5  my-auto  ">
              <h1 className="text-start px-2">1</h1>
              <p className="text-start px-2">Question</p>
            </div>

            <div className="mr-auto w-1/5  my-auto ">
              <h1 className="text-start px-2">1</h1>
              <p className="text-start px-2">Answer</p>
            </div>
            <div className="mr-auto w-1/5  my-auto ">
              <h1 className="text-start px-2">1</h1>
              <p className="text-start px-2">Blog</p>
            </div>
          </div>

          <div className="hidden order-2 border-2 rounded-lg border-gray-200 px-1 md:grid md:grid-cols-2 w-72 md:w-81 h-36  my-auto gap-4">
            <div className="my-auto">
              <h1 className="text-start px-2">{user && user[0].reputation}</h1>
              <p className="text-start px-2">Reputation</p>
            </div>
            <div className="my-auto">
              <h1 className="text-start px-2">
                {questions && questions.length}
              </h1>
              <p className="text-start px-2">Question</p>
            </div>

            <div className="my-auto">
              <h1 className="text-start px-2">{answer && answer.length}</h1>
              <p className="text-start px-2">Answer</p>
            </div>
            <div className="my-auto">
              <h1 className="text-start px-2">{blog && blog.length}</h1>
              <p className="text-start px-2">Blog</p>
            </div>
          </div>
        </div>

        <div>
          <div className="order-1">
            <h1 className=" font-medium text-xl py-2">About :</h1>
            {/* <div className="border-2 flex w-full rounded-lg h-40 py-5 my-auto  bg-red-50">
              <h1 className="text-center w-72 mx-auto my-auto text-black text-sm">
                Your about me section is currently blank. Would you like to add
                one?{" "}
                <span
                  className=" underline text-blue-600 hover:text-black hover:cursor-pointer 
          ">
                  Edit profile
                </span>
              </h1>
            </div> */}

            <div>
              {user && user[0].bio ? (
                <div className="flex w-full rounded-lg  py-1  my-auto  ">
                  <h1 className="  text-black text-md font-serif">
                    {user && user[0].bio}
                  </h1>
                </div>
              ) : (
                <div className="border-2 flex w-full rounded-lg h-40 py-5 my-auto  bg-red-50">
                  <h1 className="text-center w-72 mx-auto my-auto text-black text-sm">
                    Your about me section is currently blank. Would you like to
                    add one?{" "}
                    <span
                      className=" underline text-blue-600 hover:text-black hover:cursor-pointer 
          ">
                      Edit profile
                    </span>
                  </h1>
                </div>
              )}
            </div>
          </div>

          {/* <div className="">
            <h1 className=" font-medium text-xl py-2">Post :</h1>
            <div className="border-2 flex w-full rounded-lg  h-96 py-5 my-auto  bg-red-50">
              <div className="flex w-full flex-col items-center justify-center space-y-4">
                <svg
                  aria-hidden="true"
                  className="mb24 svg-spot spotEmptyXL"
                  width="196"
                  height="196"
                  viewBox="0 0 196 196">
                  <path
                    d="M35 177.5c-19.5-9-29.35-26.54-26-82 3.35-55.46 14.8-66.9 32.5-73 17.7-6.1 86.22-21.95 120 5.5s37.46 52.67 23 96.5c-14.46 43.84-22.26 63.24-60 61-11.4-.68-22.3-.85-32.5-1.02-23.56-.38-43.4-.7-57-6.98ZM33 42v26a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V42a7 7 0 0 0-7-7H40a7 7 0 0 0-7 7Zm7 39a7 7 0 0 0-7 7v27a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V88a7 7 0 0 0-7-7H40Z"
                    opacity=".07"></path>
                  <path
                    d="M42 48a4 4 0 0 1 4-4h112a7 7 0 0 1 7 7v23a7 7 0 0 1-7 7H49a7 7 0 0 1-7-7V48Zm0 47a4 4 0 0 1 4-4h112a7 7 0 0 1 7 7v22a7 7 0 0 1-7 7H49a7 7 0 0 1-7-7V95Zm-1 36h3.19a2 2 0 1 1 0 4H40a3 3 0 0 0-3 3v4.44a2 2 0 1 1-4 0V138a7 7 0 0 1 7-7h1Zm11.65 2c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.38a2 2 0 1 1 0 4H92.3a2 2 0 0 1-2-2Zm18.84 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2H153a7 7 0 0 1 7 7v4.44a2 2 0 1 1-4 0v-4.58a3 3 0 0 0-3-2.86h-4.19a2 2 0 0 1-2-2ZM35 151.56a2 2 0 0 1 2 2v4.51a3 3 0 0 0 3 2.93h4.19a2 2 0 1 1 0 4h-4.35a7 7 0 0 1-6.84-7v-4.44c0-1.1.9-2 2-2Zm123 0a2 2 0 0 1 2 2v4.74a7 7 0 0 1-7 6.69h-4.19a2 2 0 1 1 0-4h4.33a3 3 0 0 0 2.86-3v-4.43c0-1.1.9-2 2-2ZM52.65 163c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.38a2 2 0 1 1 0 4H92.3a2 2 0 0 1-2-2Zm18.84 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2Z"
                    opacity=".2"></path>
                  <path d="M124.48 14.24 120.25 10 116 14.24l4.24 4.25 4.25-4.25ZM52 58a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm12-4c0-1.1.9-2 2-2h80a2 2 0 1 1 0 4H66a2 2 0 0 1-2-2ZM33 42a7 7 0 0 1 7-7h113a7 7 0 0 1 7 7v26a7 7 0 0 1-7 7H40a7 7 0 0 1-7-7V42Zm7-3a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h113a3 3 0 0 0 3-3V42a3 3 0 0 0-3-3H40Zm16 62a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm10-2a2 2 0 1 0 0 4h80a2 2 0 1 0 0-4H66ZM40 81a7 7 0 0 0-7 7v27a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V88a7 7 0 0 0-7-7H40Zm-3 7a3 3 0 0 1 3-3h113a3 3 0 0 1 3 3v27a3 3 0 0 1-3 3H40a3 3 0 0 1-3-3V88Zm150.97 54.49L179.5 134l-8.49 8.49 8.49 8.48 8.48-8.48Zm-8.48 2.82-2.83-2.82 2.83-2.83 2.82 2.83-2.82 2.82ZM8 97a2 2 0 0 1 2 2v4h4a2 2 0 1 1 0 4h-4v4a2 2 0 1 1-4 0v-4H2a2 2 0 1 1 0-4h4v-4c0-1.1.9-2 2-2Z"></path>
                </svg>

                <p className="text-center px-12  text-sm">
                  Just getting started? Try answering a question!
                  <br />
                  Your most helpful questions, answers and tags will appear
                  here. Start by answering a question or selecting tags that
                  match topics you’re interested in.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
