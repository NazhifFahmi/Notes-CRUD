import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";  

function Register() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${BASE_URL}/register`, form, { withCredentials: true });
      setMessage("✅ Registrasi berhasil! Mengarahkan ke halaman login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>📝 Register</h1>

        <form onSubmit={handleRegister} className="auth-form" noValidate>
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            required
            value={form.email}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="text"
            name="username"
            placeholder="👤 Username"
            required
            value={form.username}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            required
            value={form.password}
            onChange={handleChange}
            className="auth-input"
          />
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p className={`auth-message ${message.includes("berhasil") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <p className="auth-switch-text">
          Sudah punya akun?{" "}
          <Link to="/" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
