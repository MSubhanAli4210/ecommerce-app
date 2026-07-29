import { axiosInstance, axiosInstanceOfProducts, axiosInstanceOfCart } from "./instances";

export const loginApi = async (data) => {
  return await axiosInstance.post("/login", data);
};

export const registerApi = async (data) => {
  return await axiosInstance.post("/register", data);
};

export const getProductsApi = async () => {
  return await axiosInstanceOfProducts.get("/");
};

export const getCartApi = async () => {
  return await axiosInstanceOfCart.get("/");
};

export const addToCartApi = async (productId, quantity = 1) => {
  return await axiosInstanceOfCart.post("/", { productId, quantity });
};

export const removeFromCartApi = async (productId) => {
  return await axiosInstanceOfCart.delete(`/${productId}`);
};

export const clearCartApi = async () => {
  return await axiosInstanceOfCart.delete("/");
};

import { axiosInstanceOfOrders } from "./instances";

export const createOrderApi = async (shippingAddress) => {
  return await axiosInstanceOfOrders.post("/", { shippingAddress });
};

export const getMyOrdersApi = async () => {
  return await axiosInstanceOfOrders.get("/");
};