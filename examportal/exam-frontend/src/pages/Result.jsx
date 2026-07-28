import { useNavigate } from "react-router-dom";

function Result() {

    const navigate = useNavigate();

    const storedResult = localStorage.getItem("examResult");

    const result = storedResult
        ? JSON.parse(storedResult)
        : null;

    if (!result) {
        return (
            <div className="container mt-5 text-center">
                <h3>No Result Found</h3>

                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/student")}
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Exam Result
                            </h2>

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>
                                        <th>Exam</th>
                                        <td>
                                            {result.exam?.title || "Exam"}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Total Questions</th>
                                        <td>{result.totalQuestions}</td>
                                    </tr>

                                    <tr>
                                        <th>Correct Answers</th>
                                        <td>{result.correctAnswers}</td>
                                    </tr>

                                    <tr>
                                        <th>Wrong Answers</th>
                                        <td>{result.wrongAnswers}</td>
                                    </tr>

                                    <tr>
                                        <th>Percentage</th>
                                        <td>{result.percentage}%</td>
                                    </tr>

                                    <tr>
                                        <th>Status</th>

                                        <td>
                                            <span
                                                className={
                                                    result.status === "PASS"
                                                        ? "badge bg-success"
                                                        : "badge bg-danger"
                                                }
                                            >
                                                {result.status}
                                            </span>
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                            <div className="text-center mt-4">

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate("/student")
                                    }
                                >
                                    Back to Dashboard
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Result;