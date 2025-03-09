import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../services/api";
import ToastMessage from "./toastMessage";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!credentials.email) {
      errors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Invalid email format!";
    }

    if (!credentials.password) {
      errors.password = "Password is required!";
    } else if (credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters!";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await API.post("/auth/login", credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      setShowToast(true);
      setToastMessage("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrors({ general: error.response?.data?.message || "Login failed! Please check your credentials." });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{background:"linear-gradient(to right, #4f6beb, #8458eb)"}} >
      <div className="card shadow-lg p-4" style={{ width: "500px", borderRadius: "10px" }}>
        <div className="card-header bg-white text-center border-0">
          <h3 className="fw-bold" > Login</h3>
        </div>
        <div className="card-body">
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

            <div className="mb-3 input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {errors.password && <div className="text-danger mb-2">{errors.password}</div>}

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account? <a href="/signup" className="text-primary">Create Your Account <FontAwesomeIcon icon={faArrowRight} /></a>
          </p>
        </div>
      </div>

      <ToastMessage show={showToast} message={toastMessage} type="success" onClose={() => setShowToast(false)} />

    </div>
  );
};

export default Login;
