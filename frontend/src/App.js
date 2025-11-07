import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import Listings from "./pages/Listings";
import MyProfile from "./pages/MyProfile";
import PropertyDetails from "./pages/PropertyDetails";
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/add-property" element={<ProtectedRoute element={AddProperty} />} />
        <Route path="/listings" element={<ProtectedRoute element={Listings} />} />
        <Route path="/settings" element={<ProtectedRoute element={MyProfile} />} />
        <Route path="/property/:id" element={<ProtectedRoute element={PropertyDetails} />} />
      </Routes>
    </Router>
  );
}

export default App;
