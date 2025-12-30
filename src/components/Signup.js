import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

import "./Signup.css"; // optional styling file

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ REGISTER
      await api.post("/api/auth/register/", form);

      // 2️⃣ AUTO LOGIN AFTER SIGNUP
      const res = await api.post("/api/auth/login/", {
        username: form.username,
        password: form.password,
      });

      login(res.data.access, res.data.refresh);

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.username?.[0] ||
        err?.response?.data?.email?.[0] ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Join BioLogist</p>

        {error && <div className="signup-error">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
