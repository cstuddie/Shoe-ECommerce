import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Simple protected route based on simulated state passed as props
function ProtectedRoute({ isAuthenticated, userRole, allowedRoles, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    // Pass the original locationAttempted in state so login page can redirect back (optional)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check roles if required for this route
  if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Redirect if user's role is not allowed
      console.warn(`Simulated Access Denied: User role (${userRole}) not in allowed roles (${allowedRoles}) for path ${location.pathname}`);
      // Redirect to home or a dedicated 'Unauthorized' page (create it if needed)
      return <Navigate to="/" state={{ message: "Access Denied" }} replace />;
  }

  // If authenticated and role is okay (or no role check needed), render the child component
  return children;
}

export default ProtectedRoute;