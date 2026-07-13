import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Register
            </h2>

            <form>

              <div className="mb-3">
                <label>Name</label>
                <input
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>

              <button className="btn btn-success w-100">
                Register
              </button>

            </form>

            <p className="text-center mt-3">
              Already have an account?
              <Link to="/"> Login</Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;