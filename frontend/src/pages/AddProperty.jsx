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
    image: null,
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("area", form.area);
    formData.append("details", form.details);
    formData.append("price", form.price);
    formData.append("image", form.image);

    try {
      await axios.post("http://localhost:5000/api/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Property added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add property");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
     <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <div className="navbar">
          <h3>Add New Property</h3>
          <button onClick={() => navigate("/")}>Logout</button>
        </div>

        <div className="content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-group">
              <label>Area (Primary Key)</label>
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
                name="image"
                accept="image/*"
                onChange={handleChange}
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
