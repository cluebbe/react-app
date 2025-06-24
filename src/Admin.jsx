import React from 'react';
import useAuth from './useAuth';

const Admin = () => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <p className="message">Please log in to view the admin section.</p>;
  }
  if (userRole !== 'admin') {
    return <p className="message">Access denied. Admins only.</p>;
  }

  return (
    <div >
      <h1>Admin Section</h1>
      <p>Welcome, Admin! Manage your settings here.</p>
    </div>
  );
};

export default Admin;