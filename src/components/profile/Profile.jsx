import { useUser } from "@clerk/clerk-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../../App.css";
import FetchRequest from "../../utils/FetchRequest";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const location = useLocation();

  const { user, questions, answer, blog } = useSelector(
    (state) => state.userprofile,
  );
  const isActive = {
    transition: "all 0.6s ease-in-out",
    color: "white",
    fontWeight: "normal",
    textDecoration: "none",
    background: "rgb(243, 45, 45)",
    paddingBottom: "8px",
    marginBottom: "5px",
    borderRadius: "15px",
  };
  // console.log(user[0].user.fullname[0]);

  return (
    <>
      <div className=" flex-1  py-6 px-10">
        <p className="border-2 bg-red-500 text-white w-20  text-center rounded-md h-16 flex justify-center items-center text-3xl font-bold mb-3">
          {user && user[0].user.fullname[0]}
        </p>{" "}
        <h1 className="text-2xl font-sans">{user && user[0].user.fullname}</h1>
        <nav className="flex space-x-2  my-2">
          <NavLink
            to="/profile/main"
            style={location.pathname.split("/")[2] === "main" ? isActive : {}}
            className="list-none border-2 w-fit px-2 py-1 rounded-2xl cursor-pointer text-md">
            Profile
          </NavLink>
          <NavLink
            to="/profile/activity/answers"
            style={
              location.pathname.split("/")[2] === "activity" ? isActive : {}
            }
            className="list-none border-2 w-fit px-2 py-1 rounded-2xl cursor-pointer text-md">
            Activity
          </NavLink>
          {/* <NavLink
            to="/profile/setting"
            style={
              location.pathname.split("/")[2] === "setting" ? isActive : {}
            }
            className="list-none border-2 w-fit px-2 py-1 rounded-2xl cursor-pointer text-md">
            Setting
          </NavLink> */}
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Profile;
