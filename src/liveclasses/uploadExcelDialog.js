import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import excelImg from '../assets/images/Screenshot 2023-04-29 233647.png';
import jwtDecode from 'jwt-decode';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Apiconfig, { url } from '../config/ApiConfig';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

export default function UploadExcelDialog({ setReload, reload }) {
    const [files, setFile] = React.useState();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setReload(!reload);
        setOpen(false);
    };

    const editProfilephoto = async () => {
        console.log(files[0]);
        const formData = new FormData();
        console.log('excelfile', files[0]);
        formData.append('file', files[0]);

        console.log('data', formData);
        const token = localStorage.getItem('token');
        let response = await Axios.post(`${url}/live/uploadfile`, formData, {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response) {
            toast.success('File has been uploaded successfully');
        }
    };

    return (
        <div>
            <ToastContainer />
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
            >
                Upload Excel
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    Upload Excel File
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <img src={excelImg} />
                    <Typography>
                        1)File should be uploaded in this format.
                    </Typography>
                    <Typography>
                        2)Header should be set as been mentioned in the picture.
                    </Typography>
                    <Typography>3)No field should be empty.</Typography>
                    <input
                        type="file"
                        id="inputGroupFile01"
                        onChange={(e) => setFile(e.target.files)}
                    />
                    <Button
                        onClick={editProfilephoto}
                        variant="contained"
                        color="secondary"
                    >
                        upload
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
