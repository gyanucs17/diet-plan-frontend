// src/components/FoodTable.tsx
import React from 'react';
import { FoodTableProps } from './../../types/food'


const FoodTable: React.FC<FoodTableProps> = ({ assignedFoodList, unAssignedFoodList, onAssign, onUnAssign }) => {
    return (
        <>
            <div className='top'>
                <h2>Diet plan for selected Resident</h2>
                {assignedFoodList.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Food Name</th>
                                <th>Category</th>
                                <th>IDDSI Level</th>
                                <th>Assign</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedFoodList.map((food) => (
                                food.assigned ? (  
                                    <tr key={food.id}>
                                        <td>{food.id}</td>
                                        <td>{food.name}</td>
                                        <td>{food.categoryName}</td>
                                        <td>{food.iddsiLevelName}</td>
                                        <td>
                                            {food.assigned && (
                                                <button onClick={() => onUnAssign(food.id)}>UnAssign</button>
                                            )}
                                        </td>
                                    </tr>
                                ) : null 
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No food items found.</p>
                )}
            </div>
            <div className='bottom'>
                <h2>Food List</h2>
                {unAssignedFoodList.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Food Name</th>
                                <th>Category</th>
                                <th>IDDSI Level</th>
                                <th>Assign</th>
                            </tr>
                        </thead>
                        <tbody>
                             {unAssignedFoodList.map((food) => (
                                !food.assigned ? (  
                                    <tr key={food.id}>
                                        <td>{food.id}</td>
                                        <td>{food.name}</td>
                                        <td>{food.categoryName}</td>
                                        <td>{food.iddsiLevelName}</td>
                                        <td>
                                            {!food.assigned && (
                                                <button onClick={() => onAssign(food.id)}>Assign</button>
                                            )}
                                        </td>
                                    </tr>
                                ) : null 
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No food items found.</p>
                )}
            </div>
        </>
        
    );
};

export default FoodTable;
