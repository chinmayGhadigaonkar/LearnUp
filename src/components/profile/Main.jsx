import React, { useEffect, useState } from "react";
import FetchRequest from "../../utils/FetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { FilePlus, Pencil, Save } from "lucide-react";
import {
  getProfile,
  getProfileAnswer,
  getProfileBlog,
  getProfileQuestion,
  updateProfile,
} from "../../store/slice/userprofileSlice";

const ProfileMain = () => {
  const { user, questions, answer, blog } = useSelector(
    (state) => state.userprofile,
  );
  const [edit, setEdit] = useState(true);
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
  // const handleonEdit = () => {
  //   console.log("Edit");
  //   setEdit((prev) => !prev);
  // };
  useEffect(() => {
    fetchData();
    dispatch(getProfile());
    dispatch(getProfileQuestion());
    dispatch(getProfileAnswer());
    dispatch(getProfileBlog());
  }, []);

  const [isEditable, setIsEditable] = useState(false);

  const [bioContent, setBioContent] = useState(user[0].bio);
  // console.log(user[0].bio);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    // You can save the updated bio content here
    const data = {
      bio: bioContent,
    };
    dispatch(updateProfile(data));
  };

  // console.log(user[0].user.fullname);

  // console.log(userData[0].reputation);
  // console.log(user[0].bio);
  return (
    <div>
      {
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
                  <h1 className="text-start px-2">
                    {user && user[0].reputation}
                  </h1>
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
                <div className="border-2 border-red-400 flex w-full rounded-lg h-40 py-2 px-2 my-auto bg-red-50 relative">
                  <h1
                    className="text-black border-none px-1 py-1 text-md font-serif flex-1"
                    contentEditable={isEditable}
                    suppressContentEditableWarning={true}
                    onBlur={(event) => setBioContent(event.target.textContent)}>
                    {bioContent}
                  </h1>
                  {!isEditable && (
                    <div className="absolute  right-0 top-4 transform -translate-y-1/2">
                      <div
                        className="rounded-full w-16 h-8 bg-red-600 flex items-center justify-center cursor-pointer"
                        onClick={handleEditClick}>
                        <Pencil
                          className="w-6 h-6 px-1 py-1 cursor-pointer"
                          size={32}
                          color="#ec9c9c"
                          strokeWidth={3}
                        />
                        <span className="text-sm text-white"> Edit</span>
                      </div>
                    </div>
                  )}
                  {isEditable && (
                    <div className="absolute  right-0 top-4 transform -translate-y-1/2">
                      <div
                        className="px-2 rounded-full w-16 h-8 bg-green-600 flex items-center justify-center cursor-pointer"
                        onClick={handleSaveClick}>
                        <span>Save</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ProfileMain;
