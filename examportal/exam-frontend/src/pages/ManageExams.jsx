import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ManageQuestions() {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
  });

  const headers = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    loadExams();
  }, []);

  async function loadExams() {
    const res = await api.get("/exams", { headers: headers() });
    setExams(res.data);
  }

  async function loadQuestions(examId) {
    const res = await api.get(`/questions/admin/exam/${examId}`, {
      headers: headers(),
    });
    setQuestions(res.data);
  }

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) =>
      q.questionText.toLowerCase().includes(search.toLowerCase())
    );
  }, [questions, search]);

  const handleExamChange = async (e) => {
    const id = e.target.value;
    setSelectedExamId(id);
    if (!id) {
      setQuestions([]);
      return;
    }
    await loadQuestions(id);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setEditingId(null);
    setForm({
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedExamId) return;

    if (editingId) {
      await api.put(`/questions/${editingId}`, form, {
        headers: headers(),
      });
    } else {
      await api.post(`/questions/exam/${selectedExamId}`, form, {
        headers: headers(),
      });
    }

    resetForm();
    await loadQuestions(selectedExamId);
  }

  const editQuestion = (q) => {
    setEditingId(q.id);
    setForm({
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function deleteQuestion(id) {
    if (!window.confirm("Delete this question?")) return;
    await api.delete(`/questions/${id}`, { headers: headers() });
    await loadQuestions(selectedExamId);
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">📘 Manage Questions</h2>
          <p className="text-muted mb-0">
            Total Questions: {filteredQuestions.length}
          </p>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin")}
        >
          Back
        </button>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <label className="form-label fw-semibold">Select Exam</label>
          <select
            className="form-select"
            value={selectedExamId}
            onChange={handleExamChange}
          >
            <option value="">Choose an exam</option>
            {exams.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedExamId && (
        <>
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h4>{editingId ? "Edit Question" : "Add Question"}</h4>

              <form onSubmit={handleSubmit}>
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  name="questionText"
                  value={form.questionText}
                  onChange={handleChange}
                  placeholder="Question"
                  required
                />

                <div className="row">
                  {["A","B","C","D"].map((o)=>(
                    <div className="col-md-6 mb-3" key={o}>
                      <input
                        className="form-control"
                        name={`option${o}`}
                        value={form[`option${o}`]}
                        onChange={handleChange}
                        placeholder={`Option ${o}`}
                        required
                      />
                    </div>
                  ))}
                </div>

                <select
                  className="form-select mb-3"
                  name="correctAnswer"
                  value={form.correctAnswer}
                  onChange={handleChange}
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </select>

                <button className="btn btn-primary me-2">
                  {editingId ? "Update Question" : "Add Question"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body">
              <input
                className="form-control mb-4"
                placeholder="Search questions..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />

              {filteredQuestions.length === 0 ? (
                <div className="alert alert-info">
                  No questions found.
                </div>
              ) : (
                filteredQuestions.map((q, index)=>(
                  <div key={q.id} className="card mb-3 border-0 shadow-sm">
                    <div className="card-body">
                      <h5>{index+1}. {q.questionText}</h5>
                      <ul className="list-group list-group-flush mb-3">
                        <li className="list-group-item">A. {q.optionA}</li>
                        <li className="list-group-item">B. {q.optionB}</li>
                        <li className="list-group-item">C. {q.optionC}</li>
                        <li className="list-group-item">D. {q.optionD}</li>
                      </ul>
                      <span className="badge bg-success me-3">
                        Correct: {q.correctAnswer}
                      </span>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={()=>editQuestion(q)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={()=>deleteQuestion(q.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ManageQuestions;