import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          user: jwtDecode(data.access),
          authTokens: data,
          loading: false,
        });
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");
        showSuccessNotification("Login Successful");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
      showErrorNotification("Login failed");
    }
  };

  const register = async (email, username, password, password2) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, password2 }),
      });

      if (response.ok) {
        navigate("/login");
        showSuccessNotification("Registration Successful, Login Now");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error(error);
      showErrorNotification("Registration failed");
    }
  };

  const logout = () => {
    setAuthState({ user: null, authTokens: null, loading: false });
    localStorage.removeItem("authTokens");
    navigate("/login");
    showSuccessNotification("Logged Out");
  };

  const showSuccessNotification = (message) => {
    // Implement your notification logic here
    console.log("Success:", message);
  };

  const showErrorNotification = (message) => {
    // Implement your notification logic here
    console.error("Error:", message);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {!authState.loading && children}
    </AuthContext.Provider>
  );
};
