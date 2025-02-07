import React from "react";

const About = () => {
  return (
    <>
      <div className="background-image">
        <img src="/images/Signin_back.png" alt="Background" />
      </div>
      <div className="min-h-screen text-gray-900 p-8 relative">
        <div className="max-w-4xl text-left ml-16 relative z-10">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">About Us</h1>
          <p className="text-2xl mb-6">
            Our attendance tracker helps streamline attendance management with
            real-time monitoring. It also provides automated reports for better
            efficiency.
          </p>
        </div>

        <div className="max-w-4xl ml-16 mt-8 relative z-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Meet Our Developers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center text-center shadow-lg p-8 rounded-lg bg-gray-50">
              <p className="text-xl font-bold text-gray-700 mb-2">
                Developer 1
              </p>
              <img
                src="/images/rafi.jpg"
                alt="Developer 1"
                className="w-40 h-40 rounded-full mb-6 shadow-md"
              />
              <p className="text-2xl font-bold text-gray-900">Fahmidul Karim</p>
              <p className="text-lg text-gray-600">
                Ahsanullah University of Science and Technology
              </p>
            </div>
            <div className="flex flex-col items-center text-center shadow-lg p-8 rounded-lg bg-gray-50">
              <p className="text-xl font-bold text-gray-700 mb-2">
                Developer 2
              </p>
              <img
                src="/images/dev2.jpg"
                alt="Developer 2"
                className="w-40 h-40 rounded-full mb-6 shadow-md"
              />
              <p className="text-2xl font-bold text-gray-900">Priyom Parial</p>
              <p className="text-lg text-gray-600">
                Ahsanullah University of Science and Technology
              </p>
            </div>
            <div className="flex flex-col items-center text-center shadow-lg p-8 rounded-lg bg-gray-50">
              <p className="text-xl font-bold text-gray-700 mb-2">
                Developer 3
              </p>
              <img
                src="/images/safuan.jpg"
                alt="Developer 3"
                className="w-40 h-40 rounded-full mb-6 shadow-md"
              />
              <p className="text-2xl font-bold text-gray-900">Safuan Hasan</p>
              <p className="text-lg text-gray-600">
                Ahsanullah University of Science and Technology
              </p>
            </div>
            <div className="flex flex-col items-center text-center shadow-lg p-8 rounded-lg bg-gray-50">
              <p className="text-xl font-bold text-gray-700 mb-2">
                Developer 4
              </p>
              <img
                src="/images/dev4.jpg"
                alt="Developer 4"
                className="w-40 h-40 rounded-full mb-6 shadow-md"
              />
              <p className="text-2xl font-bold text-gray-900">Sayek AL Sami</p>
              <p className="text-lg text-gray-600">
                Ahsanullah University of Science and Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
