import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const goHome = () => {
        if (role === "ADMIN") {
            navigate("/admin");
        } else {
            navigate("/student");
        }
    };

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg shadow-sm">
            <div className="container">

                <button
                    className="navbar-brand btn btn-link text-decoration-none"
                    onClick={goHome}
                >
                    Online Examination System
                </button>

                <div className="d-flex align-items-center gap-3">

                    {name && (
                        <span className="text-white">
                            {name}{" "}
                            <span className="badge bg-primary">
                                {role}
                            </span>
                        </span>
                    )}

                    {name && (
                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;