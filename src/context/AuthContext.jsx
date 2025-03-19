import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({ role: 'Guest' });

  const success = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);

  // Register
  const register = async (username, email, password, navigate) => {
    try {
      const res = await axios.post('https://courses-backend-umber.vercel.app/api/register', {
        username,
        email,
        password,
      });
      if (res.data.status) {
        success(res.data.message);
        navigate('/login');
      } else {
        error(res.data.message);
      }
    } catch (err) {
      error('Registration failed');
    }
  };

  // Login
  const login = async (email, password, navigate) => {
    try {
      const res = await axios.post('https://courses-backend-umber.vercel.app/api/login', {
        email,
        password,
      }, { withCredentials: true });

      if (res.data.status) {
        success(res.data.message);
        setIsAuthorized(true);
        setUser(res.data.user); // Set user directly
        navigate('/');
      } else {
        error(res.data.message);
      }
    } catch (err) {
      error('Login failed');
    }
  };

  // Logout
  const logout = async (navigate) => {
    try {
      const res = await axios.post('https://courses-backend-umber.vercel.app/api/logout', {}, { withCredentials: true });
      if (res.data.status) {
        success(res.data.message);
        setIsAuthorized(false);
        setUser({ role: 'Guest' });
        navigate('/login');
      } else {
        error(res.data.message);
      }
    } catch (err) {
      error('Logout failed');
    }
  };

  // Authenticate User on Page Load
  const authUser = async () => {
    try {
      const res = await axios.post('https://courses-backend-umber.vercel.app/api/authUser', {}, { withCredentials: true });

      if (res.data.status) {
        setIsAuthorized(true);
        setUser(res.data.user);
      } else {
        setIsAuthorized(false);
        setUser({ role: 'Guest' });
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setIsAuthorized(false);
      setUser({ role: 'Guest' });
    }
  };

  useEffect(() => {
    authUser(); // Called once on page load
  }, []);

  return (
    <AuthContext.Provider value={{ register, login, logout, isAuthorized, user }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
