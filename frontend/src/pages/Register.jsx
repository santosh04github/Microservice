import React, { useEffect } from "react";
import "./Register.css";
// import illustration from "./././undraw_deliveries_qutl.svg";

const Register = () => {
  useEffect(() => {
    const areaSelect = document.getElementById("area");
    fetch("https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json")
      .then(res => res.json())
      .then(data => {
        areaSelect.innerHTML = '<option value="">Select Area</option>';
        data.forEach(city => {
          const option = document.createElement("option");
          option.value = city.name;
          option.textContent = city.name;
          areaSelect.appendChild(option);
        });
      })
      .catch(() => {
        areaSelect.innerHTML = '<option value="">Failed to load areas</option>';
      });
  }, []);

  return (
    <div className="container">
      {/* Form Section (Left in HTML layout) */}
      <div className="register-section">
        <div className="register-box">
          <h2>Create Account</h2>
          <p>Join our community today!</p>

         <form>
  <div className="input-group">
    <label htmlFor="name">Full Name</label>
    <input id="name" type="text" placeholder="Enter your name" required />
  </div>

  <div className="input-group">
    <label htmlFor="mobile">Mobile Number</label>
    <input id="mobile" type="tel" placeholder="Enter your mobile number" required />
  </div>

  <div className="input-group">
    <label htmlFor="area">Select Area</label>
    <select id="area" required>
      <option value="">Select Area</option>
    </select>
  </div>

  <div className="radio-group">
    <label>Type:</label>
    <label>
      <input type="radio" name="type" value="Buy" required /> Buy
    </label>
    <label>
      <input type="radio" name="type" value="Sell" /> Sell
    </label>
  </div>

  <div className="input-group">
    <label htmlFor="password">Password</label>
    <input id="password" type="password" placeholder="Enter password" required />
  </div>

  <div className="input-group">
    <label htmlFor="confirm">Confirm Password</label>
    <input id="confirm" type="password" placeholder="Re-enter password" required />
  </div>

  <button type="submit" className="btn">Register</button>
</form>

        </div>
      </div>

      {/* Illustration Section (Right in HTML layout) */}
      <div className="illustration">
        <img src="/undraw_deliveries_qutl.svg" alt="Illustration" />
      </div>
    </div>
  );
};

export default Register;
