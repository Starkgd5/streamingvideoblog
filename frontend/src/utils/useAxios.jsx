// useAxios.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${authTokens?.access}` },
    });

    instance.interceptors.request.use(async (req) => {
      if (!authTokens) return req;

      const user = jwtDecode(authTokens.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;

      try {
        const response = await axios.post(`${baseURL}/token/refresh/`, {
          refresh: authTokens.refresh,
        });

        const newTokens = response.data;
        localStorage.setItem("authTokens", JSON.stringify(newTokens));
        setAuthTokens(newTokens);
        setUser(jwtDecode(newTokens.access));

        req.headers.Authorization = `Bearer ${newTokens.access}`;
      } catch (error) {
        // Handle refresh token failure (e.g., logout user)
        console.error("Token refresh failed:", error);
      }

      return req;
    });

    return instance;
  }, [authTokens, setUser, setAuthTokens]);

  return axiosInstance;
};

export default useAxios;
