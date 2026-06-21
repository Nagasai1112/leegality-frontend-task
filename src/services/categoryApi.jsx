import axiosInstance from "./axiosInstance";

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get("/products/categories");
  return data; 
};