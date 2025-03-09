import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ type }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/${type}`;
    const res = await axios.post(url, formData);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold">{type === "register" ? "Sign Up" : "Login"}</h2>
        <input className="border p-2 w-full" type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input className="border p-2 w-full mt-2" type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button className="bg-blue-500 text-white p-2 mt-2 w-full">{type === "register" ? "Sign Up" : "Login"}</button>
      </form>
    </div>
  );
};

export default Auth;
