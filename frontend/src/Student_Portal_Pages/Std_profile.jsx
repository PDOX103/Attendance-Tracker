import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Std_Sidebar from "./Std_Sidebar";

const Std_profile = () => {
  const [user, setUser] = useState();
  const params = useParams();

  const fetchUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/" + params.id);
      const result = await res.json();
      setUser(result.data);
      console.log(params.id);
    } catch (error) {
      console.error("Error fetching instructor data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Std_Sidebar />
      <div className="flex-1 flex justify-center items-center p-6">
        {user ? (
          <div className="bg-BLUE shadow-lg shadow-black rounded-lg p-8 w-full max-w-md mt-[-400px]">
            <h2 className="text-2xl font-roboto font-semibold text-gray-800 text-center mb-6 ">
              Student Profile
            </h2>
            <div className="space-y-4">
              <p>
                <span className="font-roboto font-semibold text-gray-600">
                  Name:
                </span>{" "}
                <span className="text-black">{user.name}</span>
              </p>
              <p>
                <span className="font-roboto font-semibold text-gray-600">
                  Email:
                </span>{" "}
                <span className="text-black">{user.email}</span>
              </p>
              {/* <p>
                <span className="font-roboto font-semibold text-gray-600">
                  ID:
                </span>{" "}
                <span className="text-black">{user.id}</span>
              </p> */}
              <p>
                <span className="font-roboto font-semibold text-gray-600">
                  Role:
                </span>{" "}
                <span className="text-black">{user.role}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="text-black text-lg font-medium animate-pulse mt-[-400px]">
            Loading student details...
          </div>
        )}
      </div>
    </div>
  );
};

export default Std_profile;
