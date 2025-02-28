import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Ins_Sidebar = () => {

  const userId = localStorage.getItem("userId");

  return (
    <>
      <div className="background-image">
        <img src="/images/Signin_back.png" alt="Background" />
      </div>

      <motion.div
        className="w-[15%] min-h-screen border-r-4 "
        initial={{ opacity: 0, x: -100, rotate: 0 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="flex flex-col gap-4 pt-0 pl-[20%] text-[15px]">
          <NavLink
            className="flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-l"
            to="/instructor-dashboard"
          >
            <img className="w-5 h-5" src="/images/dashboard_icon.png" alt="" />
            <p className="hidden md:block  hover:text-primary font-roboto font-semibold">
              Dashboard
            </p>
          </NavLink>
          <NavLink
            className="flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-l"
            to="/instructor-courses"
          >
            <img className="w-5 h-5" src="/images/courses.png" alt="" />
            <p className="hidden md:block  hover:text-primary font-roboto font-semibold">
              Courses
            </p>
          </NavLink>
        
          <NavLink
            className="flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-l"
            to={`/instructor/${userId}`}
          >
            <img className="w-5 h-5" src="/images/profile.png" alt="" />
            <p className="hidden md:block  hover:text-primary font-roboto font-semibold">
              Profile
            </p>
          </NavLink>
        </div>
      </motion.div>
    </>
  );
};

export default Ins_Sidebar;
