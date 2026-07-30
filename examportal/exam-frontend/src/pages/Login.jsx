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
            // 1. Login and receive JWT token
            const loginResponse = await api.post("/auth/login", {
                email,
                password
            });
            console.log(
    "Login Response:",
    JSON.stringify(loginResponse.data, null, 2)
);

            const token = loginResponse.data;

            if (!token) {
                throw new Error("Token was not received from server");
            }

            // 2. Temporarily save token
            localStorage.setItem("token", token);

            // 3. Get users to identify the logged-in user
            const usersResponse = await api.get("/auth/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // 4. Find user using login email
            const user = usersResponse.data.find(
                (u) =>
                    u.email &&
                    u.email.toLowerCase() === email.toLowerCase()
            );

            if (!user) {
                throw new Error("Logged-in user information not found");
            }

            console.log("Logged in user:", user);
            console.log("Role from backend:", user.role);

            // 5. Extract role
            // Supports:
            // "STUDENT"
            // "ROLE_STUDENT"
            // { name: "STUDENT" }
            // { roleName: "STUDENT" }
            // { role: "STUDENT" }
            // { authority: "ROLE_STUDENT" }

            let roleValue = "";

            if (typeof user.role === "string") {
                roleValue = user.role;
            } else if (
                user.role &&
                typeof user.role === "object"
            ) {
                roleValue =
                    user.role.name ||
                    user.role.roleName ||
                    user.role.role ||
                    user.role.authority ||
                    "";
            }

            const normalizedRole = String(roleValue)
                .toUpperCase()
                .replace("ROLE_", "")
                .trim();

            console.log("Role value:", roleValue);
            console.log("Normalized role:", normalizedRole);

            // 6. Validate role
            if (
                normalizedRole !== "ADMIN" &&
                normalizedRole !== "STUDENT"
            ) {
                console.error(
                    "Unknown role object:",
                    user.role
                );

                throw new Error(
                    `Invalid user role: ${JSON.stringify(user.role)}`
                );
            }

            // 7. Save user information
            localStorage.setItem(
                "name",
                user.name || "User"
            );

            localStorage.setItem(
                "role",
                normalizedRole
            );

            localStorage.setItem(
                "studentId",
                String(user.id)
            );

            // 8. Redirect according to role
            if (normalizedRole === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/student");
            }

        } catch (error) {
            console.error("Login error:", error);

            // Remove partially stored login information
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("role");
            localStorage.removeItem("studentId");

            if (error.response?.status === 401) {
                setError("Invalid email or password.");
            } else if (error.response?.status === 403) {
                setError(
                    "You do not have permission to access this account."
                );
            } else if (error.response?.status === 404) {
                setError(
                    "Login service was not found. Please check the backend server."
                );
            } else {
                setError(
                    error.message ||
                    "Unable to login. Please try again."
                );
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