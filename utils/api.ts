import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

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

function authErrorInterceptor(error: any) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("a");
      localStorage.removeItem("r");
      window.location.href = "/login";
    }
    return Promise.reject<any>(error);
}

axiosInstance.interceptors.response.use((response) => response, authErrorInterceptor)

export default axiosInstance;

export const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
