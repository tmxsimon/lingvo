import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/users/contexts/authProvider";
import Loading from "./Loading";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
