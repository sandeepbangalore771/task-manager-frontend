import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { user } = useAuth();
  console.log("User in PrivateRoute:", user);
  if (!user) {
    console.warn("User not found. Redirecting to login.");
    window.location.href = "/login";
    return null;
  }
  return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
