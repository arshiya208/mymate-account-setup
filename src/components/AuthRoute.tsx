
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type AuthRouteProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // While checking auth status, show a loading state
    return (
      <div className="min-h-screen flex justify-center items-center bg-mymate-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // For routes that require authentication
  if (requireAuth) {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // If authenticated, show the route
    return <>{children}</>;
  } 
  // For routes that require the user to be logged out (like login/signup)
  else {
    // If authenticated, redirect to dashboard
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    // If not authenticated, show the route
    return <>{children}</>;
  }
};

export default AuthRoute;
