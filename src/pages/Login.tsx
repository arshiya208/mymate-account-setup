
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Chrome, Laptop, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithEmail, loginWithGoogle, loginWithApple } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      setIsLoading(false);
      return;
    }
    
    const success = await loginWithEmail(email, password);
    setIsLoading(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleAppleSignIn = async () => {
    const success = await loginWithApple();
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-mymate-primary">
      <div className="bg-mymate-primary p-8 rounded-xl w-full max-w-md">
        <h1 className="font-dancing text-4xl text-white text-center mb-2">MyMate</h1>
        <h2 className="text-mymate-text text-lg font-normal text-center mb-6">Log in to your Account</h2>
        
        <div className="space-y-4">
          <button 
            onClick={handleGoogleSignIn}
            className="btn-google"
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </button>
          
          <button 
            onClick={handleAppleSignIn}
            className="btn-apple"
            disabled={isLoading}
          >
            <Laptop className="mr-2 h-5 w-5" />
            Continue with Apple
          </button>
          
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-mymate-textLight text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-mymate-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
          
          <p className="text-center text-mymate-textLight mt-4">
            Don't have an account? <Link to="/signup" className="text-mymate-accent hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
