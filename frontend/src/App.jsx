import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import SignIn from "./Pages/SignIn";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Pricing from "./Pages/Pricing";
import SignUp from "./Pages/SignUp";
import SignUp_Student from "./Pages/SignUp_Student";
import SignUp_Instructor from "./Pages/SignUp_Instructor";
import Student_Dashboard from "./Student_Portal_Pages/Student_Dashboard";
import EmptyPage from "./Pages/EmptyPage";
import AdminPage from "./Pages/AdminPage";
import Instructor_Dashboard from "./Instructor_Portal_Pages/Instructor_Dashboard";
import Ins_Courses from "./Instructor_Portal_Pages/Ins_Courses";
import Ins_Profile from "./Instructor_Portal_Pages/Ins_Profile";
import Create_Course from "./Instructor_Portal_Pages/Create_Course";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sessions from "./Instructor_Portal_Pages/Sessions";

const App = () => {
  const clientId =
    "592497027256-cltqn74lk5vo28tkgj5mv8bc9k8joapc.apps.googleusercontent.com";
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main className="overflow-hidden">
        {/* <h2>React app</h2>
        <h2>Users</h2>
        <Users/> */}
        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/signin"
            element={<SignIn setIsSignedIn={setIsSignedIn} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-student" element={<SignUp_Student />} />
          <Route path="/signup-instructor" element={<SignUp_Instructor />} />
          <Route path="/student-dashboard" element={<Student_Dashboard />} />

          <Route path="/empty" element={<EmptyPage />} />
          <Route path="/admin-dashboard" element={<AdminPage />} />
          <Route
            path="/instructor-dashboard"
            element={<Instructor_Dashboard />}
          />
          <Route path="/instructor-courses" element={<Ins_Courses />} />
          <Route path="/instructor/:id" element={<Ins_Profile />} />
          <Route path="/create-course" element={<Create_Course />} />
          <Route path="/instructor-sessions" element={<Sessions />} />

        </Routes>
        <ToastContainer />
        <Footer />
      </main>
    </GoogleOAuthProvider>
  );
};

export default App;
