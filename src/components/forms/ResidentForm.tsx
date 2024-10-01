import React, { useState, useEffect } from 'react';
import { ResidentFormProps } from './../../types/resident';
import * as AuthService from "./../../services/auth.service";


const ResidentForm: React.FC<ResidentFormProps> = ({ onSubmit, resident }) => {
  const [name, setName] = useState('');
  const [iddsi_level, setIddsiLevel] = useState<number | ''>('');
  const [iddsiLevels, setIddsiLevels] = useState<{ id: number; name: string }[]>([]);
  
  useEffect(() => {
    const user = AuthService.getAuthenticatedUser();
    if (user) {
        setIddsiLevels(user.iddsilevel); // Parse the string back into an array
    }
    console.log(user.iddsilevel);
  
  }, []);
  

  useEffect(() => {
    if (resident) {
      setName(resident.name);
      setIddsiLevel(resident.iddsi_level);
    } else {
      setName('');
      setIddsiLevel('');
    }
  }, [resident]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIddsiLevel(Number(iddsi_level));
    if (typeof iddsi_level === 'number' && iddsi_level >= 0 && iddsi_level <= 8) {
      onSubmit({ id: resident ? resident.id : Date.now(), name, iddsi_level });
    }
  };
  
  const handleIddsiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIddsiLevel(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addEditText = resident ? 'Edit' : 'Add';
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
           
           <select value={iddsi_level ?? ''} 
           onChange={handleIddsiChange}
           >
                <option value="" disabled>--Select an IDDSI level--</option>
                {iddsiLevels.map(level => (
                    <option key={level.id} value={level.id}>
                        {level.id} - {level.name}
                    </option>
                ))}
            </select>
            <button type="submit">{addEditText} Resident</button>
        </form>
    </>
    
  );
};

export default ResidentForm;