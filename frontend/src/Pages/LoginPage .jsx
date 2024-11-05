import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    const searchTerm = localStorage.getItem("searchTerm");
    localStorage.removeItem("searchTerm");
    if (formData.role === "recruiter") {
      navigate("/postjobs", { state: { searchTerm } });
    } else {
      navigate("/search", { state: { searchTerm } });
    }
  };

  const handleChangeLogin = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    handleLogin();
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            type="text"
            title="Email"
            placeholder="Enter your email"
            name="username"
            value={formData.username}
            onChange={handleChangeLogin}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            title="Password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChangeLogin}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Login as:</label>
          <div>
            <label className="me-3">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChangeLogin}
              />{" "}
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={formData.role === "recruiter"}
                onChange={handleChangeLogin}
              />{" "}
              Recruiter
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <p className="text-center mt-3">
          New user?{" "}
          <span
            className="text-primary"
            onClick={handleRegisterRedirect}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Please register
          </span>
        </p>
      </form>
    </div>
  );
}
