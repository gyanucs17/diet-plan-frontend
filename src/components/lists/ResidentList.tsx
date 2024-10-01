import React from 'react';
import { ResidentListProps } from './../../types/resident';

const ResidentList: React.FC<ResidentListProps> = ({ resident, onEdit }) => {

  return (
      resident.length === 0 ? (
          <p>No data found</p> // Display a message when there's no data
      ) : (
          <table>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>IDDSI Level</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {resident.map((item, index) => (
                      <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.iddsiLevelName}</td>
                          <td>
                              <button onClick={() => onEdit(item)}>Edit</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
        )
    );
};

export default ResidentList;
