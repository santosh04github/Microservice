import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Navbar from "../components/Navbar";


const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const storedUser =
      JSON.parse(sessionStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/change-password", {
        userId: user.id,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alert(res.data.message);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert( (err.response?.data?.error || "Failed to change password"));
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
         <Navbar title="Change Password" />
       

        <div className="content">
          <form onSubmit={handleSubmit} className="change-password-form">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" value={user.name} disabled />
            </div>

            <div className="input-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={form.currentPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter new password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
