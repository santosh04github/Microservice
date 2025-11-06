import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import Listings from "./pages/Listings";
import MyProfile from "./pages/MyProfile";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/settings" element={<MyProfile />} />
         <Route path="/property/:area" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
