import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const ToastMessage = ({ show, message, type = "success", onClose }) => {
  if (!show) return null;

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5 }}>
      <div className={`toast show text-white ${type === "success" ? "bg-success" : "bg-danger"}`}>
        <div className="d-flex">
          <div className="toast-body">
            <FontAwesomeIcon icon={type === "success" ? faCheckCircle : faTimesCircle} className="me-2" />
            {message}
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
