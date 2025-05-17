import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f4f8",
        padding: 20,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 500,
          padding: 40,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          background: "#fff",
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
          🔐 Login
        </h1>

        <form onSubmit={handleLogin} noValidate>
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
            style={{ fontSize: 16, padding: "12px 16px", marginBottom: 20 }}
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input-field"
            style={{ fontSize: 16, padding: "12px 16px", marginBottom: 20 }}
          />
          <button
            type="submit"
            className="btn primary"
            disabled={loading}
            style={{ fontSize: 16, padding: "12px 16px", width: "100%" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={
              message.includes("berhasil") ? "success-text" : "error-text"
            }
            style={{
              marginTop: 24,
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
            marginTop: 32,
            fontSize: 15,
            color: "var(--text-secondary)",
          }}
        >
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="btn secondary"
            style={{ padding: "8px 16px", fontSize: 14 }}
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
