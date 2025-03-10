import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import ToastMessage from "./toastMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await API.post("/auth/signup", form);
      if (response.status === 201) {
        setToastMessage("Signup successful");
        setToastType("success");
        setShowToast(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response.data.error || "Signup failed. Try again.";
      console.log(errorMessage);
      if (errorMessage === "Email already exists") {
        setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
      } else {
        setToastMessage(errorMessage);
        setToastType("error");
        setShowToast(true);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{background:"linear-gradient(to right, #4f6beb, #8458eb)"}}>
      <div className="card p-4 shadow-lg" style={{ width: "500px", borderRadius: "10px" }}>
        <h3 className="text-center mb-3">Create Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                className={`form-control ${errors.name ? "is-invalid" : ""}`} 
                onChange={handleChange} 
                required 
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className={`form-control ${errors.email ? "is-invalid" : ""}`} 
                onChange={handleChange} 
                required 
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className={`form-control ${errors.password ? "is-invalid" : ""}`} 
                onChange={handleChange} 
                required 
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-100" 
            style={{ background: "linear-gradient(to right, #4f6beb, #8458eb)" }} 
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Signup"}
          </Button>
        </form>

        <div className="text-center mt-3">
          <p>Already have an account? <a href="/login" className="text-decoration-none">Login</a></p>
        </div>
      </div>

      <ToastMessage show={showToast} message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default Signup;
