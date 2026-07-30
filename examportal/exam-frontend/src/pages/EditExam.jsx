import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditExam() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [exam, setExam] = useState({
        title: "",
        description: "",
        duration: "",
        totalMarks: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadExam();
    }, [id]);

    const loadExam = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(`/exams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExam(response.data);

        } catch (error) {
            console.error("Load exam error:", error);
            alert("Failed to load exam");
        }
    };

    const handleChange = (e) => {
        setExam({
            ...exam,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            await api.put(
                `/exams/${id}`,
                {
                    title: exam.title,
                    description: exam.description,
                    duration: Number(exam.duration),
                    totalMarks: Number(exam.totalMarks)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Exam updated successfully!");

            navigate("/admin/exams");

        } catch (error) {
            console.error(
                "Update exam error:",
                error.response?.data || error
            );

            alert("Failed to update exam");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="mb-4">Edit Exam</h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Exam Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        value={exam.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        className="form-control"
                                        value={exam.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Duration (Minutes)
                                    </label>

                                    <input
                                        type="number"
                                        name="duration"
                                        className="form-control"
                                        min="1"
                                        value={exam.duration}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Total Marks
                                    </label>

                                    <input
                                        type="number"
                                        name="totalMarks"
                                        className="form-control"
                                        min="1"
                                        value={exam.totalMarks}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Updating..."
                                        : "Update Exam"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate("/admin/exams")
                                    }
                                >
                                    Cancel
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default EditExam;