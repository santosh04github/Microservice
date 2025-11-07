import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

  return (
    <div className="navbar">
      <h3>{title}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
