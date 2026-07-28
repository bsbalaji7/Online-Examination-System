import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function TakeExam() {

    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadQuestions();
    }, [examId]);

    // =========================
    // LOAD QUESTIONS
    // =========================
    const loadQuestions = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/questions/exam/${examId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuestions(response.data);

        } catch (error) {

            console.error("Question loading error:", error);
            alert("Unable to load questions.");

        }
    };

    // =========================
    // SELECT ANSWER
    // =========================
    const handleAnswerChange = (questionId, answer) => {

        setAnswers((previousAnswers) => ({
            ...previousAnswers,
            [questionId]: answer
        }));
    };

    // =========================
    // SUBMIT EXAM
    // =========================
    const submitExam = async () => {

        const token = localStorage.getItem("token");
        const studentId = localStorage.getItem("studentId");

        if (!token) {
            alert("Please login again.");
            navigate("/");
            return;
        }

        if (!studentId) {
            alert("Student ID not found. Please login again.");
            return;
        }

        // Check unanswered questions
        const unanswered = questions.filter(
            (question) => !answers[question.id]
        );

        if (unanswered.length > 0) {
            alert(
                `Please answer all questions. ${unanswered.length} question(s) remaining.`
            );
            return;
        }

        try {

            setSubmitting(true);

            // Save every answer
            for (const question of questions) {

                await api.post(
                    "/student-answers",
                    {
                        studentId: Number(studentId),
                        questionId: question.id,
                        selectedAnswer: answers[question.id]
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            // Calculate result
            const resultResponse = await api.post(
                `/results/${studentId}/${examId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("RESULT:", resultResponse.data);

            // Store result temporarily
            localStorage.setItem(
                "examResult",
                JSON.stringify(resultResponse.data)
            );

            alert("Exam submitted successfully!");

            navigate("/result");

        } catch (error) {

            console.error(
                "Exam submission error:",
                error.response?.data || error
            );

            if (error.response?.status === 403) {
                alert("Access denied. Please login again.");
            } else {
                alert("Failed to submit exam.");
            }

        } finally {

            setSubmitting(false);
        }
    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Take Exam
            </h2>

            {questions.length === 0 && (
                <p>No questions available for this exam.</p>
            )}

            {questions.map((question, index) => (

                <div
                    className="card shadow mb-4"
                    key={question.id}
                >

                    <div className="card-body">

                        <h5 className="mb-3">
                            {index + 1}. {question.questionText}
                        </h5>

                        {/* OPTION A */}

                        <div className="form-check mb-2">

                            <input
                                className="form-check-input"
                                type="radio"
                                id={`q${question.id}-a`}
                                name={`question-${question.id}`}
                                value="A"
                                checked={
                                    answers[question.id] === "A"
                                }
                                onChange={() =>
                                    handleAnswerChange(
                                        question.id,
                                        "A"
                                    )
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor={`q${question.id}-a`}
                            >
                                {question.optionA}
                            </label>

                        </div>

                        {/* OPTION B */}

                        <div className="form-check mb-2">

                            <input
                                className="form-check-input"
                                type="radio"
                                id={`q${question.id}-b`}
                                name={`question-${question.id}`}
                                value="B"
                                checked={
                                    answers[question.id] === "B"
                                }
                                onChange={() =>
                                    handleAnswerChange(
                                        question.id,
                                        "B"
                                    )
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor={`q${question.id}-b`}
                            >
                                {question.optionB}
                            </label>

                        </div>

                        {/* OPTION C */}

                        <div className="form-check mb-2">

                            <input
                                className="form-check-input"
                                type="radio"
                                id={`q${question.id}-c`}
                                name={`question-${question.id}`}
                                value="C"
                                checked={
                                    answers[question.id] === "C"
                                }
                                onChange={() =>
                                    handleAnswerChange(
                                        question.id,
                                        "C"
                                    )
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor={`q${question.id}-c`}
                            >
                                {question.optionC}
                            </label>

                        </div>

                        {/* OPTION D */}

                        <div className="form-check mb-2">

                            <input
                                className="form-check-input"
                                type="radio"
                                id={`q${question.id}-d`}
                                name={`question-${question.id}`}
                                value="D"
                                checked={
                                    answers[question.id] === "D"
                                }
                                onChange={() =>
                                    handleAnswerChange(
                                        question.id,
                                        "D"
                                    )
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor={`q${question.id}-d`}
                            >
                                {question.optionD}
                            </label>

                        </div>

                    </div>

                </div>
            ))}

            {questions.length > 0 && (

                <div className="text-center mb-5">

                    <button
                        className="btn btn-success btn-lg"
                        onClick={submitExam}
                        disabled={submitting}
                    >

                        {submitting
                            ? "Submitting..."
                            : "Submit Exam"}

                    </button>

                </div>

            )}

        </div>
    );
}

export default TakeExam;