import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "123" && password === "123") {
      setAuth(true);
      navigate("/dashboard");
    } else {
      setAuth(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          <h1 className="fw-bold">Login</h1>
          <p className="text-muted">Welcome back, Admin!</p>
        </div>

        {auth === false && (
          <div className="alert alert-danger">Invalid credentials</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Forgot password? <Link to={"#"}>Reset here</Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
