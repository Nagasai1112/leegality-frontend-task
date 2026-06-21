import axiosInstance from "./axiosInstance";

export const getAllProducts = async (page = 1, pageSize = 8) => {
  const skip = (page - 1) * pageSize;
  const { data } = await axiosInstance.get("/products", {
    params: { limit: pageSize, skip },
  });
  return data; 
};


export const searchProducts = async (query, page = 1, pageSize = 8) => {
  const skip = (page - 1) * pageSize;
  const { data } = await axiosInstance.get("/products/search", {
    params: { q: query, limit: pageSize, skip },
  });
  return data;
};


export const getProductsByCategory = async (category, page = 1, pageSize = 8) => {
  const skip = (page - 1) * pageSize;
  const { data } = await axiosInstance.get(`/products/category/${category}`, {
    params: { limit: pageSize, skip },
  });
  return data;
};


export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};