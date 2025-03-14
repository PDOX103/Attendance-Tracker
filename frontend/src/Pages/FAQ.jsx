import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeLeft } from "../Utility/Animation";
import "./FAQ.css";

const faqs = [
  {
    question: "What is Attendance Tracker?",
    answer:
      "Attendance Tracker is a smart system that helps you manage and track attendance efficiently in real-time with automated reports.",
  },
  {
    question: "How does Attendance Tracker work?",
    answer:
      "Our system allows you to mark attendance digitally and generates detailed reports with real-time monitoring.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes! We prioritize security and use encrypted connections to ensure your data is safe.",
  },
  {
    question: "Can I access reports later?",
    answer:
      "Absolutely! Attendance records and reports are stored securely, and you can access them anytime from your dashboard.",
  },
  {
    question: "Is there a mobile version available?",
    answer:
      "No! The work is in progress.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <motion.h1
          variants={FadeLeft(0.6)}
          initial="hidden"
          animate="visible"
          className="faq-title"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          variants={FadeLeft(0.9)}
          initial="hidden"
          animate="visible"
          className="faq-subtitle"
        >
          Find answers to commonly asked questions about Attendance Tracker.
        </motion.p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              variants={FadeLeft(1.2 + index * 0.2)}
              initial="hidden"
              animate="visible"
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h2>{faq.question}</h2>
                <span>{activeIndex === index ? "▲" : "▼"}</span>
              </div>
              {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
