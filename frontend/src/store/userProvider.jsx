import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import UserContext from "./userContext";

axios.defaults.withCredentials = true; // ✅ always send cookies with requests

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ wait until we know

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/user`
      );

      setUser(response.data); // backend returns { id, email, ... }
    } catch (err) {
      console.error("❌ Error fetching user:", err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser(); // fetch user on first mount
  }, [getUser]);

  const value = {
    user,
    setUser,
    getUser,
    loading,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children} 
      {/* ✅ don’t render routes until we know if logged in */}
    </UserContext.Provider>
  );
}

export default UserProvider;
