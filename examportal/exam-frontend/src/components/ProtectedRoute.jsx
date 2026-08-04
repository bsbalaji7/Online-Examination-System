import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        localStorage.clear();
        return <Navigate to="/" replace />;
    }

    if (allowedRole && role !== allowedRole) {
        if (role === "ADMIN") {
            return <Navigate to="/admin" replace />;
        }

        if (role === "STUDENT") {
            return <Navigate to="/student" replace />;
        }

        localStorage.clear();
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;