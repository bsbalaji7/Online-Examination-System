import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateExam() {

    const navigate = useNavigate();

    const [exam, setExam] = useState({
        title: "",
        description: "",
        duration: "",
        totalMarks: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setExam({
            ...exam,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        try {

            setLoading(true);

            await api.post(
                "/exams",
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

            alert("Exam created successfully!");

            navigate("/admin/exams");

        } catch (error) {

            console.error(
                "Create exam error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to create exam"
            );

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

                            <h2 className="mb-4">
                                Create Exam
                            </h2>

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

                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Creating..."
                                            : "Create Exam"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/admin")}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CreateExam;