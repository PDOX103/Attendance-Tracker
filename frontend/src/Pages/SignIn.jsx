import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = ({ setIsSignedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const signedInStatus = localStorage.getItem("isSignedIn");
    if (signedInStatus === "true") {
      setIsSignedIn(true);
      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    }
  }, [setIsSignedIn, navigate]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User Data:", data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("isSignedIn", "true"); 

        setIsSignedIn(true);

        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "instructor") {
          navigate("/instructor-dashboard");
        } else {
          navigate("/student-dashboard");
        }
        console.log("Google Sign-In successful:", credentialResponse);
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google Sign-In failed:", error);
  };

  return (
    <>
      <div className="background-image">
        <img src="/images/Signin_back.png" alt="Background" />
      </div>
      <section>
        <div className="container grid-col-1 md:grid-cols-2 min-h-[650px]">
          <div className="absolute left-60">
            <motion.img
              src="/images/4957136.jpg"
              alt="Sign In Illustration"
              className="w-[500px] h-[500px] object-cover shadow-lg"
              initial={{ opacity: 0, x: -100, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>

          <motion.div
            className="absolute right-80 top-60"
            initial={{ opacity: 0, x: 0, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="hover:!scale-110 duration-300 shadow-lg">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            <div className="flex justify-center gap-3">
              <div className="hover:!scale-110 duration-300">
                <img
                  src="/images/Google Play Badge.png"
                  className="w-[120px] object-cover"
                />
              </div>

              <div className="hover:!scale-110 duration-300">
                <img
                  src="/images/App Store Badge.png"
                  className="w-[120px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SignIn;