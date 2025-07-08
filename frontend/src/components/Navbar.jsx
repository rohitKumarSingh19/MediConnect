import { NavLink, useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";
import { useState, useEffect } from "react";

function getUserRole() {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded?.role || null;
  } catch (err) {
    console.error("❌ Failed to decode token:", err);
    return null;
  }
}

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const token = getToken();

  useEffect(() => {
    if (token) {
      const decodedRole = getUserRole();
      setRole(decodedRole);
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block md:inline px-3 py-1 rounded-md ${
      isActive
        ? "bg-white text-blue-600 font-semibold"
        : "text-white hover:bg-blue-500"
    }`;

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-white">
          MediConnect
        </NavLink>

        <button
          className="md:hidden block text-white text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center gap-4`}
        >
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          {!token && (
            <>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            </>
          )}

          {token && (
            <>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>

              {role === "user" && (
                <NavLink to="/doctors" className={linkClass}>
                  Doctor List
                </NavLink>
              )}

              {role === "doctor" && (
                <NavLink to="/doctor-dashboard" className={linkClass}>
                  Dashboard
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="block md:inline px-3 py-1 text-white hover:bg-blue-500 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
