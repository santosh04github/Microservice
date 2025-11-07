import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    area: "",
    type: "",
    password: "",
    confirm: "",
  });

  const [areas, setAreas] = useState([]);

  // ✅ Fetch city list from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cities")
      .then((res) => setAreas(res.data))
      .catch((err) => {
        console.error("Error fetching cities:", err);
        setAreas([]);
      });
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        mobile: form.mobile,
        area: form.area,
        type: form.type,
        password: form.password,
      });

      alert("✅ Registration successful! Please login.");
      navigate("/"); // redirect to login
    } catch (err) {
      console.error(err);
      alert("❌ " + (err.response?.data?.error || "Registration failed"));
    }
  };

  return (
    <div className="container">
      {/* Form Section */}
      <div className="register-section">
        <div className="register-box">
          <h2>Create Account</h2>
          <p>Join our community today!</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="area">Select Area</label>
              <select
                id="area"
                name="area"
                value={form.area}
                onChange={handleChange}
                required
              >
                <option value="">Select Area</option>
                {areas.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="radio-group">
              <label>Type:</label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Buy"
                  checked={form.type === "Buy"}
                  onChange={handleChange}
                  required
                />{" "}
                Buy
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Sell"
                  checked={form.type === "Sell"}
                  onChange={handleChange}
                />{" "}
                Sell
              </label>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn">
              Register
            </button>
          </form>

          <p style={{ marginTop: "15px" }}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="illustration">
        <img src="/undraw_deliveries_qutl.svg" alt="Illustration" />
      </div>
    </div>
  );
};

export default Register;
