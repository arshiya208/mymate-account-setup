
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthRoute from "./components/AuthRoute";

// Auth Pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AccountSetup from "./pages/AccountSetup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes (redirect to login if not authenticated) */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Auth routes (accessible only when logged out) */}
            <Route 
              path="/login" 
              element={
                <AuthRoute requireAuth={false}>
                  <Login />
                </AuthRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <AuthRoute requireAuth={false}>
                  <SignUp />
                </AuthRoute>
              } 
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected routes (require authentication) */}
            <Route 
              path="/account-setup" 
              element={
                <AuthRoute>
                  <AccountSetup />
                </AuthRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <AuthRoute>
                  <Dashboard />
                </AuthRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
