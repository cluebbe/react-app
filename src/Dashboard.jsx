import React from 'react';
import useAuth from './useAuth';

const Dashboard = () => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <p className="message">Please log in to view the dashboard.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userRole}! This is your dashboard.</p>
    </div>
  );
};

export default Dashboard;