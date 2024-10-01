import React from 'react';
import { FoodListProps } from './../../types/food';

const FoodList: React.FC<FoodListProps> = ({ food, onEdit }) => {
  return (
    food.length === 0 ? (
        <p>No data found</p> // Display a message instead of the table
    ) : (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>IDDSI Level</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {food.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.iddsiLevelName}</td>
                        <td>
                            <button onClick={() => onEdit(item)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ));
};


export default FoodList;
