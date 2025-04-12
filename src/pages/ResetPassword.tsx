
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowLeft, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!password || !confirmPassword) {
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
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }
    
    const success = await resetPassword(token, password);
    setIsLoading(false);
    
    if (success) {
      setResetComplete(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-mymate-primary">
      <div className="bg-mymate-primary p-8 rounded-xl w-full max-w-md">
        <Link to="/login" className="flex items-center text-mymate-textLight hover:text-mymate-accent mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to login
        </Link>
        
        <h1 className="font-dancing text-4xl text-white text-center mb-2">MyMate</h1>
        <h2 className="text-mymate-text text-lg font-normal text-center mb-6">Reset Your Password</h2>
        
        {resetComplete ? (
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 text-green-500">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Password Reset Successful!</h3>
            <p className="mb-4 text-mymate-textLight">
              Your password has been reset successfully. You will be redirected to the login page shortly.
            </p>
            <Link to="/login" className="text-mymate-accent hover:underline">
              Return to login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-mymate-textLight mb-6 text-center">
              Create a new password for your account.
            </p>
            
            <form onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="New Password"
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
                
                <div>
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="form-input"
                    disabled={isLoading}
                  />
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
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
