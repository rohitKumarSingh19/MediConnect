import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("/doctors/all")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBook = async (doctorId, slotId) => {
    try {
      await API.post("/doctors/book", { doctorId, slotId });
      alert("Appointment booked!");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Available Doctors</h2>
      {doctors.map((doc) => (
        <div key={doc._id} className="bg-white p-4 mb-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold">{doc.user.name}</h3>
          <p><strong>Speciality:</strong> {doc.speciality}</p>
          <p><strong>Clinic:</strong> {doc.clinicAddress}</p>
          <p><strong>Fee:</strong> ₹{doc.fee}</p>
          <p><strong>Contact:</strong> {doc.emergencyContact}</p>

          <div className="mt-4 space-y-2">
            <h4 className="font-medium">Available Slots:</h4>
            {doc.availableSlots.filter(s => !s.isBooked).length === 0 ? (
              <p className="text-sm text-red-600">No slots available</p>
            ) : (
              doc.availableSlots
                .filter((slot) => !slot.isBooked)
                .map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => handleBook(doc._id, slot._id)}
                    className="mr-2 mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleTimeString()}
                  </button>
                ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
