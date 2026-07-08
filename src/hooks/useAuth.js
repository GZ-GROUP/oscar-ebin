import { useState, useEffect } from "react";
import { getStoredUser, getAccessToken, isAuthenticated, logout } from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario y token del localStorage al montar el componente
    const storedUser = getStoredUser();
    const storedToken = getAccessToken();
    const isAuth = isAuthenticated();

    setUser(storedUser);
    setToken(storedToken);
    setAuthenticated(isAuth);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setToken(null);
    setAuthenticated(false);
    window.location.href = "/signin";
  };

  return {
    user,
    token,
    authenticated,
    loading,
    logout: handleLogout,
  };
};