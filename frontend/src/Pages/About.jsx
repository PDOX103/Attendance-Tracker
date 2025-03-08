import React from "react";
import { motion } from "framer-motion";
import { FadeLeft } from "../Utility/Animation";

const About = () => {
  return (
    <>
      <div className="background-image">
        <img src="/images/Signin_back.png" alt="Background" className="w-full" />
      </div>

      <div className="min-h-screen text-gray-900 p-8 relative">
        <div className="max-w-5xl text-left mx-auto relative z-10">
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
            className="text-2xl mb-6 text-gray-700 leading-relaxed"
          >
            Our attendance tracker helps streamline attendance management with
            real-time monitoring. It also provides automated reports for better
            efficiency.
          </motion.p>
        </div>

        {/* Developers Section */}
        <div className="max-w-6xl mx-auto mt-12 relative z-10">
          <motion.h2
            variants={FadeLeft(1.2)}
            initial="hidden"
            animate="visible"
            className="text-3xl font-semibold text-gray-800 mb-8 text-center"
          >
            Meet Our Developers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
            {[
              { name: "Fahmidul Karim", image: "rafi.jpg" },
              { name: "Priyom Parial", image: "dev2.jpg" },
              { name: "Safuan Hasan", image: "safuan.jpg" },
              { name: "Sayek AL Sami", image: "Piyal.jpg" },
            ].map((dev, index) => (
              <motion.div
                key={index}
                variants={FadeLeft(1.5 + index * 0.3)}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center shadow-lg p-6 rounded-lg bg-white hover:shadow-2xl transition-all duration-300"
              >
                <p className="text-xl font-bold text-gray-700 mb-2">
                  Developer {index + 1}
                </p>
                <img
                  src={`/images/${dev.image}`}
                  alt={`Developer ${index + 1}`}
                  className="w-32 h-32 rounded-full mb-4 shadow-md border-2 border-gray-200"
                />
                <p className="text-lg font-bold text-gray-900">{dev.name}</p>
                <p className="text-sm text-gray-600 text-center">
                  Ahsanullah University of Science and Technology
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
