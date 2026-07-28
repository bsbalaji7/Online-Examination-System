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
import EditExam from "./pages/EditExam";
import ManageQuestions from "./pages/ManageQuestions";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            STUDENT ROUTES
        ========================== */}

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exams"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <ExamList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/take-exam/:examId"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <TakeExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Result />
            </ProtectedRoute>
          }
        />


        {/* =========================
            ADMIN ROUTES
        ========================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-exam"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <CreateExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/exams"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ManageExams />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-exam/:id"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/questions"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ManageQuestions />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;