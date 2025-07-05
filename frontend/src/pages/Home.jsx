import React from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function Home() {
  const navigate = useNavigate();
  const token = getToken();

  const handleCTAClick = () => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      {/* Banner Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16">
        {/* Text & CTA */}
        <div className="text-center md:text-left space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
            Welcome to MediConnect
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Book appointments, consult certified doctors, and manage your health—all in one place.
          </p>
          <button
            onClick={handleCTAClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Book an Appointment
          </button>
        </div>

        {/* Image */}
        <div className="mb-10 md:mb-0">
          <img
            src="/doctor-illustration.jpg" // <-- Put your image in public folder
            alt="Doctor Illustration"
            className="w-80 md:w-[400px] mx-auto"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-10 px-6">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
          Why Choose MediConnect?
        </h2>
        <div className="max-w-4xl mx-auto grid gap-4 text-center text-gray-700 md:grid-cols-3">
          <div>✔️ Easy appointment scheduling</div>
          <div>✔️ Verified doctor profiles</div>
          <div>✔️ Real-time updates</div>
        </div>
      </div>
    </div>
  );
}
