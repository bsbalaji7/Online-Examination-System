import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ManageQuestions() {
    const navigate = useNavigate();

    const [exams, setExams] = useState([]);
    const [selectedExamId, setSelectedExamId] = useState("");
    const [questions, setQuestions] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A"
    });

    const getHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem("token")}`
    });

    // ==============================
    // LOAD EXAMS
    // ==============================
    useEffect(() => {
        loadExams();
    }, []);

    const loadExams = async () => {
        try {
            const response = await api.get("/exams", {
                headers: getHeaders()
            });

            setExams(response.data);

        } catch (error) {
            console.error("Load exams error:", error);
            alert("Failed to load exams");
        }
    };

    // ==============================
    // SELECT EXAM
    // ==============================
    const handleExamChange = async (e) => {
        const examId = e.target.value;

        setSelectedExamId(examId);
        setEditingId(null);
        resetForm();

        if (!examId) {
            setQuestions([]);
            return;
        }

        await loadQuestions(examId);
    };

    // ==============================
    // LOAD QUESTIONS
    // ==============================
    const loadQuestions = async (examId) => {
        try {
            const response = await api.get(
                `/questions/exam/${examId}`,
                {
                    headers: getHeaders()
                }
            );

            setQuestions(response.data);

        } catch (error) {
            console.error("Load questions error:", error);
            alert("Failed to load questions");
        }
    };

    // ==============================
    // FORM CHANGE
    // ==============================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ==============================
    // ADD / UPDATE QUESTION
    // ==============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedExamId) {
            alert("Please select an exam first.");
            return;
        }

        try {
            if (editingId) {
                // UPDATE
                await api.put(
                    `/questions/${editingId}`,
                    form,
                    {
                        headers: getHeaders()
                    }
                );

                alert("Question updated successfully!");

            } else {
                // CREATE
                await api.post(
                    `/questions/exam/${selectedExamId}`,
                    form,
                    {
                        headers: getHeaders()
                    }
                );

                alert("Question added successfully!");
            }

            resetForm();
            setEditingId(null);

            await loadQuestions(selectedExamId);

        } catch (error) {
            console.error(
                "Save question error:",
                error.response?.data || error
            );

            alert("Failed to save question");
        }
    };

    // ==============================
    // EDIT
    // ==============================
    const editQuestion = (question) => {
        setEditingId(question.id);

        setForm({
            questionText: question.questionText,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            correctAnswer: question.correctAnswer
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // ==============================
    // DELETE
    // ==============================
    const deleteQuestion = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(
                `/questions/${id}`,
                {
                    headers: getHeaders()
                }
            );

            alert("Question deleted successfully!");

            await loadQuestions(selectedExamId);

        } catch (error) {
            console.error(
                "Delete question error:",
                error.response?.data || error
            );

            alert("Failed to delete question");
        }
    };

    // ==============================
    // RESET FORM
    // ==============================
    const resetForm = () => {
        setForm({
            questionText: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correctAnswer: "A"
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        resetForm();
    };

    return (
        <div className="container mt-5 mb-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Manage Questions</h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/admin")}
                >
                    Back to Dashboard
                </button>

            </div>

            {/* SELECT EXAM */}

            <div className="card shadow mb-4">

                <div className="card-body">

                    <label className="form-label">
                        <strong>Select Exam</strong>
                    </label>

                    <select
                        className="form-select"
                        value={selectedExamId}
                        onChange={handleExamChange}
                    >
                        <option value="">
                            -- Select Exam --
                        </option>

                        {exams.map((exam) => (
                            <option
                                key={exam.id}
                                value={exam.id}
                            >
                                {exam.title}
                            </option>
                        ))}

                    </select>

                </div>

            </div>

            {/* QUESTION FORM */}

            {selectedExamId && (

                <div className="card shadow mb-4">

                    <div className="card-body">

                        <h4 className="mb-3">
                            {editingId
                                ? "Edit Question"
                                : "Add Question"}
                        </h4>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label">
                                    Question
                                </label>

                                <textarea
                                    className="form-control"
                                    name="questionText"
                                    value={form.questionText}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Option A
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="optionA"
                                        value={form.optionA}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Option B
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="optionB"
                                        value={form.optionB}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Option C
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="optionC"
                                        value={form.optionC}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Option D
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="optionD"
                                        value={form.optionD}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Correct Answer
                                </label>

                                <select
                                    className="form-select"
                                    name="correctAnswer"
                                    value={form.correctAnswer}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>

                            </div>

                            <button
                                type="submit"
                                className={
                                    editingId
                                        ? "btn btn-warning me-2"
                                        : "btn btn-success me-2"
                                }
                            >
                                {editingId
                                    ? "Update Question"
                                    : "Add Question"}
                            </button>

                            {editingId && (

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>

                            )}

                        </form>

                    </div>

                </div>

            )}

            {/* QUESTIONS */}

            {selectedExamId && (

                <div className="card shadow">

                    <div className="card-body">

                        <h4 className="mb-3">
                            Questions
                        </h4>

                        {questions.length === 0 ? (

                            <p className="text-muted">
                                No questions available for this exam.
                            </p>

                        ) : (

                            questions.map((question, index) => (

                                <div
                                    className="border rounded p-3 mb-3"
                                    key={question.id}
                                >

                                    <h5>
                                        {index + 1}.{" "}
                                        {question.questionText}
                                    </h5>

                                    <p className="mb-1">
                                        A. {question.optionA}
                                    </p>

                                    <p className="mb-1">
                                        B. {question.optionB}
                                    </p>

                                    <p className="mb-1">
                                        C. {question.optionC}
                                    </p>

                                    <p className="mb-2">
                                        D. {question.optionD}
                                    </p>

                                    <p>
                                        <strong>
                                            Correct Answer:
                                        </strong>{" "}
                                        {question.correctAnswer}
                                    </p>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            editQuestion(question)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteQuestion(question.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default ManageQuestions;