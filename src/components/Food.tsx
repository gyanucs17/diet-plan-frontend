import React, { useCallback,useState, useEffect } from 'react';
import FoodForm from '../components/forms/FoodForm';
import FoodList from '../components/lists/FoodList';
import Modal from '../components/modelpopup/Model';
import CsvUpload from './forms/CsvUploadFood';
import SearchForm from './forms/Search';
import { Food } from '../types/food';
import MessageBox from './messagebox/MessageBox';
import { getAllFood, createFood, updateFood, searchFood } from "../services/food.service";
import { handelResponse, handleApiError } from '../common/ApiResponseHandler';

const FoodPage: React.FC = () => {
    const [food, setFood] = useState<Food[]>([]);
    const [editingFood, setEditingFood] = useState<Food | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState<string>('');
  
    const openEditModal = (foodItem: Food | null) => {
      setMessage("");
      setEditingFood(foodItem);
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setIsEditModalOpen(false);
      fetchFood();
      setEditingFood(null);
      setError('');
    };
  
    const openCsvModal = () => {
      setIsCsvModalOpen(true);
    };
  
    const closeCsvModal = () => {
      fetchFood();
      setIsCsvModalOpen(false);
    };

    const fetchFood = async() => {
      try{
        await getAllFood().then(
          (response) => {
            if(handelResponse(response, "",setMessage))
              setFood(response.data.data);
          });
      } catch(error) {
        handleApiError(error, 'Error in fetching food data.', setMessage);
      }
    }

    useEffect(() => {
      fetchFood()
    }, []);

    const handleSubmit = async (data: Food) => {
      setMessage("");
      if (editingFood) {
        try{
          await updateFood({
            "id": data.id,
            "food": data
          }).then(
            (response) => {
              if(handelResponse(response,"Food updated successfuly", setMessage)){
                fetchFood();
              }  
            });
        } catch (error) {
          handleApiError(error, 'Unable to update food.', setMessage);
        }
      } else {
        try{
          await createFood(data).then(
            (response) => {
              if(handelResponse(response,"Food Saved successfuly", setMessage)){
                fetchFood();
              }  
            });
        } catch (error) {
          handleApiError(error, 'Unable to add food.', setMessage);
        }
      }
      closeEditModal();
    };
  
    const handleCsvUploads = () => {
      setMessage("Csv upload successfully");
    };

  
    const handleSearch = async (query: string) => {
      setLoading(true);
      try {
        setError('');
        await searchFood(query).then(
        (response) => {
            if(handelResponse(response, "",setMessage))
            setFood(response.data.data);
        });
        
      } catch {
        handleApiError(error, 'Error fetching food search data.', setMessage);
      } finally {
        setLoading(false);
      }
    };

    const handleAddFood = useCallback(() => openEditModal(null), []);
  
    return (
      <div>
        <h1>Food Management</h1>
        <div className="button-container">
          <button className="add-food-button" onClick={handleAddFood}>Add Food</button>
          <button className="upload-csv-button" onClick={openCsvModal}>Upload CSV</button>
          <SearchForm  onSearch={handleSearch} />
        </div>
        {error && <div className="error">{error}</div>}
        <MessageBox message={message} />
        {loading && <div className="loader">Loading...</div>}
        <FoodList food={food} onEdit={openEditModal} />
        {isEditModalOpen && (
          <Modal onClose={closeEditModal}>
            <FoodForm onSubmit={handleSubmit} food={editingFood} />
          </Modal>
        )}
        {isCsvModalOpen && (
          <Modal onClose={closeCsvModal}>
            <CsvUpload onUpload={handleCsvUploads} />
          </Modal>
        )}
      </div>
    );
  };
  
  export default FoodPage;