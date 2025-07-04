import { NavLink, useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = getToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block md:inline px-3 py-1 rounded-md ${
      isActive ? "bg-white text-blue-600 font-semibold" : "text-white hover:bg-blue-500"
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
