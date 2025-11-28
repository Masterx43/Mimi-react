import { api } from "./axiosClient";
import { API_PRODUCTS } from "../config/api";

// GET all products
export const getProducts = async () => {
  const response = await api.get(`${API_PRODUCTS}/products`);
  return response.data;
};

// GET product by ID
export const getProductById = async (id: number) => {
  const response = await api.get(`${API_PRODUCTS}/products/${id}`);
  return response.data;
};
