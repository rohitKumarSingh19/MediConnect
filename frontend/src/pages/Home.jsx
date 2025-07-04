import React from "react";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-700">Welcome to MediConnect</h1>
        <p className="text-lg text-gray-700">
          Your gateway to connect with doctors and manage health appointments easily.
        </p>
      </div>
    </div>
  );
}
