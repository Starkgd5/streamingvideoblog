import { createContext, useState, useEffect } from "react";
import { decode } from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: localStorage.getItem("authTokens")
      ? decode(localStorage.getItem("authTokens").access)
      : null,
    authTokens: localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
    loading: true,
  });

  const history = useHistory();

  const login = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState((prevState) => ({
          ...prevState,
          user: decode(data.access),
          authTokens: data,
        }));
        localStorage.setItem("authTokens", JSON.stringify(data));
        history.push("/");
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
        history.push("/login");
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
    history.push("/login");
    showSuccessNotification("Logged Out");
  };

  const showSuccessNotification = (message) => {
    // Use a notification library instead of swal for a cleaner approach
    // swal.fire({ title: message, icon: 'success', toast: true, ... });
  };

  const showErrorNotification = (message) => {
    // Use a notification library instead of swal for a cleaner approach
    // swal.fire({ title: message, icon: 'error', toast: true, ... });
  };

  useEffect(() => {
    setAuthState((prevState) => ({ ...prevState, loading: false }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {authState.loading ? null : children}
    </AuthContext.Provider>
  );
};
