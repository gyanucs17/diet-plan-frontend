import React, { useState, useEffect } from 'react';
import { FoodFormProps } from './../../types/food';
import * as AuthService from "./../../services/auth.service";


const FoodForm: React.FC<FoodFormProps> = ({ onSubmit, food }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('1');
  const [iddsi_level, setIddsiLevel] = useState<number | ''>('');
  const [iddsiLevels, setIddsiLevels] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    if (food) {
      setName(food.name);
      setCategory(food.category);
      setIddsiLevel(food.iddsi_level);
    } else {
      setName('');
      setCategory('Chicken');
      setIddsiLevel('');
    }
  }, [food]);

  useEffect(() => {
    const user = AuthService.getAuthenticatedUser();
    if (user) {
        setIddsiLevels(user.iddsilevel);
        setCategories(user.category);
    }
    console.log(user.iddsilevel);
  
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIddsiLevel(Number(iddsi_level));
    if (typeof iddsi_level === 'number' && iddsi_level >= 0 && iddsi_level <= 8) {
      onSubmit({ id: food ? food.id : Date.now(), name, category, iddsi_level });
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value as any);
  };

  const handleIddsiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIddsiLevel(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  
  const addEditText = food ? 'Edit' : 'Add';
  return (
    <>
         <div>
            <h1>{addEditText} Resident</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <select value={category} onChange={handleCategoryChange}>
            <option value="0">--Select food Category--</option>
            {categories.map(level => (
                <option key={level.id} value={level.id}>
                    {level.name}
                </option>
            ))}
          </select>
          <select value={iddsi_level ?? ''} 
           onChange={handleIddsiChange}
           >
              <option value="" disabled>--Select an IDDSI level--</option>
              {iddsiLevels.map(level => (
                  <option key={level.id} value={level.id}>
                      {level.id}-{level.name}
                  </option>
              ))}
            </select>
          <button type="submit">{addEditText} Food</button>
        </form>
    </>
    
  );
};

export default FoodForm;