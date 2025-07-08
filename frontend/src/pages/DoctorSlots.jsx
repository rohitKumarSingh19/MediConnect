import React, { useEffect, useState } from "react";
import API from "../api/api";
const DoctorSlots = () => {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/doctors/slots")
      .then((res) => {
        setSlots(res.data.upcoming);
      })
      .catch((err) => {
        setError("⚠️ Failed to load slots: " + (err.response?.data?.message || err.message));
        console.error(err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Upcoming Doctor Slots</h2>

      {error && <p className="text-red-600">{error}</p>}

      {slots.length === 0 ? (
        <p className="text-gray-600">No upcoming slots found.</p>
      ) : (
        <div className="space-y-4">
          {slots.map((slot) => (
            <div key={slot._id} className="p-4 bg-white shadow rounded">
              <p><strong>Start:</strong> {new Date(slot.start).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(slot.end).toLocaleString()}</p>
              <p className={slot.isBooked ? "text-red-500" : "text-green-500"}>
                {slot.isBooked ? "Booked" : "Available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorSlots;
