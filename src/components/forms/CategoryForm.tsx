import React, { useState, useEffect } from 'react';
import { CategoryFormProps } from './../../types/category';

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, category }) => {
  const [name, setName] = useState('');


  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName('');
    }
  }, [category]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      onSubmit({ id: category ? category.id : Date.now(), name });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  
  const addEditText = category ? 'Edit' : 'Add';
  return (
    <>
        <div>
            <h1>{addEditText} Food Category</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <button type="submit">{addEditText} Food Category</button>
        </form>
    </>
    
  );
};

export default CategoryForm;