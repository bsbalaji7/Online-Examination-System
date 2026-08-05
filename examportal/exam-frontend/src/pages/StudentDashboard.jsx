import { Link } from "react-router-dom";

function StudentDashboard() {
    return (
        <div className="container mt-5">

            <h2 className="mb-4">Student Dashboard</h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h4>Available Exams</h4>

                        <p>View all available exams.</p>

                        <Link
                            to="/exams"
                            className="btn btn-primary"
                        >
                            View Exams
                        </Link>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h4>Results</h4>

                        <p>Check your exam results.</p>

                        <Link
                            to="/result"
                            className="btn btn-success"
                        >
                            View Result
                        </Link>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h4>Logout</h4>

                        <p>Logout from the application.</p>

                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/";
                            }}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default StudentDashboard;