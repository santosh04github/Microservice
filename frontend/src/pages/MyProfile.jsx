import React, { useState } from "react";
import "./MyProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MyProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/api/user/settings", form);
      alert("✅ Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update settings");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
     
     <Sidebar />

      {/* Main Content */}
      <div className="main-content">
         <Navbar title="Property Details" />
        

        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Change Password</label>
              <input
                type="password"
                name="password"
                placeholder="New password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
