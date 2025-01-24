import React from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="background-image">
        <img src="/images/SignUp_back.png" alt="Background" />
      </div>

      <section>
        <div className="container grid-col-1 md:grid-cols-2 min-h-[80px]"></div>
      </section>

      <section>
        <div className="container grid-col-1 md:grid-cols-2 min-h-[600px]">
          <div className="flex justify-center gap-32">
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <img
                src="/images/student.png"
                className="w-[350px] h-[350px] object-cover shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <img
                src="/images/instructor.png"
                className="w-[350px] h-[350px] object-cover shadow-lg"
              />
            </motion.div>
          </div>

          <section>
            <div className="container grid-col-1 md:grid-cols-2 min-h-[20px]"></div>
          </section>

          <motion.div
            className="flex justify-center items-center gap-64"
            initial={{ opacity: 0, x: 0, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Link to ="/signup-student">
              <img
                src="/images/std_button.png"
                className="w-[220px] object-cover hover:!scale-110 duration-300"
              />
            </Link>

            <Link to ="/signup-instructor">
              <img
                src="/images/ins_button.png"
                className="w-[220px]  object-cover hover:!scale-110 duration-300"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
