import React from "react";
import { motion } from "framer-motion";
import { FadeLeft } from "../Utility/Animation";

const About = () => {
  return (
    <>
      <div className="background-image">
        <img src="/images/Signin_back.png" alt="Background" />
      </div>
      <div className="min-h-screen text-gray-900 p-8 relative">
        <div className="max-w-4xl text-left ml-16 relative z-10">
          <motion.h1
            variants={FadeLeft(0.6)}
            initial="hidden"
            animate="visible"
            className="text-5xl font-bold text-blue-600 mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            variants={FadeLeft(0.9)}
            initial="hidden"
            animate="visible"
            className="text-2xl mb-6"
          >
            Our attendance tracker helps streamline attendance management with
            real-time monitoring. It also provides automated reports for better
            efficiency.
          </motion.p>
        </div>

        <div className="max-w-4xl ml-16 mt-8 relative z-10">
          <motion.h2
            variants={FadeLeft(1.2)}
            initial="hidden"
            animate="visible"
            className="text-3xl font-semibold text-gray-800 mb-6"
          >
            Meet Our Developers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {["rafi.jpg", "dev2.jpg", "safuan.jpg", "Piyal.jpg"].map(
              (img, index) => (
                <motion.div
                  key={index}
                  variants={FadeLeft(1.5 + index * 0.3)}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center text-center shadow-lg p-8 rounded-lg bg-gray-50"
                >
                  <p className="text-xl font-bold text-gray-700 mb-2">
                    Developer {index + 1}
                  </p>
                  <img
                    src={`/images/${img}`}
                    alt={`Developer ${index + 1}`}
                    className="w-40 h-40 rounded-full mb-6 shadow-md"
                  />
                  <p className="text-2xl font-bold text-gray-900">
                    {index === 0
                      ? "Fahmidul Karim"
                      : index === 1
                      ? "Priyom Parial"
                      : index === 2
                      ? "Safuan Hasan"
                      : "Sayek AL Sami"}
                  </p>
                  <p className="text-lg text-gray-600">
                    Ahsanullah University of Science and Technology
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
