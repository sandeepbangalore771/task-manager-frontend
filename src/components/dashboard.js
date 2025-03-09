import React, { useEffect, useState } from "react";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get("/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="container">
      <div className="row text-center mt-4 gy-3">
       
        <div className="col-md-4">
          <div className="card text-white bg-primary p-3 text-center">
            <FontAwesomeIcon icon={faTasks} className="mb-2" size="3x" />
            <h3>Total Tasks</h3>
            <h4>{totalTasks}</h4>
          </div>
        </div>

        
        <div className="col-md-4">
          <div className="card text-white bg-success p-3 text-center">
            <FontAwesomeIcon icon={faCheckCircle} className="mb-2" size="3x" />
            <h3>Completed Tasks</h3>
            <h4>{completedTasks}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-danger p-3 text-center">
            <FontAwesomeIcon icon={faClock} className="mb-2" size="3x" />
            <h3>Pending Tasks</h3>
            <h4>{pendingTasks}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
