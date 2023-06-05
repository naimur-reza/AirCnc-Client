import axios from "axios";
import { useEffect } from "react";
import useAuth from "../api/useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const { logOut } = useAuth();
const navigate = useNavigate();
export const useAxiosSecure = () => {
  useEffect(() => {
    const token = `bearer ${localStorage.getItem("access token")}`;

    //1. intercept request (client to server)
    axiosSecure.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    });

    // 2.intercept response (server to client)
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          (error.response && error.response.status(401)) ||
          error.response.status(403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return [axiosSecure];
};
