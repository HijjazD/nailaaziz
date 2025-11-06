import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authstore/authStore";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuth(); // Verify user via /check-auth
      setLoading(false);
    };
    verify();
  }, [checkAuth]);

  if (loading) return null; // or a spinner

  // If not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but role not allowed → redirect to their dashboard
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    if (user.role === "CLIENT") return <Navigate to="/client/dashboard" replace />;
    if (user.role === "COMPANY") return <Navigate to="/company/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
