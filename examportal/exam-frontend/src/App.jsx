import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ExamList from "./pages/ExamList";
import TakeExam from "./pages/TakeExam";
import Result from "./pages/Result";
import CreateExam from "./pages/CreateExam";
import ManageExams from "./pages/ManageExams";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/take-exam/:examId" element={<TakeExam />} />
        <Route path="/result" element={<Result />} />
        <Route
    path="/admin/create-exam"
    element={<CreateExam />}
/>
<Route
    path="/admin/exams"
    element={<ManageExams />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;