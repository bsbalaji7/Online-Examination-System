import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ManageExams() {

    const navigate = useNavigate();
    const [exams, setExams] = useState([]);

    useEffect(() => {
        loadExams();
    }, []);

    const loadExams = async () => {

        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/exams", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExams(response.data);

        } catch (error) {
            console.error("Load exams error:", error);
            alert("Failed to load exams");
        }
    };

    const deleteExam = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this exam?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/exams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Exam deleted successfully!");

            loadExams();

        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete exam");
        }
    };

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between mb-4">

                <h2>Manage Exams</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/admin/create-exam")}
                >
                    + Create Exam
                </button>

            </div>

            {exams.length === 0 ? (

                <p>No exams available.</p>

            ) : (

                <div className="table-responsive">

                    <table className="table table-bordered table-striped">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Total Marks</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {exams.map((exam) => (

                                <tr key={exam.id}>

                                    <td>{exam.id}</td>

                                    <td>{exam.title}</td>

                                    <td>{exam.description}</td>

                                    <td>{exam.duration} min</td>

                                    <td>{exam.totalMarks}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/edit-exam/${exam.id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteExam(exam.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

            <button
                className="btn btn-secondary mt-3"
                onClick={() => navigate("/admin")}
            >
                Back to Dashboard
            </button>

        </div>
    );
}

export default ManageExams;