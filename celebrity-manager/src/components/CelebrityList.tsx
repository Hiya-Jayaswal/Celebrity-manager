// src/components/CelebrityList.tsx
import React, { useState } from 'react';
import { Celebrity } from '../types/celebrity';
import {
  IconButton,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CelebrityListProps {
  celebrities: Celebrity[];
}

const CelebrityItem: React.FC<{ celebrity: Celebrity }> = ({ celebrity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedCelebrity, setEditedCelebrity] = useState(celebrity);

const handleToggle = () => {
  setIsOpen(!isOpen);
};

const handleEdit = () => {
  setIsEditing(true);
};

const handleSave = () => {

  setIsEditing(false);
};

const handleCancel = () => {
  setEditedCelebrity(celebrity);
  setIsEditing(false);
};

const handleDelete = () => {
  setIsDeleteDialogOpen(true);
};

const handleConfirmDelete = () => {
 
  setIsDeleteDialogOpen(false);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setEditedCelebrity((prev) => ({ ...prev, [name]: value }));
};

  return (
    <div className={`celebrity-item ${isOpen ? 'open' : ''}`}>
      <div className="celebrity-header" onClick={() => setIsOpen(!isOpen)}>
        <img src={celebrity.picture} alt="" />
        <h2 className="celebrity-name">{celebrity.first} {celebrity.last}</h2>
        <span className="dropdown-icon">{isOpen ? '' : '▼'}</span>
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
            <button className='btn1' onClick={handleEdit}>🖋</button>
            <button className='btn2' onClick={handleDelete}>🗑️</button>
          </div>
        </div>
      </div>
      {isEditing && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={editedCelebrity.dob}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={editedCelebrity.gender}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={editedCelebrity.country}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={editedCelebrity.description}
                  onChange={handleChange}
                />
                <Button onClick={handleCancel} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </Grid>
            )}
    <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <Typography>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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