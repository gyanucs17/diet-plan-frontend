import React, { useCallback,useState, useEffect } from 'react';
import CategoryForm from '../components/forms/CategoryForm';
import CategoryList from '../components/lists/CategoryList';
import Modal from '../components/modelpopup/Model';
import { Category } from '../types/category';
import MessageBox from './messagebox/MessageBox';
import { getAllCategory, addCategory, updateCategory } from "../services/category.service";
import { handelResponse, handleApiError } from '../common/ApiResponseHandler';
import * as AuthService from "../services/auth.service";

const CategoryPage: React.FC = () => {
    const [category, setCategory] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState<string>('');
    const userData = AuthService.getAuthenticatedUser();
  
    const openEditModal = (categoryItem: Category | null) => {
      setMessage("");
      setEditingCategory(categoryItem);
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setIsEditModalOpen(false);
      fetchCategory();
      setEditingCategory(null);
      setError('');
    };

    const fetchCategory = useCallback(async() => {
      try{
        setLoading(true);
        await getAllCategory().then(
          (response) => {
            if(handelResponse(response, "", setMessage))
              setCategory(response.data.data);
              if(userData){
                  userData['category'] = response.data.data;
                  localStorage.setItem('user', JSON.stringify(userData));
              }
              setLoading(false);
          },
          (error: any) => {
            handleApiError(error, 'Error in fetching category data.', setMessage);
        });
      } catch(error) {
        handleApiError(error, 'Error in fetching category data.', setMessage);
      }
    }, [userData]);  

    useEffect(() => {
      fetchCategory()
    }, [fetchCategory]);
    const handleSubmit = async (data: Category) => {
      setMessage("");
      if (editingCategory) {
        try{
          await updateCategory({
            "id": data.id,
            "category": data
          }).then(
            (response) => {
              if(handelResponse(response,"Category updated successfuly", setMessage)){
                fetchCategory();
              }  
            });
        } catch (error) {
          handleApiError(error, 'Unable to update category.', setMessage);
        }
      } else {
        try{
          await addCategory(data).then(
            (response) => {
              if(handelResponse(response,"category Saved successfuly", setMessage)){
                fetchCategory();
              }  
            });
        } catch (error) {
          handleApiError(error, 'Unable to add Category.', setMessage);
        }
      }
      closeEditModal();
    };
 
    const handleAddCategory = useCallback(() => openEditModal(null), []);
  
    return (
      <div>
        <h1>Food Category Management</h1>
        <div className="button-container">
          <button className="add-food-button" onClick={handleAddCategory}>Add Category</button>
        </div>
        {error && <div className="error">{error}</div>}
        <MessageBox message={message} />
        {loading && <div className="loader">Loading...</div>}
        <CategoryList category={category} onEdit={openEditModal} />
        {isEditModalOpen && (
          <Modal onClose={closeEditModal}>
            <CategoryForm onSubmit={handleSubmit} category={editingCategory} />
          </Modal>
        )}
      </div>
    );
  };
  
  export default CategoryPage;