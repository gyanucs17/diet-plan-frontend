import authHeader from "./auth-header";
import * as AuthService from "./auth.service";
import apiClient from "./apiClient";
import { IFoodItem, IMainObject } from "../types/food";
let token: any = "";

const user = AuthService.getAuthenticatedUser();
if(user){
  token = user.token;
}

// Food related services
export const getAllFood = () => {
    return apiClient.get("/food/get-food-list", { headers: authHeader() });
  }
  
  export const searchFood = (query: string) => {
    return apiClient.get("/food/search-food/"+ query, { headers: authHeader() });
  }
  
  export const createFood = (foodData: IFoodItem): Promise<any> => {
    return apiClient.post('/food/add-food', foodData, { headers: authHeader() });
  };
  
  export const createFoodByCSV = async (csv: File): Promise<any> => {
    const formData = new FormData();
    formData.append('csv', csv);
    return apiClient.post('/food/upload-food-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token, // Add the token to the headers
     }
  })};
  
  export const updateFood = (foodData: IMainObject): Promise<any> => {
    return apiClient.put('/food/update-food', foodData, { headers: authHeader() });
  };