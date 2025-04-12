
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const AccountSetup = () => {
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!fullName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your name",
      });
      setIsLoading(false);
      return;
    }
    
    // In a real app, you would save this to the user profile
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: `Welcome, ${fullName}!`,
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-mymate-primary">
      <div className="bg-mymate-primary p-8 rounded-xl w-full max-w-md">
        <h1 className="font-dancing text-4xl text-white text-center mb-2">MyMate</h1>
        <h2 className="text-mymate-text text-lg font-normal text-center mb-6">Complete Your Profile</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-mymate-text mb-1 ml-1">
                What's your name?
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                  Saving...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetup;
