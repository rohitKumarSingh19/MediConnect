import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import DoctorList from "./components/DoctorList";
import DoctorDashboard from "./components/DoctorDashboard";
import DoctorProfileCreate from "./pages/DoctorProfileCreate";
import DoctorSlots from "./pages/DoctorSlots";
import Footer from "./components/Footer"; // ✅ Import Footer
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/create-doctor-profile" element={<DoctorProfileCreate />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/slots" element={<DoctorSlots />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer /> {/* ✅ Always visible at bottom */}
      </div>
    </BrowserRouter>
  );
}

export default App;
