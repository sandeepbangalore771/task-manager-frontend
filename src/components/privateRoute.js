import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { user } = useAuth();
  console.log("User in PrivateRoute:", user);
  return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
