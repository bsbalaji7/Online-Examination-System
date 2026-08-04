import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/login",
                formData
            );

            console.log("Login Response:", response.data);

            // Clear previous data
            localStorage.clear();

            // Save JWT
            localStorage.setItem("token", response.data.token);

            // Save user details
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("studentId", response.data.userId);

            console.log("Stored Token:", localStorage.getItem("token"));

            if (response.data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/student");
            }

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message || "Invalid Credentials");
            } else {
                alert("Unable to connect to server.");
            }

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
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
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
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            autoComplete="email"
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
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary-custom w-100"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
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