import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            /*
             * Keep the storage logic that is already working in your
             * project. If your login API only returns the JWT token,
             * don't replace your existing role/name/studentId logic.
             */
            localStorage.setItem("token", response.data);

            const role = localStorage.getItem("role");

            if (role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/student");
            }

        } catch (error) {
            console.error(error);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-logo">
                    EP
                </div>

                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-2">
                        Welcome Back
                    </h2>

                    <p className="text-secondary">
                        Sign in to continue to ExamPortal
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <div className="mb-3">
                        <label className="form-label">
                            Email Address
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary-custom w-100"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                <div className="text-center mt-4">
                    <span className="text-secondary">
                        Don't have an account?{" "}
                    </span>

                    <Link
                        to="/register"
                        className="text-decoration-none fw-semibold"
                    >
                        Create account
                    </Link>
                </div>

                <div
                    className="text-center text-secondary mt-4"
                    style={{ fontSize: "12px" }}
                >
                    Secure Online Examination Platform
                </div>

            </div>
        </div>
    );
}

export default Login;