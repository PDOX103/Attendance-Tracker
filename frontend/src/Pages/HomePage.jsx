import React from "react";
import "../Pages/HomPage.css";
import { motion } from "framer-motion";
import { FadeLeft } from "../Utility/Animation";
import { Link, NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="background-image">
        <img src="/images/Background1.png" alt="Background" />
      </div>

      <section>
        <div className="container grid-col-1 md:grid-cols-2 min-h-[650px]">
          {/*Hero images*/}

          <div className="flex justify-center items-center absolute left-16">
            <motion.img
              src="/images/teaching 1.png"
              initial={{ opacity: 0, x: -200, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>

          {/*Front Info*/}
          <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
            <div className="text-center absolute right-40 top-28">
              <motion.h1
                variants={FadeLeft(0.6)}
                initial="hidden"
                animate="visible"
                className="text-5xl font-roboto font-semibold"
              >
                Hey! Welcome
              </motion.h1>
              <br />
              <motion.h1
                variants={FadeLeft(0.9)}
                initial="hidden"
                animate="visible"
                className="text-3xl font-roboto"
              >
                Track attendance for all
              </motion.h1>
              <br />
              <motion.h1
                variants={FadeLeft(1.2)}
                initial="hidden"
                animate="visible"
                className="text-3xl font-roboto"
              >
                your classes with ease
              </motion.h1>

              {/*Get started Button*/}
              <motion.div
                variants={FadeLeft(1.5)}
                initial="hidden"
                animate="visible"
              >
                <div className="flex justify-center hover:!scale-110 duration-300">
                  <Link to="/signin">
                    <img src="/images/Get_Started_Button.png" alt="" />
                  </Link>
                </div>

                {/* <button className="primary-btn">Get started</button> */}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container grid-col-1 md:grid-cols-2 min-h-[500px]">
          <div className="flex justify-center items-center">
            <motion.img
              src="/images/Classroom 1.png"
              initial={{ opacity: 0, x: 200, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                duration: 1,
                delay: 0.2,
              }}
              viewport={{ once: true, amount: 0.5 }}
            />
          </div>
          <div className="flex justify-center items-center">
            <motion.img
              src="/images/Home hero.png"
              initial={{ opacity: 0, x: 0, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            />
          </div>
        </div>
      </section>

      <div className="background-image2 ">
        <img src="/images/Background2.png" alt="Background" />
      </div>

      <section>
        <div className="container grid-col-1 md:grid-cols-2 min-h-[1000px]">
          <div className="absolute right-16">
            <motion.img
              src="/images/teaching 2.png"
              initial={{ opacity: 0, x: 60, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
