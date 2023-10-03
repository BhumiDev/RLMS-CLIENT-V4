import { Delete } from '@mui/icons-material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import React from 'react';

export const Dialogue = ({ open, handleClose, name, handleDelete }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Delete ${name}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete this {name} permanently?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    onClick={handleClose}
                    color="secondary"
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={handleDelete}
                    autoFocus
                >
                    Delete
                    <Delete />
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Dialogue;
