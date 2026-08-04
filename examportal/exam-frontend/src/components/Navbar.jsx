import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    const goDashboard = () => {
        navigate(role === "ADMIN" ? "/admin" : "/student");
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div className="container">

                <div
                    className="navbar-brand fw-bold fs-3"
                    style={{ cursor: "pointer", color: "#2563eb" }}
                    onClick={goDashboard}
                >
                    🎓 ExamPortal
                </div>

                <div className="d-flex align-items-center gap-3">

                    <button
                        className="btn btn-outline-primary"
                        onClick={goDashboard}
                    >
                        Dashboard
                    </button>

                    <div className="text-end">
                        <div
                            className="fw-bold"
                            style={{ fontSize: "15px" }}
                        >
                            👋 {name}
                        </div>

                        <small className="badge bg-primary">
                            {role}
                        </small>
                    </div>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;