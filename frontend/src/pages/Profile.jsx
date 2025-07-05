import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);

 useEffect(() => {
  // const token = localStorage.getItem("token");
  // console.log("🔐 Token in localStorage:", token);

  API.get("/users/profile")
    .then((res) => {
      //console.log("✅ Profile fetched:", res.data);
      setProfile(res.data);
    })
    .catch((err) => {
      console.error("❌ Profile fetch failed:", err.response?.data || err.message);
    });
}, []);

  if (!profile)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-cyan-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Welcome, {profile.name}
        </h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {profile.role}
          </p>
          <p>
            <span className="font-semibold">Contact:</span> {profile.contact}
          </p>
          {profile.address && (
            <p>
              <span className="font-semibold">Address:</span> {profile.address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
