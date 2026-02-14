import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth"; // Auth service
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

interface LoginFormState {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext must be used within AuthProvider");

  const { login } = auth;

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(form);

      if (response.data.status === "success") {
        const { token, refreshToken } = response.data.data;
        login(token, refreshToken);
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" },
  form: { display: "flex", flexDirection: "column" as const, width: "300px", gap: "10px" },
  input: { padding: "8px" },
  button: { padding: "8px", cursor: "pointer" },
  error: { color: "red" },
};
