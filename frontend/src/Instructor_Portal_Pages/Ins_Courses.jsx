import React from "react";
import Ins_Sidebar from "./Ins_Sidebar";
import Courses from "./Courses";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Ins_Courses = () => {
  return (
    <div className="flex">
      <Ins_Sidebar />
      <div className="flex-1 p-6">
        {/* Header Section */}
        <motion.div
          className="flex justify-between items-center pt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-black font-roboto text-lg font-bold">Courses</h1>
          <Link to="/create-course" className="hover:!scale-110 duration-300">
            <img
              
              src="/images/create 1.png"
              alt=""
            />
          </Link>
        </motion.div>
        <section>
          <div className="container grid-col-1 md:grid-cols-2 min-h-[15px]"></div>
        </section>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Courses />
          <Courses />
          <Courses />
          <Courses />
          <Courses />
          <Courses />
          <Courses />
        </motion.div>
      </div>
    </div>
  );
};

export default Ins_Courses;
