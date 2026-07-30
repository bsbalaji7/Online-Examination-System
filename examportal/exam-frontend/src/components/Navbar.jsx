import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    const goHome = () => {
        navigate(role === "ADMIN" ? "/admin" : "/student");
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="app-navbar">
            <div className="container h-100 d-flex align-items-center justify-content-between">

                <div
                    className="brand"
                    onClick={goHome}
                >
                    Exam<span>Portal</span>
                </div>

                <div className="d-flex align-items-center gap-3">

                    <div className="text-end">
                        <div className="user-name">
                            {name}
                        </div>

                        <span className="role-badge">
                            {role}
                        </span>
                    </div>

                    <button
                        className="btn-outline-custom"
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