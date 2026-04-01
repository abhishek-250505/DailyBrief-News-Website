import { createContext, useContext, useState, useEffect } from "react";
import api from "../config/axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    const storedToken = localStorage.getItem("auth_token")?.trim();

    if (
      storedUser &&
      storedToken &&
      storedToken !== "undefined" &&
      storedToken !== "null"
    ) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
    } else {
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
      delete api.defaults.headers.common.Authorization;
    }
  }, []);

  const saveAuth = (userData, authToken) => {
    const normalizedToken = authToken?.trim();
    setUser(userData);
    setToken(normalizedToken);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    localStorage.setItem("auth_token", normalizedToken);
    api.defaults.headers.common.Authorization = `Bearer ${normalizedToken}`;
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
    delete api.defaults.headers.common.Authorization;
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/auth/login", { email, password });
      const { token: authToken, user: userData } = response.data;
      saveAuth(userData, authToken);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
      return { success: false, message: err.response?.data?.msg || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/auth/signup", { name, email, password });
      const { token: authToken, user: userData } = response.data;
      saveAuth(userData, authToken);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
      return { success: false, message: err.response?.data?.msg || "Signup failed" };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout: clearAuth, loading, error, clearError: () => setError(null) }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
