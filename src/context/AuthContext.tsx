
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

type User = {
  email: string;
  name?: string;
  photoURL?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithApple: () => Promise<boolean>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user session in localStorage on initial load
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('mymate_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Failed to parse saved user', error);
          localStorage.removeItem('mymate_user');
        }
      }
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const loginWithEmail = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call to your backend
      if (email === "2303A51389@sru.edu.in" && password === "Student@2023") {
        const userData = { email };
        setUser(userData);
        localStorage.setItem('mymate_user', JSON.stringify(userData));
        toast({
          title: "Successfully logged in",
          description: "Welcome back!",
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Invalid email or password",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate Google auth - in a real app, you'd use Google's OAuth APIs
      toast({
        description: "Google authentication is currently simulated in this demo",
      });
      
      // Simulate successful Google login
      const mockGoogleUser = {
        email: "user@gmail.com",
        name: "Google User",
        photoURL: "https://via.placeholder.com/150"
      };
      
      setUser(mockGoogleUser);
      localStorage.setItem('mymate_user', JSON.stringify(mockGoogleUser));
      
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: "Could not authenticate with Google",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate Apple auth - in a real app, you'd use Apple's Sign In APIs
      toast({
        description: "Apple authentication is currently simulated in this demo",
      });
      
      // Simulate successful Apple login
      const mockAppleUser = {
        email: "user@icloud.com",
        name: "Apple User"
      };
      
      setUser(mockAppleUser);
      localStorage.setItem('mymate_user', JSON.stringify(mockAppleUser));
      
      return true;
    } catch (error) {
      console.error('Apple login error:', error);
      toast({
        variant: "destructive",
        title: "Apple login failed",
        description: "Could not authenticate with Apple",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mymate_user');
    toast({
      description: "You have been logged out",
    });
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      // Simulate password reset - in a real app, you'd send an email with a reset link
      toast({
        title: "Password reset email sent",
        description: `Check your inbox at ${email} for instructions`,
      });
      return true;
    } catch (error) {
      console.error('Password reset request error:', error);
      toast({
        variant: "destructive",
        title: "Reset request failed",
        description: "Could not send reset email",
      });
      return false;
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      // Simulate password reset - in a real app, you'd verify the token and update the password
      toast({
        title: "Password reset successful",
        description: "You can now log in with your new password",
      });
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: "Could not reset password",
      });
      return false;
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate signup - in a real app, this would create a new user in your backend
      const userData = { email };
      setUser(userData);
      localStorage.setItem('mymate_user', JSON.stringify(userData));
      
      toast({
        title: "Account created successfully",
        description: "Welcome to MyMate!",
      });
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Could not create account",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    loginWithEmail,
    loginWithGoogle,
    loginWithApple,
    logout,
    requestPasswordReset,
    resetPassword,
    signUp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
