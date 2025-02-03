import React from 'react'

const Contact = () => {
  return (
    <div  className="min-h-screen bg-white text-gray-900 p-8 relative">
    <div className="max-w-4xl text-left ml-16 relative z-10"> 
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Contact Us</h1>
      <p className="text-2xl mb-6">
      <h1>Fahmidul Karim</h1>
      <h1>Email:fahmidul.cse.20220104103@aust.edu</h1>
       <div >
        <h1>priyom parial</h1>
       <h1>Email:priyam.cse.20220104085@aust.edu</h1> 
       </div>
      
      
      </p>
    </div>
      <img
        src="/images/SignUp_back.png"
        alt="Background"
        className="absolute top-0 right-0 h-full w-auto object-cover z-0"
      />
      

    </div>
  )
}

export default Contact
