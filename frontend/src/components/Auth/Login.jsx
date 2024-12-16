import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/api";
import "../styles.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error.response.data);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="auth-form">
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;