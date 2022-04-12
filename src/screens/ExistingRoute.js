import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ExistingRoute({ children }) {
  const { currentUser } = useAuth();

  return !currentUser ? children : <Navigate to="/account" />;
}
