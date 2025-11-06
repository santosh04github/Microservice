import React, { useEffect, useState } from "react";
import "./MyListings.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Listings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  // Fetch property data (replace with backend API)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setListings(res.data);
      } catch (err) {
        // fallback sample data
        setListings([
          {
            area: "Indore",
            details: "3 BHK Flat, 1200 sqft",
            price: "₹55L",
          },
          {
            area: "Pune",
            details: "2 BHK Apartment",
            price: "₹42L",
          },
        ]);
      }
    };
    fetchListings();
  }, []);

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
        <div className="navbar">
          <h3>My Property Listings</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="content">
          <table className="listing-table">
            <thead>
              <tr>
                <th>Area</th>
                <th>Details</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((prop, i) => (
                <tr key={i}>
                  <td>{prop.area}</td>
                  <td>{prop.details}</td>
                  <td>{prop.price}</td>
                  <td>
                    {/* <img src={prop.photo} alt={prop.area} width="100" /> */}
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => navigate(`/property/${prop.area}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Listings;
