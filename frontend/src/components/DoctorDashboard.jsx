import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const [profile, setProfile] = useState(null);
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ start: "", end: "" });
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/doctors/my-profile")
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        // 👇 Redirect if doctor profile doesn't exist (404)
        if (err.response?.status === 404) {
          alert("No doctor profile found. Please create one first.");
          navigate("/create-doctor-profile");
        } else {
          alert("Something went wrong while fetching profile");
        }
      });

    // Fetch slots
    API.get("/doctors/slots")
      .then((res) => setSlots(res.data.upcoming))
      .catch((err) => {
        console.error("❌ Error fetching slots:", err);
      });
  }, [navigate]);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      await API.post("/doctors/add-slot", {
        start: newSlot.start,
        end: newSlot.end,
      });
      alert("Slot added");
      window.location.reload();
    } catch (err) {
      alert("Failed to add slot");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700">Doctor Dashboard</h2>
      
      {profile && (
        <div className="my-4">
          <p><strong>Name:</strong> {profile.user.name}</p>
          <p><strong>Speciality:</strong> {profile.speciality}</p>
        </div>
      )}

      <form onSubmit={handleAddSlot} className="space-y-3">
        <h3 className="text-lg font-semibold">Add Slot</h3>
        <input
          type="datetime-local"
          value={newSlot.start}
          onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="datetime-local"
          value={newSlot.end}
          onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Slot
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Upcoming Slots</h3>
        {slots.length === 0 ? (
          <p className="text-gray-500">No slots added yet.</p>
        ) : (
          slots.map((slot) => (
            <div key={slot._id} className="mb-2 p-2 bg-gray-100 rounded">
              <span className="text-sm">
                {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleTimeString()}
              </span>{" "}
              {slot.isBooked ? (
                <span className="text-red-600 font-medium">Booked</span>
              ) : (
                <span className="text-green-600 font-medium">Available</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
