import axios, { InternalAxiosRequestConfig } from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  // TODO: remove this when auth is implemented and use the real token
  const token = localStorage.getItem("a");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(authRequestInterceptor, (error) => {
  // add error handling here
  return Promise.reject(error);
});

export default axiosInstance;

export const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
