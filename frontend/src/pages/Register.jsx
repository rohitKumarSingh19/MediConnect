// src/pages/Register.jsx
import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "user", address: "", contact: ""
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="doctor">Doctor</option>
      </select>
      <input placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <input placeholder="Contact Number" onChange={(e) => setForm({ ...form, contact: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
