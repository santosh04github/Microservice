import React, { useState } from "react";
import "./AddProperty.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const AddProperty = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    area: "",
    details: "",
    price: "",
    photo: "", // base64 string
  });

  // handle image change → convert to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/properties/add", {
        area: form.area,
        details: form.details,
        price: form.price,
        photo: form.photo, // send base64 string
      });
      console.log("Property Added:", response.data);
      alert("✅ Property added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to add property:", err.response?.data || err.message);
      alert("Failed to add property");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <div className="navbar">
          <h3>Add New Property</h3>
          <button onClick={() => navigate("/")}>Logout</button>
        </div>

        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Area</label>
              <input
                type="text"
                name="area"
                placeholder="Enter Area"
                value={form.area}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Property Details</label>
              <textarea
                name="details"
                rows="4"
                placeholder="Enter property details..."
                value={form.details}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="input-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <button type="submit" className="btn">
              Save Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
