import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();
    const name = localStorage.getItem("name") || "Admin";

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("studentId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("examResult");

        navigate("/");
    };

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2>Admin Dashboard</h2>
                    <p className="text-muted">
                        Welcome, {name}
                    </p>
                </div>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

            <div className="row">

                {/* CREATE EXAM */}

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body">

                            <h4>Create Exam</h4>

                            <p>
                                Create a new examination.
                            </p>

                            <Link
                                to="/admin/create-exam"
                                className="btn btn-primary"
                            >
                                Create Exam
                            </Link>

                        </div>

                    </div>

                </div>

                {/* MANAGE EXAMS */}

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body">

                            <h4>Manage Exams</h4>

                            <p>
                                View, update and delete exams.
                            </p>

                            <Link
                                to="/admin/exams"
                                className="btn btn-warning"
                            >
                                Manage Exams
                            </Link>

                        </div>

                    </div>

                </div>

                {/* QUESTIONS */}

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body">

                            <h4>Manage Questions</h4>

                            <p>
                                Add and manage exam questions.
                            </p>

                            <Link
                                to="/admin/questions"
                                className="btn btn-success"
                            >
                                Manage Questions
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;