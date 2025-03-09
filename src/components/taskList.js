import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  ProgressBar,
  Table,
  Badge,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { faTh, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskList = () => {
  const [viewMode, setViewMode] = useState("list");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetchedTasks = response.data;
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleUpdateTask = async () => {
    try {
      await API.put(`/tasks/${editingTask._id}`, editingTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) =>
      filterCategory ? task.category === filterCategory : true
    )
    .filter((task) => (filterStatus ? task.status === filterStatus : true));

  return (
    <div className="container">
      <div className="row text-center mt-4 gy-3">
        <div className="col-sm-3 col-md-12">
          <Card
            className="shadow-lg border-0 rounded-4"
            style={{ width: "100%" }}
          >
            <Card.Body className="p-3">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                <div className="mb-3 mb-md-0 text-center text-md-start">
                  <h2 className="fw-bold mb-1">Task List</h2>
                  <p className="text-muted mb-2">
                    {completedTasks}/{totalTasks} Completed
                  </p>
                  <ProgressBar className="mb-3" style={{ height: "10px" }}>
                    <ProgressBar
                      variant="primary"
                      now={progress}
                      style={{ backgroundColor: "#7B1FA2" }}
                    />
                  </ProgressBar>
                </div>
                <div className="d-flex gap-2">
                  {!isMobile && (
                    <>
                      <Button
                        variant={
                          viewMode === "grid" ? "light" : "outline-light"
                        }
                        className="d-flex align-items-center justify-content-center p-2"
                        onClick={() => setViewMode("grid")}
                      >
                        <FontAwesomeIcon
                          icon={faTh}
                          className="text-secondary"
                        />
                      </Button>
                      <Button
                        variant={
                          viewMode === "list" ? "light" : "outline-light"
                        }
                        className="d-flex align-items-center justify-content-center p-2"
                        onClick={() => setViewMode("list")}
                      >
                        <FontAwesomeIcon
                          icon={faList}
                          className="text-secondary"
                        />
                      </Button>
                    </>
                  )}
                  <Button
                    className="d-flex align-items-center gap-2 px-3 py-2"
                    style={{
                      background: "linear-gradient(to left, #4f6beb, #8458eb)",
                    }}
                    onClick={() => navigate("/add-task")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Task
                  </Button>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <Form.Control
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3 mb-md-0">
                  <Form.Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">Filter by Category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
                  </Form.Select>
                </div>
                <div className="col-12 col-md-3">
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">Filter by Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </div>
              </div>

              {viewMode === "list" ? (
                <div>
                  {isMobile ? (
                    <div className="list-group">
                      {filteredTasks.map((task) => (
                        <div key={task._id} className="list-group-item my-2">
                          <h5>{task.title}</h5>
                          <p>
                            <strong>Category:</strong> {task.category}
                          </p>
                          <p>
                            <strong>Status:</strong> {task.status}
                          </p>
                          <p>
                            <strong>Priority:</strong>
                            <Badge
                              bg={
                                task.priority === "Low"
                                  ? "success"
                                  : task.priority === "Medium"
                                  ? "warning"
                                  : "danger"
                              }
                              className="ms-2"
                            >
                              {task.priority}
                            </Badge>
                          </p>
                          <p>
                            <strong>Due Date:</strong>{" "}
                            {new Date(task.dueDate).toLocaleDateString("en-GB")}
                          </p>
                          <div>
                            <FaEdit
                              onClick={() => handleUpdateTask(task)}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            />
                            <FaTrash
                              onClick={() => handleDeleteTask(task._id)}
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table hover responsive className="border-top">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th className="d-none d-md-table-cell">Priority</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTasks.map((task) => (
                            <tr key={task.id}>
                              <td>
                                {editingTask && editingTask._id === task._id ? (
                                  <input
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) =>
                                      setEditingTask({
                                        ...editingTask,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                ) : (
                                  task.title
                                )}
                              </td>

                              <td>
                                {editingTask && editingTask._id === task._id ? (
                                  <select
                                    value={editingTask.category}
                                    onChange={(e) =>
                                      setEditingTask({
                                        ...editingTask,
                                        category: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Study">Study</option>
                                  </select>
                                ) : (
                                  task.category
                                )}
                              </td>

                              <td>
                                {editingTask && editingTask._id === task._id ? (
                                  <select
                                    value={editingTask.status}
                                    onChange={(e) =>
                                      setEditingTask({
                                        ...editingTask,
                                        status: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                  </select>
                                ) : (
                                  task.status
                                )}
                              </td>

                              <td>
                                <Badge
                                  pill
                                  bg={
                                    task.priority === "Low"
                                      ? "success"
                                      : task.priority === "Medium"
                                      ? "warning"
                                      : "danger"
                                  }
                                  className="px-3 py-2"
                                  style={{
                                    backgroundColor:
                                      task.priority === "Low"
                                        ? "#81C784"
                                        : task.priority === "Medium"
                                        ? "#FF9800"
                                        : "#E91E63",
                                    color: "#fff",
                                  }}
                                >
                                  {task.priority}
                                </Badge>
                              </td>

                              <td>
                                {editingTask && editingTask._id === task._id ? (
                                  <input
                                    type="date"
                                    value={
                                      new Date(editingTask.dueDate)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                    onChange={(e) =>
                                      setEditingTask({
                                        ...editingTask,
                                        dueDate: e.target.value,
                                      })
                                    }
                                  />
                                ) : (
                                  new Date(task.dueDate).toLocaleDateString(
                                    "en-GB"
                                  )
                                )}
                              </td>

                              <td>
                                {editingTask && editingTask._id === task._id ? (
                                  <>
                                    <Button
                                      variant="success"
                                      size="sm"
                                      onClick={handleUpdateTask}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      onClick={() => setEditingTask(null)}
                                      className="ms-2"
                                    >
                                      Cancel
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <FaEdit
                                      onClick={() => handleEdit(task)}
                                      style={{
                                        cursor: "pointer",
                                        marginRight: "10px",
                                      }}
                                    />
                                    <FaTrash
                                      onClick={() => handleDeleteTask(task._id)}
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                      }}
                                    />
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              ) : (
                <Row>
                  {filteredTasks.map((task) => (
                    <Col
                      key={task._id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className="mb-4"
                    >
                      <Card>
                        <Card.Body>
                          <Card.Title>{task.title}</Card.Title>
                          <Card.Text>
                            <strong>Category:</strong> {task.category}
                            <br />
                            <strong>Status:</strong> {task.status}
                            <br />
                            <strong>Priority:</strong>{" "}
                            <Badge
                              pill
                              bg={
                                task.priority === "Low"
                                  ? "success"
                                  : task.priority === "Medium"
                                  ? "warning"
                                  : "danger"
                              }
                            >
                              {task.priority}
                            </Badge>
                            <br />
                            <strong>Due Date:</strong>{" "}
                            {new Date(task.dueDate).toLocaleDateString("en-GB")}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
