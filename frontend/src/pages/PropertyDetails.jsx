import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "./PropertyDetails.css";
import axios from "axios";

const PropertyDetails = () => {
  const { area } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${area}`);
        setProperty(res.data);
      } catch (err) {
        // fallback demo data if API fails
        const fallbackData = {
          Indore: {
            area: "Indore",
            details: "3 BHK Flat, 1200 sqft, ₹55 Lakhs",
            description: "Spacious apartment with balcony, car parking and great locality.",
            image: "/images/property1.jpg",
          },
          Pune: {
            area: "Pune",
            details: "2 BHK Apartment, ₹42 Lakhs",
            description: "Modern apartment in city center with 24x7 water supply.",
            image: "/images/property2.jpg",
          },
        };
        setProperty(fallbackData[area]);
      }
    };

    fetchProperty();
  }, [area]);


  if (!property) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Property Details" />

        <div className="content">
          <div className="property-card">
            <img src={property.image} alt={property.area} />
            <div className="property-info">
              <h4>Area: {property.area}</h4>
              <p>{property.details}</p>
              <p>{property.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
