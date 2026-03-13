import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking login

  // Fetch profile function
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/profile", {
        credentials: "include"
      });

      if (res.status === 401) {
        setProfile(null); // not logged in
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
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
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
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