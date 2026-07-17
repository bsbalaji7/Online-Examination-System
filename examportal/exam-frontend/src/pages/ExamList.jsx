import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function ExamList() {
    const navigate = useNavigate();

    const [exams, setExams] = useState([]);

    useEffect(() => {

        fetchExams();

    }, []);

    const fetchExams = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/exams", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExams(response.data);

        } catch (error) {

            console.log(error);
            alert("Unable to load exams");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">Available Exams</h2>

            <div className="row">

                {exams.map((exam) => (

                    <div className="col-md-4 mb-4" key={exam.id}>

                        <div className="card shadow">

                            <div className="card-body">

                                <h4>{exam.title}</h4>

                                <p>{exam.description}</p>

                                <p>
                                    <strong>Duration:</strong> {exam.duration} Minutes
                                </p>

                                <p>
                                    <strong>Total Marks:</strong> {exam.totalMarks}
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/take-exam/${exam.id}`)}
                                >
                                    Start Exam
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default ExamList;