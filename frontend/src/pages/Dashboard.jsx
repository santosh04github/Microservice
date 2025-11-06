import React from "react";
import "./Dashboard.css";
// import property1 from "../assets/property1.jpg";
// import property2 from "../assets/property2.jpg";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
 

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
    
        <Sidebar />
      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
          <Navbar title="Property Details" />

        {/* Dashboard Body */}
        <div className="content">
          <h2>Dashboard Overview</h2>
          <p>You have 3 active property listings.</p>

          <div className="property-grid">
            <div className="property-card">
              <img src="" alt="Indore Property" />
              <div className="property-info">
                <h4>Indore</h4>
                <p>3 BHK Flat - ₹55L</p>
              </div>
            </div>

            <div className="property-card">
              <img src="" alt="Pune Property" />
              <div className="property-info">
                <h4>Pune</h4>
                <p>2 BHK Apartment - ₹42L</p>
              </div>
            </div>

            <div className="property-card">
              <img src="" alt="Delhi Property" />
              <div className="property-info">
                <h4>Delhi</h4>
                <p>4 BHK Villa - ₹1.2Cr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
