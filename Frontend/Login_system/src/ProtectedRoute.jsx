// ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { profile, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; // wait for profile check

  if (!profile) return <Navigate to="/login" />; // not logged in

  return children; // logged in
};

export default ProtectedRoute;