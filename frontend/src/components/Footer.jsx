import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">MediConnect</h3>
          <p className="text-sm">
            Bridging doctors and patients through a seamless appointment and communication platform.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-white">Find Doctors</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Contact Us</h4>
          <ul className="text-sm space-y-1">
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@mediconnect.com
            </li>
            <li>Phone: +91-9876543210</li>
            <li>Location: Noida, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Connect with Us</h4>
          <div className="flex space-x-4 mt-2 text-2xl">
            <a
              href="https://www.linkedin.com/in/rohit-kumar-singh-98658a198/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/rohitKumarSingh19"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-400"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} MediConnect. All rights reserved.
      </div>
    </footer>
  );
}
