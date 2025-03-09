import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import TaskList from "./components/taskList";
import AddTask from "./components/addTask";
import PrivateRoute from "./components/privateRoute";
import Layout from "./pages/Layout";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute component={() => <Layout><Dashboard /></Layout>} />} />
        <Route path="/tasks" element={<PrivateRoute component={() => <Layout><TaskList /></Layout>} />} />
        <Route path="/add-task" element={<PrivateRoute component={() => <Layout><AddTask /></Layout>} />} />
      </Routes>
    </Router>
  );
}

export default App;
