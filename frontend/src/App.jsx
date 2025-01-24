import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import SignIn from "./Pages/SignIn";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Pricing from "./Pages/Pricing";
import SignUp from "./Pages/SignUp";
import SignUp_Student from "./Pages/SignUp_Student";
import SignUp_Instructor from "./Pages/SignUp_Instructor";
import Student_Dashboard from "./Student_Portal_Pages/Student_Dashboard";
import Instructor_Dashboard from "./Instructor_Portal_Pages/Instructor_Dashboard";

const App = () => {
  return (
    <>
      <main className="overflow-hidden">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/faq' element={<FAQ/>}/>
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signup-student' element={<SignUp_Student/>}/>
          <Route path='/signup-instructor' element={<SignUp_Instructor/>}/>
          <Route path='/student-dashboard' element={<Student_Dashboard/>}/>
          <Route path='/instructor-dashboard' element={<Instructor_Dashboard/>}/>
        </Routes>
        <Footer />
      </main>
    </>
  );
};

export default App;
