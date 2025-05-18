import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils";
import "../styles/auth.css";  

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/login`, form, {
        withCredentials: true,
      });
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);

      setMessage("✅ Login berhasil!");
      setTimeout(() => navigate("/notes"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Gagal login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🔐 Login</h1>

        <form onSubmit={handleLogin} className="auth-form" noValidate>
          <input
            type="text"
            name="username"
            placeholder="👤 Username"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="auth-input"
          />
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className={`auth-message ${message.includes("berhasil") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <p className="auth-switch-text">
          Belum punya akun?{" "}
          <Link to="/register" className="auth-link">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
