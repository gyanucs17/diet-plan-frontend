import React, { useState } from 'react';
import {  Button } from 'react-bootstrap';
import { CsvUploadProps,  NewFile} from '../../types/csvupload';
import { createFoodByCSV } from "../../services/food.service";
import { handelResponse, handleApiError } from '../../common/ApiResponseHandler';
import { Food } from '../../types/food';

   
const CsvUpload: React.FC<CsvUploadProps> = ({ onUpload }) => {
    const [newFile, setNewFile] = useState<NewFile>({ file: null });    
    const [error, setError] = useState('');
    const [notSavedCsvData, setnotSavedCsvData] = useState<Food[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0  && e.target.files[0].type === 'text/csv') {
          setNewFile({ ...newFile, file: e.target.files[0] });
        } else {
            setError('Please upload a valid CSV file');
        }
      };
    
    const uploadFile = async () => {
        if (newFile.file) {
            try{
                await createFoodByCSV(newFile.file).then(
                  (response) => {
                    if(handelResponse(response,"CSV uploaded successfully!", setError)){
                        onUpload();
                        if(response.data.NotSavedData && response.data.NotSavedData.length > 0){
                            setError("CSV Upload with Error, Unsaved data bellow!!!");
                            setnotSavedCsvData(response.data.NotSavedData);
                            console.log(notSavedCsvData);
                        }
                    }  
                  });
            } catch (error) {
                handleApiError(error, 'Error in uploading file.', setError);
            }
        }
    };  

  
    return (
        <>
            <div>
                <label >Select File:</label>
                <input type="file" accept=".csv" onChange={handleFileChange} />

                <Button variant="primary" onClick={uploadFile}>
                    Upload
                </Button>
                {error && <div className="error">{error}</div>}
            </div>
            {notSavedCsvData && notSavedCsvData.length > 0 && (
                <div className="error">
                    <div>
                        <span>Resident Name | IDDSI Level | Category</span>
                    </div>
                    {notSavedCsvData.map((food, index) => (
                        <>
                            <div key={index}>
                                <span>
                                    {food.name ? food.name : "Missing"} | 
                                    {food.iddsi_level ? food.iddsi_level : "Missing"} | 
                                    {food.category ? food.category : "Missing"}
                                </span>
                            </div>
                        </>
                        
                    ))}
                </div>
            )}
        </>
    )};
  
  export default CsvUpload;