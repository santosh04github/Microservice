import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 👇 Send mobile and password to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        mobile,
        password,
      });

      // ✅ Store JWT token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
         localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        alert("❌ No token received from server!");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert("❌ " + (err.response?.data?.message || "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/login_illustration.png" alt="Login Illustration" />
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <p>
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </p>

          <label>Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
