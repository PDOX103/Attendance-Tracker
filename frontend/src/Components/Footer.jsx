import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#A9B9EB] text-black py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-semibold text-center md:text-left mb-4 md:mb-0">
            © Copyright 2024
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-center md:text-left">
            <div>
              <p className="font-semibold">About Us</p>
            </div>
            <div>
              <p className="font-semibold">Features</p>
              <ul className="mt-1">
                <li>Fast and easy Attendance</li>
                <li>Student, Class and Grade dashboards</li>
                <li>Customizable attendance reporting</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Join the community</p>
              <ul className="mt-1">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Discord</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Support</p>
              <ul className="mt-1">
                <li>FAQ</li>
                <li>Contact Us</li>
                <li>Help</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
