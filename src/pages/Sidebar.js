import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars, FaTimes, FaHome, FaTasks, FaPlus } from "react-icons/fa";
import "../App.css"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        className="btn btn-light d-md-none m-3"
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: "fixed", zIndex: 1000 }}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className="d-flex flex-column p-3 vh-100 text-white"
        style={{
          width: isOpen ? "250px" : "70px",
          background: "linear-gradient(to top, #4f6beb, #8458eb)",
          transition: "width 0.3s ease",
          overflow: "hidden",
          position: "fixed",
          zIndex: 1000,
          top: 58,
        }}
      >
        <h4 className={`text-center mb-4 ${isOpen ? "d-block" : "d-none"}`}>
          Task Manager
        </h4>

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/" ? "active" : "text-white"
              }`}
            >
              <FaHome className="me-2" size={20} />
              <span className={isOpen ? "d-inline" : "d-none"}>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/tasks"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/tasks" ? "active" : "text-white"
              }`}
            >
              <FaTasks className="me-2" size={20} />
              <span className={isOpen ? "d-inline" : "d-none"}>Task List</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add-task"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/add-task" ? "active" : "text-white"
              }`}
            >
              <FaPlus className="me-2" size={20} />
              <span className={isOpen ? "d-inline" : "d-none"}>Add Task</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
