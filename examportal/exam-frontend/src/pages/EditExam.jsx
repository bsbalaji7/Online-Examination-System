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
            console.error(error);
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
            console.error(error);
            alert("Failed to update exam");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow border-0">

                        <div className="card-header bg-primary text-white p-4">

                            <h2 className="mb-1">
                                ✏️ Edit Examination
                            </h2>

                            <small>
                                Update the examination details.
                            </small>

                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-4">

                                    <label className="form-label fw-bold">
                                        Exam Title
                                    </label>

                                    <input
                                        className="form-control form-control-lg"
                                        name="title"
                                        value={exam.title}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-bold">
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="form-control"
                                        name="description"
                                        value={exam.description}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-md-6">

                                        <div className="mb-4">

                                            <label className="form-label fw-bold">
                                                Duration (Minutes)
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="duration"
                                                value={exam.duration}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                        <div className="mb-4">

                                            <label className="form-label fw-bold">
                                                Total Marks
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="totalMarks"
                                                value={exam.totalMarks}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>

                                </div>

                                <div className="d-flex gap-3">

                                    <button
                                        className="btn btn-success px-4"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Save Changes"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() =>
                                            navigate("/admin/exams")
                                        }
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

export default EditExam;