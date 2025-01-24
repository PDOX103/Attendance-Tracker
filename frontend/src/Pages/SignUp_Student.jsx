import React from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

const SignUp_Student = () => {
  return (
    <>
      <div className="background-image">
        <img src="/images/SignUp_back.png" alt="Background" />
      </div>

      <section>
        <div className="container grid-col-1 md:grid-cols-2 min-h-[600px]">
          <div className="absolute left-64">
            <motion.img
              initial={{ opacity: 0, x: -100, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              src="/images/Std_signup.png"
              className="w-[420px]"
            />
          </div>

          <motion.div
            className="absolute right-80 top-60 "
            initial={{ opacity: 0, x: 0, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="hover:!scale-110 duration-300">
              <img
                src="/images/google-button2.png"
                className="w-[253px] object-cover"
              />
            </div>

            <div className="flex justify-center gap-3">
              <h1 className="font-roboto text-sm">Already have an account.</h1>
              <NavLink
                to="/signin"
                className="font-roboto font-semibold text-sm text-BLUE2"
              >
                Sign In
              </NavLink>
            </div>

            <section>
              <div className="container grid-col-1 md:grid-cols-2 min-h-[50px]"></div>
            </section>

            <div className="flex justify-center gap-3">
              <div className="hover:!scale-110 duration-300">
                <img
                  src="/images/Google Play Badge.png"
                  className="w-[120px] object-cover"
                />
              </div>

              <div className="hover:!scale-110 duration-300">
                <img
                  src="/images/App Store Badge.png"
                  className="w-[120px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SignUp_Student;
