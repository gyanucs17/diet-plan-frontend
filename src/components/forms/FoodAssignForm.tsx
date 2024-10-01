import React, { useEffect, useState } from 'react';
import { getAllResident } from "./../../services/resident.service";
import { Resident, ResidentSelectProps } from  "./../../types/resident";

const FoodSelect: React.FC<ResidentSelectProps> = ({ onChange }) => {
    const [residentOptions, setResidentOptions] = useState<Resident[]>([]);
    const [selectedResident, setSelectedResident] = useState<string>('');

    useEffect(() => {
        const fetchFoodOptions = async () => {
            try {
                const response = await getAllResident(); 
                if(response.data.status === "success"){
                    setResidentOptions(response.data.data);
                }
                
            } catch (error) {
                console.error('Error fetching food options', error);
            }
        };
        fetchFoodOptions();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const residentId = event.target.value;
        setSelectedResident(residentId);
        onChange(residentId);
    };

    return (
        <div>
            <label htmlFor="food-select">Select Resident:</label>
            <select id="food-select" value={selectedResident} onChange={handleChange}>
                <option value="">-- Select Resident --</option>
                {residentOptions.map((resident) => (
                    <option key={resident.id} value={resident.id}>{resident.name}</option>
                ))}
            </select>
        </div>
    );
};

export default FoodSelect;
