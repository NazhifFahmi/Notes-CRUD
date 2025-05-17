import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate, Link } from "react-router-dom";

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: 460,
          width: "100%",
          padding: "40px 32px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 12,
          backgroundColor: "#fff",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 32,
            fontSize: 32,
            fontWeight: "bold",
            color: "#2c3e50",
          }}
        >
          📝 Register
        </h1>

        <form onSubmit={handleRegister} noValidate>
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            required
            value={form.email}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="username"
            placeholder="👤 Username"
            required
            value={form.username}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            required
            value={form.password}
            onChange={handleChange}
            className="input-field"
          />
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p
            className={message.includes("berhasil") ? "success-text" : "error-text"}
            style={{
              marginTop: 20,
              fontWeight: 600,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: 28,
            fontSize: 15,
            color: "var(--text-secondary)",
          }}
        >
          Sudah punya akun?{" "}
          <Link
            to="/"
            className="btn secondary"
            style={{ padding: "8px 16px", fontSize: 14 }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
