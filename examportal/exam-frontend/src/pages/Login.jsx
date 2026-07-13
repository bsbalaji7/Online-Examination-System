import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data);

            alert("Login Successful");

            navigate("/student");

        } catch (error) {

            alert("Invalid Email or Password");
            console.log(error);

        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Online Examination System
                        </h2>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>

                            <button className="btn btn-primary w-100">
                                Login
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Don't have an account?

                            <Link to="/register"> Register</Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;