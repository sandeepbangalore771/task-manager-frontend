import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const userName = localStorage.getItem("userName") || "U"; // Default to "U" if no username is found
  const firstLetter = userName.charAt(0).toUpperCase(); // Get first letter

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  // Handle click outside to close dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="navbar d-flex justify-content-end px-4"
      style={{
        background: "linear-gradient(to left, #4f6beb, #8458eb)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "60px",
        zIndex: 999,
      }}
    >
      <div className="dropdown" ref={dropdownRef}>
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#8458eb",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {firstLetter}
        </div>

        {showDropdown && (
          <ul className="dropdown-menu dropdown-menu-end show" style={{ position: "absolute", right: 0 }}>
            <li>
              <button className="dropdown-item" onClick={handleLogout} >
              <FontAwesomeIcon icon={faSignOutAlt}  className="me-2"/>
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
