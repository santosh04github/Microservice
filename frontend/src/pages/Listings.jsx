import React, { useEffect, useState } from "react";
import "./MyListings.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


const Listings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("⚠️ Please login to view your listings.");
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setListings(res.data || []);
      } catch (err) {
        console.error("Error fetching property list:", err);
        setError("❌ Failed to load property listings");
      }
    };

    fetchListings();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
         <Navbar title="Property Listings" />
        

        <div className="content">
          {error && <p className="error">{error}</p>}

          {listings.length > 0 ? (
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
                    <td>₹{prop.price}</td>
                    <td>
                      {prop.photo ? (
                        <img
                          src={`https://saanscalable.s3.amazonaws.com/${prop.photo}`}
                          alt={prop.area}
                          width="100"
                          style={{ borderRadius: "8px" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => navigate(`/property/${prop.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !error && <p>Loading your property listings...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
