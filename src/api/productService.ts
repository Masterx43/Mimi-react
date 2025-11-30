import { api } from "./axiosClient";
import { API_PRODUCTS } from "../config/api";
import type { Product } from "../interfaces/Product";

// GET all products
export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get(`${API_PRODUCTS}/products`);
  return res.data;
};

// GET product by ID
export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get(`${API_PRODUCTS}/products/${id}`);
  return res.data;
};

// CREATE product
export const createProduct = async (payload: {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoriaId: number;
}): Promise<Product> => {
  const res = await api.post(`${API_PRODUCTS}/products`, payload);
  return res.data;
};

// UPDATE product
export const updateProduct = async (
  id: number,
  payload: Partial<Product>
): Promise<Product> => {
  const res = await api.put(`${API_PRODUCTS}/products/${id}`, payload);
  return res.data;
};

// DELETE product
export const deleteProduct = async (id: number) => {
  return api.delete(`${API_PRODUCTS}/products/${id}`);
};
