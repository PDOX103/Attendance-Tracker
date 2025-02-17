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
//import Instructor_Dashboard from "./Instructor_Portal_Pages/Instructor_Dashboard";
import EmptyPage from "./Pages/EmptyPage";

import Users from "../Users";
import AdminPage from "./Pages/AdminPage";
import InstructorPage from "./Pages/InstructorPage";

const App = () => {
  const clientId = "592497027256-cltqn74lk5vo28tkgj5mv8bc9k8joapc.apps.googleusercontent.com"; 
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
          <Route path="/signin" element={<SignIn setIsSignedIn={setIsSignedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-student" element={<SignUp_Student />} />
          <Route path="/signup-instructor" element={<SignUp_Instructor />} />
          <Route path="/student-dashboard" element={<Student_Dashboard />} />
          
          <Route path="/empty" element={<EmptyPage />} /> 
          <Route path="/admin-dashboard" element={<AdminPage />} />
          <Route path="/instructor-dashboard" element={<InstructorPage />} />



        </Routes>
        <Footer />
      </main>
    </GoogleOAuthProvider>
  );
};

export default App;