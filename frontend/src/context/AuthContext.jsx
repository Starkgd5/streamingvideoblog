// AuthContext.js
import { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    authTokens: null,
    loading: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadAuthState = () => {
      const tokens = localStorage.getItem("authTokens");
      if (tokens) {
        const parsedTokens = JSON.parse(tokens);
        setAuthState({
          user: jwtDecode(parsedTokens.access),
          authTokens: parsedTokens,
          loading: false,
        });
      } else {
        setAuthState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    loadAuthState();
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/", {
          email,
          password,
        });
        const data = response.data;
        setAuthState({
          user: jwtDecode(data.access),
          authTokens: data,
          loading: false,
        });
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");
        showNotification("Login Successful", "success");
      } catch (error) {
        console.error(error);
        showNotification("Login failed", "error");
      }
    },
    [navigate]
  );

  const register = useCallback(
    async (email, username, password, password2) => {
      try {
        await axios.post("http://127.0.0.1:8000/api/register/", {
          email,
          username,
          password,
          password2,
        });
        navigate("/login");
        showNotification("Registration Successful, Login Now", "success");
      } catch (error) {
        console.error(error);
        showNotification("Registration failed", "error");
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setAuthState({ user: null, authTokens: null, loading: false });
    localStorage.removeItem("authTokens");
    navigate("/login");
    showNotification("Logged Out", "success");
  }, [navigate]);

  const showNotification = (message, type) => {
    // Implement your notification logic here
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const contextValue = {
    ...authState,
    login,
    register,
    logout,
    setUser: (user) => setAuthState((prev) => ({ ...prev, user })),
    setAuthTokens: (tokens) =>
      setAuthState((prev) => ({ ...prev, authTokens: tokens })),
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!authState.loading && children}
    </AuthContext.Provider>
  );
};
