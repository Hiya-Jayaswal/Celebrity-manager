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

interface CelebrityItemProps {
  celebrity: Celebrity;
}

const CelebrityItem: React.FC<CelebrityItemProps> = ({ celebrity }) => {
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
      <div className="celebrity-header" onClick={handleToggle}>
        <Avatar src={celebrity.picture} alt={`${celebrity.first} ${celebrity.last}`} />
        <Typography sx={{ ml: 2 }}>{`${celebrity.first} ${celebrity.last}`}</Typography>
        <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      <div className="celebrity-details">
        <div className="celebrity-content">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Age: {calculateAge(celebrity.dob)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Gender: {celebrity.gender}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Country: {celebrity.country}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Description: {celebrity.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
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
          </Grid>
        </div>
      </div>

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

export default CelebrityItem;
