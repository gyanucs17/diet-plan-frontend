import React from 'react';
import { CategoryListProps } from './../../types/category';

const CategoryList: React.FC<CategoryListProps> = ({ category, onEdit }) => {
  return (
    category.length === 0 ? (
        <p>No data found</p> // Display a message instead of the table
    ) : (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {category.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                            <button onClick={() => onEdit(item)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ));
};

export default CategoryList;