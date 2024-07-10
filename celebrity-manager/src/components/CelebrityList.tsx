// src/components/CelebrityList.tsx
import React, { useState } from 'react';
import { Celebrity } from '../types/celebrity';

interface CelebrityListProps {
  celebrities: Celebrity[];
}

const CelebrityItem: React.FC<{ celebrity: Celebrity }> = ({ celebrity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedCelebrity, setEditedCelebrity] = useState(celebrity);
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={`celebrity-item ${isOpen ? 'open' : ''}`}>
      <div className="celebrity-header" onClick={() => setIsOpen(!isOpen)}>
        <img src={celebrity.picture} alt="" />
        <h2 className="celebrity-name">{celebrity.first} {celebrity.last}</h2>
        <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      <div className="celebrity-details">
        <div className="celebrity-content">
          <div className="celebrity-info">
            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{calculateAge(celebrity.dob)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{celebrity.gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Country</span>
              <span className="info-value">{celebrity.country}</span>
            </div>
          </div>
          <div className="celebrity-description">
           <p><strong>Description:</strong><br/>{celebrity.description}</p>
          </div>
          <div className = "button">
            <button className='btn1'>🖋</button>
            <button className='btn2'>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CelebrityList: React.FC<CelebrityListProps> = ({ celebrities }) => {
  return (
    <div className="celebrity-list">
      {celebrities.map((celebrity) => (
        <CelebrityItem key={celebrity.id} celebrity={celebrity} />
      ))}
    </div>
  );
};

// Helper function to calculate age
function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default CelebrityList;