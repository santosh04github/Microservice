import React, { useState, useEffect } from "react";
import "./AddProperty.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AddProperty = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    area: "",
    details: "",
    price: "",
    photo: "", 
  });

  const [cities, setCities] = useState([]);

  // Fetch cities from backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cities");
        setCities(res.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  // Handle image → base64
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
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/properties/add",
        {
          area: form.area,
          details: form.details,
          price: form.price,
          photo: form.photo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Property added successfully!");
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
         <Navbar title="Add New Property" />

       

        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Area</label>
              <select
                name="area"
                value={form.area}
                onChange={handleChange}
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
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
