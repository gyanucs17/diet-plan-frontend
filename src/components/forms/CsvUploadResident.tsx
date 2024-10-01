import React, { useState } from 'react';
import {  Button } from 'react-bootstrap';
import { CsvUploadProps,  NewFile} from './../../types/csvupload';
import { createResidentByCSV } from "../../services/resident.service";
import { handelResponse, handleApiError } from '../../common/ApiResponseHandler';
import { Resident } from '../../types/resident';
   
const CsvUpload: React.FC<CsvUploadProps> = ({ onUpload }) => {
    const [newFile, setNewFile] = useState<NewFile>({ file: null });    
    const [error, setError] = useState('');
    const [notSavedCsvData, setnotSavedCsvData] = useState<Resident[]>([]);
    

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
                await createResidentByCSV(newFile.file).then(
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
                <input type="file" accept=".csv" onChange={handleFileChange} />

                <Button variant="primary" onClick={uploadFile}>
                    Upload
                </Button>
                {error && <div className="error">{error}</div>}
            </div>
            {notSavedCsvData && notSavedCsvData.length > 0 && (
                <div className="error">
                    <div>
                        <span>Resident Name | IDDSI Level</span>
                    </div>
                    {notSavedCsvData.map((resident, index) => (
                        <div key={index}>
                            <span>
                                {resident.name ? resident.name : "Missing"} | 
                                {resident.iddsi_level ? resident.iddsi_level : "Missing"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </>
        
        );
    };
  
  export default CsvUpload;