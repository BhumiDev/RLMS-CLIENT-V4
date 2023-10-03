import { useState } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';

const InputDialog = ({ open, title, handleSubmit, label, courseId }) => {
    const [field, setField] = useState();
    const handleChange = (e) => {
        setField(e.target.value);
    };
    return (
        <Dialog open={open} disableEscapeKeyDown>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="field"
                    label={label}
                    onChange={handleChange}
                    type="email"
                    fullWidth
                    variant="standard"
                    df
                    b
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => handleSubmit(courseId, field)}
                >
                    submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

InputDialog.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    courseId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default InputDialog;
