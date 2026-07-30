import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && role !== allowedRole) {

        if (role === "ADMIN") {
            return <Navigate to="/admin" replace />;
        }

        if (role === "STUDENT") {
            return <Navigate to="/student" replace />;
        }

        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;