import { Link, useNavigate } from "react-router-dom";
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

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MediConnect
        </Link>

        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center gap-6`}
        >
          <Link to="/" className="block md:inline hover:text-gray-200">
            Home
          </Link>
          {!token && (
            <>
              <Link to="/register" className="block md:inline hover:text-gray-200">
                Register
              </Link>
              <Link to="/login" className="block md:inline hover:text-gray-200">
                Login
              </Link>
            </>
          )}
          {token && (
            <>
              <Link to="/profile" className="block md:inline hover:text-gray-200">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block md:inline hover:text-gray-200"
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
