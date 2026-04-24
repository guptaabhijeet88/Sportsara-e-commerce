import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('sport_token'));
  const [loading, setLoading] = useState(true);

  // Validate token on app load
  useEffect(() => {
    const validateToken = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const { data } = await axios.get(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('sport_token');
        setToken(null);
        setUser(null);
      }
      setLoading(false);
    };
    validateToken();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem('sport_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API}/auth/register`, { name, email, password });
    localStorage.setItem('sport_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const sendOtp = async (name, email, password) => {
    const { data } = await axios.post(`${API}/auth/send-otp`, { name, email, password });
    return data;
  };

  const verifyOtp = async (email, otp) => {
    const { data } = await axios.post(`${API}/auth/verify-otp`, { email, otp });
    localStorage.setItem('sport_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const googleLogin = async (credential) => {
    const { data } = await axios.post(`${API}/auth/google`, { credential });
    localStorage.setItem('sport_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('sport_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, sendOtp, verifyOtp, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
