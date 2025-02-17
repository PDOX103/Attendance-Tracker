import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#A9B9EB] text-black py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-lg">⚫</span> {/* Placeholder for an icon */}
            <p className="font-semibold">About Us</p>
          </div>
          <div>
            <p className="font-semibold">Features</p>
            <ul className="mt-1 space-y-1">
              <li>Fast and easy Attendance</li>
              <li>Student, Class and Grade dashboards</li>
              <li>Customizable attendance reporting</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Join the community</p>
            <ul className="mt-1 space-y-1">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Discord</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Support</p>
            <ul className="mt-1 space-y-1">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6 text-sm font-semibold">
          © Copyright 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
