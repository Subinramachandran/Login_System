import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking login

  // Fetch profile function
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        withCredentials: "include"
      });

      if (res.status === 401) {
        setProfile(null); // not logged in
        return;
      }      
      const data = await res.data;
      setProfile(data.user || null);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Call on mount to persist login
  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {
        withCredentials: "include",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider value={{ profile, setProfile, fetchProfile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};