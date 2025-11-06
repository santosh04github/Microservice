import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>🏠 RealEstate</h2>
      <NavLink to="/dashboard" activeclassname="active">
        Dashboard
      </NavLink>
      <NavLink to="/add-property" activeclassname="active">
        Add Property
      </NavLink>
      <NavLink to="/listings" activeclassname="active">
        My Listings
      </NavLink>
      <NavLink to="/settings" activeclassname="active">
        Settings
      </NavLink>
    </div>
  );
};

export default Sidebar;
