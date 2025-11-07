import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
   const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first!");
          window.location.href = "/";
          return;
        }

        const res = await axios.get("http://localhost:5000/api/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);

        setProperties(res.data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load property data");
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
       <Navbar title={`Welcome, ${userData?.name || "User"}`} />
        {/* Dashboard Body */}
        <div className="content">
          <h2>Dashboard Overview</h2>

          {error && <p className="error">{error}</p>}

          {properties.length > 0 ? (
            <div className="property-grid">
              {properties.map((p) => (
                <div className="property-card" key={p.id}>
                  <img
                    src={`https://saanscalable.s3.amazonaws.com/${p.photo}`}
                    alt={p.area}
                  />
                  <div className="property-info">
                    <h4>{p.area}</h4>
                    <p>{p.details} - ₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !error && <p>Loading your property listings...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
