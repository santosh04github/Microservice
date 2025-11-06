import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      alert("✅ Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Login failed"));
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
          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>

          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
