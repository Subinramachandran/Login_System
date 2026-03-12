// AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile once on app start
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) setProfile(data.user);
        else setProfile(null);
      } catch (err) {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};