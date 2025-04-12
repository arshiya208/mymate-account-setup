import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Chrome, Laptop, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, loginWithGoogle, loginWithApple } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
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
    
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 8 characters long",
      });
      setIsLoading(false);
      return;
    }
    
    const success = await signUp(email, password);
    setIsLoading(false);
    
    if (success) {
      navigate('/account-setup');
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
        <h2 className="text-mymate-text text-lg font-normal text-center mb-6">Create your Account</h2>
        
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
          
          <form onSubmit={handleSignUp}>
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
                  minLength={8}
                  className="form-input"
                  disabled={isLoading}
                />
                <p className="text-sm text-mymate-textLight mt-1 ml-1">
                  Password must contain at least 8 characters.
                </p>
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
            Have an account? <Link to="/login" className="text-mymate-accent hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
