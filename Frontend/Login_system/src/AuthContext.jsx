import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });

      const data = res.data;
      setProfile(data.user || null);

    } catch (err) {

      // 👇 401 means not logged in
      if (err.response && err.response.status === 401) {
        setProfile(null);
      } else {
        console.error("Profile fetch error:", err);
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ profile, setProfile, fetchProfile, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};