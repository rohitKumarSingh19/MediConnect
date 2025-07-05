import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function DoctorProfileCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    speciality: "",
    fee: "",
    clinicAddress: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/doctors/profile", {
        ...formData,
        availableSlots: [], // Start empty
      });
      alert("Doctor profile created successfully!");
      navigate("/doctor-dashboard"); // Redirect to dashboard
    } catch (error) {
      alert("Error creating profile: " + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-blue-700">Create Doctor Profile</h2>

        <input
          type="text"
          name="speciality"
          placeholder="Speciality"
          value={formData.speciality}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="fee"
          placeholder="Consultation Fee"
          value={formData.fee}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="clinicAddress"
          placeholder="Clinic Address"
          value={formData.clinicAddress}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={formData.emergencyContact}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}
