import React, { useState, useEffect } from "react";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sessions from "./Instructor_Portal_Pages/Sessions";
import Create_Session from "./Instructor_Portal_Pages/Create_Session";
import Joined_Courses from "./Student_Portal_Pages/Joined_Courses";
import Std_profile from "./Student_Portal_Pages/Std_profile";
import Join_Course from "./Student_Portal_Pages/Join_Course";
import Active_Sessions from "./Student_Portal_Pages/Active_Sessions";
import Attendance from "./Student_Portal_Pages/Attendance";
import Report from "./Instructor_Portal_Pages/Report";
import AttendanceReport from "./Instructor_Portal_Pages/AttendanceReport";
import AdminRoute from "./ProtectedRoutes/AdminRoute";

const App = () => {
  const clientId = "592497027256-cltqn74lk5vo28tkgj5mv8bc9k8joapc.apps.googleusercontent.com";
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loggedInAdminId, setLoggedInAdminId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("userId");

    const validateSession = async () => {
      if (token) {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/auth/validate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setIsSignedIn(true);
            if (adminId) {
              setLoggedInAdminId(adminId);
            }
          } else {
            setIsSignedIn(false);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
            localStorage.removeItem("isSignedIn");
          }
        } catch (error) {
          console.error("Session validation failed:", error);
          setIsSignedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("userId");
          localStorage.removeItem("isSignedIn");
        }
      } else {
        setIsSignedIn(false);
        localStorage.removeItem("isSignedIn");
      }
    };

    validateSession();
  }, []);

  const ProtectedAdminPage = AdminRoute(AdminPage,"admin");

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main className="overflow-hidden">
        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signin" element={<SignIn setIsSignedIn={setIsSignedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-student" element={<SignUp_Student />} />
          <Route path="/signup-instructor" element={<SignUp_Instructor />} />
          <Route path="/student-dashboard" element={<Student_Dashboard />} />
          <Route path="/empty" element={<EmptyPage />} />
          <Route path="/admin-dashboard" element={<ProtectedAdminPage loggedInAdminId={loggedInAdminId} />} />
          <Route path="/instructor-dashboard" element={<Instructor_Dashboard />} />
          <Route path="/instructor-courses" element={<Ins_Courses />} />
          <Route path="/instructor/:id" element={<Ins_Profile />} />
          <Route path="/create-course" element={<Create_Course />} />
          <Route path="/instructor-courses/:id" element={<Sessions />} />
          <Route path="/create-session/:id" element={<Create_Session />} />
          <Route path="/joined-courses" element={<Joined_Courses />} />
          <Route path="/student/:id" element={<Std_profile />} />
          <Route path="/join-course" element={<Join_Course />} />
          <Route path="/joined-courses/:id" element={<Active_Sessions />} />
          <Route path="/attendance/:id" element={<Attendance />} />
          <Route path="/report" element={<Report/>} />
          <Route path="/attendance-report/:id" element={<AttendanceReport/>} />
        </Routes>
        <ToastContainer />
        <Footer />
      </main>
    </GoogleOAuthProvider>
  );
};

export default App;
