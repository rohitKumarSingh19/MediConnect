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
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/create-doctor-profile" element={<DoctorProfileCreate />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
