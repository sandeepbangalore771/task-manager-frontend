import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import ToastMessage from "./toastMessage";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Task title is required!";
    if (!category) newErrors.category = "Category is required!";
    if (!status) newErrors.status = "Status is required!";
    if (!priority) newErrors.priority = "Priority is required!";
    if (!dueDate) newErrors.dueDate = "Due date is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }
    try {
      await API.post(
        "/tasks",
        { title, category, status, priority, dueDate },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setToast({ show: true, message: "Task added successfully!", type: "success" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
      setTimeout(() => navigate("/tasks"), 2000);
    } catch (error) {
      setToast({ show: true, message: "Failed to add task!", type: "danger" });
      setTimeout(() => setToast({ show: false, message: "", type: "danger" }), 3000);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center p-2 mt-md-4">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow">
            <h3 className="text-center mb-3">Add Task</h3>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} isInvalid={!!errors.category}>
                  <option value="">Select Category</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} isInvalid={!!errors.status}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)} isInvalid={!!errors.priority}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.priority}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} isInvalid={!!errors.dueDate} />
                <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" className="w-100" style={{background:"linear-gradient(to right, #4f6beb, #8458eb)"}}>
                Add Task
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <ToastMessage show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
    </Container>
  );
};

export default AddTask;
