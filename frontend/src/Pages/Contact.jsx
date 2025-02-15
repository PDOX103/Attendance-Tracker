import React from "react";
import { motion } from "framer-motion";
import { FadeLeft } from "../Utility/Animation";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-6">
      {/* Contact Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl w-full bg-white shadow-lg rounded-xl p-10 md:flex md:space-x-10"
      >
        {/* Left Side - Contact Info */}
        <motion.div
          variants={FadeLeft(0.5)}
          initial="hidden"
          animate="visible"
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl font-bold text-blue-600">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Reach out to us for any queries or assistance.
          </p>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Fahmidul Karim</h2>
              <p className="text-gray-500">Email: fahmidul.cse.20220104103@aust.edu</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Priyom Parial</h2>
              <p className="text-gray-500">Email: priyam.cse.20220104085@aust.edu</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Sayek Al Sami</h2>
              <p className="text-gray-500">Email: sayek.cse.20220104083@aust.edu</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Safuan Hasan</h2>
              <p className="text-gray-500">Email: safuan.cse.20220104097@aust.edu</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-1/2 bg-[#E8F0FE] p-6 rounded-lg"
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Send Us a Message</h2>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700 font-medium">Your Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Your Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Write your message"
                required
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
