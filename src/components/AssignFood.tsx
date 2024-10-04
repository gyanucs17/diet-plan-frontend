import React, { useState } from 'react';
import FoodSelect from './forms/FoodAssignForm';
import FoodTable from './lists/AssignFoodList';
import MessageBox from './messagebox/MessageBox';
import { AssignedFood }  from './../types/food';
import SearchForm from './forms/Search';
import {  assignFood, getFoodByIddsiLevel, unAssignFood, searchDietFood } from "../services/assignfood.service";
import { handelResponse, handleApiError } from '../common/ApiResponseHandler';

const AssignFood: React.FC = () => {
    const [selectedResident, setSelectedResident] = useState<string>('0');
    const [assignedFoodList, setAssignedFoodList] = useState<AssignedFood[]>([]);
    const [unAssignedFoodList, setUnAssognedFoodList] = useState<AssignedFood[]>([]);
    const [message, setMessage] = useState<string>('');

    const handleSelectChange = async (residentdName: string) => {
        try{
            setMessage("");
            setAssignedFoodList([]);
            setUnAssognedFoodList([]);
            await getFoodByIddsiLevel(residentdName).then(
            (response) => {
                if(handelResponse(response, "",setMessage)){
                    if(response.data.data.assigned){
                        setAssignedFoodList(response.data.data.assigned);
                    } 

                    if(response.data.data.unAssigned){
                        setUnAssognedFoodList(response.data.data.unAssigned);
                    }

                }
                    
            });
            setSelectedResident(residentdName);
        } catch (error) {
            handleApiError(error, 'No food available as per residents IDDSI Level', setMessage);
        }
    };

    const handleAssign = async (id: number) => {
        try {
            setMessage("");
            assignFood({
                'resident_id' : selectedResident, 
                'food_id' : id})
                .then
                ((response) => {
                    if(handelResponse(response,"Food assign Successfully", setMessage)){
                        handleSelectChange(selectedResident);
                    }  
                },
                (error: any) => {
                    handleApiError(error, 'Error in assigning food', setMessage);
                });
        } catch (error) {
            handleApiError(error, 'Error in assigning food', setMessage);
        }
    };

    const handelUnAssign = async (id: number) => {
        try {
            setMessage("");
            unAssignFood({
                'resident_id' : selectedResident, 
                'food_id' : id})
                .then
                ((response) => {
                    if(handelResponse(response,"Food unAssign Successfully", setMessage)){
                        handleSelectChange(selectedResident);
                    }  
                },
                (error: any) => {
                    handleApiError(error, 'Error in unassigning food', setMessage);
                });
        } catch (error) {
            handleApiError(error, 'Error in unassigning food', setMessage);
        }
    };

    const handleSearch = async (query: string) => {
        try {
          setMessage('');
          setUnAssognedFoodList([]);
          if(selectedResident === '0'){
            setMessage('Select resident first');
            return;
          }
          searchDietFood(query, selectedResident).then(
          (response) => {
            if(response.data.data.unAssigned){
                setUnAssognedFoodList(response.data.data.unAssigned);
            }
          },
          (error: any) => {
            handleApiError(error, 'Error fetching data.', setMessage);
          });
          
        } catch(error) {
            handleApiError(error, 'Error fetching data.', setMessage);
        } 
      };


    return (
        <div>
            <h1>Assign Food To Home Resident</h1>
            <div className="button-container">
                <FoodSelect onChange={handleSelectChange} />
                <SearchForm  onSearch={handleSearch} />
            </div>
            
            <MessageBox message={message} />
            <FoodTable assignedFoodList={assignedFoodList} unAssignedFoodList = {unAssignedFoodList} onAssign={handleAssign} onUnAssign = {handelUnAssign} />
        </div>
    );
};

export default AssignFood;
