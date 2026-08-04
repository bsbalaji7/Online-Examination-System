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

    const [loading, setLoading] =
        useState(false);

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

            const token =
                localStorage.getItem("token");

            await api.post(
                "/exams",
                {
                    ...exam,
                    duration:
                        Number(exam.duration),
                    totalMarks:
                        Number(exam.totalMarks)
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Exam created successfully!");

            navigate("/admin/exams");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to create exam."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="app-page">

            <div
                className="container"
                style={{ maxWidth: "800px" }}
            >

                <div className="mb-5">

                    <p className="text-secondary mb-2">
                        ADMINISTRATION
                    </p>

                    <h1 className="page-title">
                        Create Examination
                    </h1>

                    <p className="page-subtitle">
                        Configure a new examination for students.
                    </p>

                </div>

                <div className="app-card p-4 p-md-5">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">

                            <label className="form-label">
                                Exam Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Example: Java Fundamentals"
                                value={exam.title}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                name="description"
                                className="form-control"
                                rows="4"
                                placeholder="Briefly describe this examination..."
                                value={exam.description}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-4">

                                <label className="form-label">
                                    Duration
                                </label>

                                <div className="input-group">

                                    <input
                                        type="number"
                                        name="duration"
                                        className="form-control"
                                        placeholder="60"
                                        min="1"
                                        value={
                                            exam.duration
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                    <span className="input-group-text">
                                        Minutes
                                    </span>

                                </div>

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="form-label">
                                    Total Marks
                                </label>

                                <input
                                    type="number"
                                    name="totalMarks"
                                    className="form-control"
                                    placeholder="100"
                                    min="1"
                                    value={
                                        exam.totalMarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                        </div>

                        <hr
                            style={{
                                borderColor:
                                    "rgba(148,163,184,.15)"
                            }}
                        />

                        <div className="d-flex justify-content-end gap-3 mt-4">

                            <button
                                type="button"
                                className="btn-outline-custom"
                                onClick={() =>
                                    navigate("/admin")
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn-primary-custom"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Examination"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CreateExam;