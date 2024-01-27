import { useUser } from "@clerk/clerk-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../../App.css";

const Profile = () => {
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);

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

  return (
    <>
      <div className=" flex-1  py-6 px-10">
        <h1 className="text-2xl">Chinmay Ghadigaonkar</h1>
        <p className="px-2">10 month ago</p>
        <nav className="flex space-x-2  my-2">
          <NavLink
            to="/profile/main"
            style={location.pathname.split("/")[2] === "main" ? isActive : {}}
            className="list-none border-2 w-fit px-2 py-1 rounded-2xl cursor-pointer text-md">
            Profile
          </NavLink>
          <NavLink
            to="/profile/activity/summary"
            style={
              location.pathname.split("/")[2] === "activity" ? isActive : {}
            }
            className="list-none border-2 w-fit px-2 py-1 rounded-2xl cursor-pointer text-md">
            Activity
          </NavLink>
          <NavLink
            to="/profile/setting"
            style={
              location.pathname.split("/")[2] === "setting" ? isActive : {}
            }
            className="list-none border-2 w-fit px-2 py-1 rounded-2xl cursor-pointer text-md">
            Setting
          </NavLink>
        </nav>

        <Outlet />
      </div>
    </>
  );
};

export default Profile;
