
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { requestPasswordReset } = useAuth();
  const { toast } = useToast();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      setIsLoading(false);
      return;
    }
    
    const success = await requestPasswordReset(email);
    setIsLoading(false);
    
    if (success) {
      setResetSent(true);
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
        <h2 className="text-mymate-text text-lg font-normal text-center mb-6">Reset Password</h2>
        
        {resetSent ? (
          <div className="text-center">
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
              Password reset email sent!
            </div>
            <p className="mb-4">
              Check your email inbox at <strong>{email}</strong> for instructions on how to reset your password.
            </p>
            <p className="text-sm text-mymate-textLight">
              Didn't receive an email? Check your spam folder or{' '}
              <button 
                onClick={() => setResetSent(false)}
                className="text-mymate-accent hover:underline"
              >
                try again
              </button>
            </p>
          </div>
        ) : (
          <>
            <p className="text-mymate-textLight mb-6 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleResetRequest}>
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
                    "Send Reset Link"
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

export default ForgotPassword;
