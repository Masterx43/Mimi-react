import { api } from "./axiosClient";
import { API_PRODUCTS } from "../config/api";

export const getProducts = async () => {
  const response = await api.get(`${API_PRODUCTS}/productos`);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get(`${API_PRODUCTS}/productos/${id}`);
  return response.data;
};
