import React, { useState } from "react";
import { ImCross } from "react-icons/im";
const ProfileSidebar = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSidebar, setShowSideBar] = useState(false);
  const handleOnSideBar = () => {
    setShowSideBar(true);
  };
  return (
    <>
      <div
        className={`bg-white w-64 p-6   border-r-2 flex-1  static rounded-md  transition-delay-30 ${
          showSidebar ? " -translate-x-64" : " translate-x-0"
        } `}>
        {/* Profile Image */}
        <ImCross className="ml-auto cursor-pointer" onClick={handleOnSideBar} />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOd6VLrAsHVVG0KJ7dMy-36-RAunP8w48blA&usqp=CAU" // Replace with your profile image source
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 cursor-pointer hover:opacity-80"
        />

        {/* User Information */}
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          John Doe
        </h2>
        <p className="text-sm text-gray-500 text-center">Student</p>

        {/* User Actions */}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => setShowEditProfile(!showEditProfile)}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            {showEditProfile ? "Close Profile" : "Show Profile"}
          </button>
          <button className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
            Logout
          </button>
        </div>

        {showEditProfile && (
          <div className="mt-4 space-y-2">
            <button className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Notifications
            </button>
            <button className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Settings
            </button>
          </div>
        )}

        {showEditProfile && (
          <div className="mt-8 space-y-2 text-center text-gray-600">
            <p>Email: johndoe@example.com</p>
            <p>Location: Mumbai , INDIA</p>
            <p>
              Bio : Student | Web developer passionate about coding and creating
              amazing web experiences.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileSidebar;
