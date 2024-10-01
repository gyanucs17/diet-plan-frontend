import React, { useState, useCallback, useEffect } from 'react';
import ResidentForm from './forms/ResidentForm';
import ResidentList from './lists/ResidentList';
import Modal from './modelpopup/Model';
import CsvUpload from './forms/CsvUploadResident';
import SearchForm from './forms/Search';
import { Resident } from '../types/resident';
import MessageBox from './messagebox/MessageBox';
import { getAllResident, createResident, updateResident, searchResident } from "../services/resident.service";
import { handelResponse, handleApiError } from '../common/ApiResponseHandler';


const FoodPage: React.FC = () => {
    const [Resident, setResident] = useState<Resident[]>([]);
    const [editingResident, setEditingResident] = useState<Resident | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState<string>('');
    
  
    const openEditModal = (resident: Resident | null) => {
      setMessage("");
      setEditingResident(resident);
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setIsEditModalOpen(false);
      setEditingResident(null);
      fetchResident();
    };
  
    const openCsvModal = () => {
      setIsCsvModalOpen(true);
    };
  
    const closeCsvModal = () => {
      fetchResident();
      setIsCsvModalOpen(false);
    };
    const fetchResident = () => {
      try {
        getAllResident().then(
          (response) => {
            if(handelResponse(response, "",setMessage))
              setResident(response.data.data);
          }
        );
        } catch(error) {
          handleApiError(error, 'Error in fetching resident data.', setMessage);
        }
      }
      useEffect(() => {
        fetchResident()
      }, []);
      const handleSubmit = async (data: Resident) => {
        if (editingResident) {
          try{
            await updateResident({
              "id": data.id,
              "resident": data
            }).then(
              (response) => {
                if(handelResponse(response,"Nursing Home Resident Updated successfuly", setMessage)){
                  fetchResident();
                }  
              });
          } catch (error) {
            handleApiError(error, 'Error in updating resident data.', setMessage);
          }
        } else {
            try {
              await createResident(data).then(
                (response) => {
                  if(handelResponse(response,"Nursing Home Resident Saved successfuly", setMessage)){
                    fetchResident();
                  }  
                });
            } catch (error) {
              handleApiError(error, 'Error in saving resident data.', setMessage);
            }
        }
        closeEditModal();
    };
  
    const handleCsvUploads = () => {
        setMessage("Csv upload successfully");
    };

  
    const handleSearch = async (query: string) => {
      setLoading(true);
      setMessage("");
      try {
        setError('');
        searchResident(query).then(
        (response) => {
          if(handelResponse(response, "",setMessage))
              setResident(response.data.data);
        });
        
      } catch {
        handleApiError(error, 'Error in fetching resident data.', setMessage);
      } finally {
        setLoading(false);
      }
    };

    const handleAddResident = useCallback(() => openEditModal(null), []);
  
    return (
      <div>
        <h1>Nursing Home Resident Management</h1>
        <div className="button-container">
          <button className="add-food-button" onClick={handleAddResident}>Add Resident</button>
          <button className="upload-csv-button" onClick={openCsvModal}>Upload CSV</button>
          <SearchForm  onSearch={handleSearch} />
        </div>
        {error && <div className="error">{error}</div>}
        <MessageBox message={message} />
        {loading && <div className="loader">Loading...</div>}
        <ResidentList resident={Resident} onEdit={openEditModal} />
        {isEditModalOpen && (
          <Modal onClose={closeEditModal}>
            <ResidentForm onSubmit={handleSubmit} resident={editingResident} />
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