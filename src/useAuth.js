import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const role = localStorage.getItem('userRole') || 'user';
      setUserRole(role);
    }
  }, []);

  const login = (username, password) => {
    const credentials = btoa(`${username}:${password}`);
    fetch('http://localhost:3000/user', {
      headers: { 'Authorization': `Basic ${credentials}` },
    })
      .then(response => {
        if (response.ok){ 
            console.log('Login successful');
            return response.json();
        }
        else if (response.status === 401) throw new Error('Invalid credentials');
      })
      .then(data => {
        setIsAuthenticated(true);
        setUserRole(data.role);
        localStorage.setItem('authToken', credentials);
        localStorage.setItem('userRole', data.role);
      })
      .catch(error => console.error('Login failed:', error));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  return { isAuthenticated, userRole, login, logout };
};

export default useAuth;