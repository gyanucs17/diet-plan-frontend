import authHeader from "./auth-header";
import * as AuthService from "./auth.service";
import apiClient from "./apiClient";
import { IHomeItem, IHomeObject } from "../types/resident";
let token: any = "";

const user = AuthService.getAuthenticatedUser();
if(user){
  token = user.token;
}

//---------------------------- Resident related services----------------------------------

export const createResident = async (item: IHomeItem): Promise<void> => {
    return apiClient.post('/resident/add-resident', item, { headers: authHeader() });
  };
  
  export const createResidentByCSV = async (csv: File): Promise<any> => {
    const formData = new FormData();
    formData.append('csv', csv);
    return apiClient.post('/resident/upload-resident-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token, 
     }
  })};
  
  export const updateResident = (item: IHomeObject): Promise<any> => {
    return apiClient.put('/resident/update-resident', item, { headers: authHeader() });
  };
  
  export const searchResident = (query: string) => {
    return apiClient.get("/resident/search-resident/"+ query, { headers: authHeader() });
  }
  export const getAllResident = () => {
    return apiClient.get("/resident/get-resident-list", { headers: authHeader() });
  };
  