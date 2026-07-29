import axios from "axios";
import { serverUrl } from "./config";

export const axiosInstance = axios.create({
  baseURL: `${serverUrl}/auth`,
});

export const axiosInstanceOfProducts = axios.create({
  baseURL: `${serverUrl}/products`,
});

export const axiosInstanceOfCart = axios.create({
  baseURL: `${serverUrl}/cart`,
});

axiosInstanceOfCart.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const axiosInstanceOfOrders = axios.create({
  baseURL: `${serverUrl}/orders`,
});

axiosInstanceOfOrders.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});