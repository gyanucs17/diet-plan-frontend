import authHeader from "./auth-header";
import apiClient from "./apiClient";
import { ICategory, ICategoryObject } from "../types/category";


//-------------------------------- Category related services----------------------------------

//Create Category
export const addCategory = (categoryData: ICategory): Promise<any> => {
    return apiClient.post('/category/add-category', categoryData, { headers: authHeader() });
  }
  // Edit Category
  export const updateCategory = (categoryData: ICategoryObject): Promise<any> => {
    return apiClient.put('/category/update-category', categoryData, { headers: authHeader() });
  }
  // Get all Category
  export const getAllCategory = () => {
    return apiClient.get("/category/get-all-category", { headers: authHeader() });
  }