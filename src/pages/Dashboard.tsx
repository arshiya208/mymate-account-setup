
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="font-dancing text-2xl text-mymate-text">MyMate</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard!</h2>
          
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <p className="font-medium">Account Information</p>
            <p className="text-gray-600">Email: {user?.email}</p>
            {user?.name && <p className="text-gray-600">Name: {user.name}</p>}
          </div>
          
          <p className="text-gray-600">
            You have successfully logged in to your MyMate account. This is a simple dashboard example.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
