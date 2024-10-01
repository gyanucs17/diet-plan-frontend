import authHeader from "./auth-header";
import apiClient from "./apiClient";
import { IAssignFood } from "../types/food";


//------------------------------------Assign food related services-----------------------

export const assignFood = (foodData: IAssignFood): Promise<any> => {
    return apiClient.post('/diet/assign-food', foodData, { headers: authHeader() });
  }
  //Food unassign to resident
  export const unAssignFood = (foodData: IAssignFood): Promise<any> => {
    return apiClient.post('/diet/unassign-food', foodData, { headers: authHeader() });
  }
  // Search diet food
  export const searchDietFood = (query: string, residentId: string) => {
    return apiClient.get("/diet/search-diet-food/"+ query +"/"+ residentId, { headers: authHeader() });
  }
  // Food list
  export const getFoodByIddsiLevel = (residentId: string) => {
    return apiClient.get("/food/get-resident-food-list/"+ residentId, { headers: authHeader() });
  }