import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = {
    transition: "all 0.6s ease-in-out",
    fontWeight: "normal",
    textDecoration: "none",
    background: "rgba(117, 161, 205, 0.19)",
    paddingBottom: "8px",
    marginBottom: "5px",
    borderRadius: "15px",
  };

  return (
    <aside className="w-56 h-full p-2">
      {/* <NavLink
        to="/profile/activity/summary"
        href="#"
        style={
          location.pathname === "/profile/activity/summary" ? isActive : {}
        }
        className="block p-2 mb-2  hover:rounded-2xl hover:bg-slate-100  hover:border-2 hover:border-slate-100   w-36 ">
        Summary
      </NavLink> */}
      <NavLink
        to="/profile/activity/answers"
        href="#"
        style={
          location.pathname === "/profile/activity/answers" ? isActive : {}
        }
        className="block p-2 mb-2  hover:rounded-2xl hover:bg-slate-100  hover:border-2 hover:border-slate-100   w-36 ">
        Answers
      </NavLink>
      <NavLink
        to="/profile/activity/questions"
        href="#"
        style={
          location.pathname === "/profile/activity/questions" ? isActive : {}
        }
        className="block p-2 mb-2  hover:rounded-2xl hover:bg-slate-100  hover:border-2 hover:border-slate-100   w-36 ">
        Questions
      </NavLink>
      <NavLink
        to="/profile/activity/blogs"
        href="#"
        style={location.pathname === "/profile/activity/blogs" ? isActive : {}}
        className="block p-2 mb-2  hover:rounded-2xl hover:bg-slate-100  hover:border-2 hover:border-slate-100   w-36 ">
        Blog
      </NavLink>
      {/* <NavLink
        to="/profile/activity/reputation"
        href="#"
        style={
          location.pathname === "/profile/activity/reputation" ? isActive : {}
        }
        className="block p-2 mb-2  hover:rounded-2xl hover:bg-slate-100  hover:border-2 hover:border-slate-100   w-36 ">
        Reputation
      </NavLink> */}
    </aside>
  );
};
const ActivityPage = () => {
  return (
    <div className="flex flex-1">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <main className="flex-1 w-3/5 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ActivityPage;
