import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    DialogTitle,
    Typography
} from '@mui/material';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { createMachine } from '../../../../API/OpenStack';
import { deleteMachine } from '../../../../API/Machine';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentScreenLoading } from '../../CreateCourse/Slices/currentScreen';
import { useState, useEffect } from 'react';

const LabContainer = ({ data, setFake, fake }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.currentCourse.isLoading);

    const createLab = async (data) => {
        dispatch(setCurrentScreenLoading(true));
        let machineDetails = await createMachine(data, navigate, dispatch);
        console.log('Machine-details', machineDetails);
    };
    const deleteLab = async (machineId) => {
        dispatch(setCurrentScreenLoading(true));
        let machineDetails = await deleteMachine(machineId, navigate, dispatch);
        setFake(!fake);
        handleClose();
        console.log('Machine-details', machineDetails);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     console.log('fake',fake)
    // },[fake])

    const MachineSpecifications = (flavourId) => {
        console.log('flavourId', flavourId);
        switch (flavourId) {
            case '1':
                return (
                    <Typography variant="body1">
                        Ram: 2 GB | Storage:28 GB | CPU: 2
                    </Typography>
                );

            case '2':
                return (
                    <Typography variant="body1">
                        Ram: 4 GB | Storage:64 GB | CPU: 4
                    </Typography>
                );

            case '3':
                return (
                    <Typography variant="body1">
                        Ram: 8 GB | Storage:128 GB | CPU: 8
                    </Typography>
                );

            default:
                break;
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {data.name.charAt(0).toUpperCase() + data?.name.slice(1)}
                </Typography>
                <Typography variant="h5">Machine Specifications:</Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                    {MachineSpecifications(data?.flavourId)}
                </Typography>

                <Typography variant="h5" sx={{ mb: 1 }}>
                    Access Password: {data.password}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => createLab(data)}
                >
                    {isLoading && <CircularProgress />}
                    Start
                </Button>
                <div>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleClickOpen}
                    >
                        Delete
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            Are you sure you want to delete this machine?
                        </DialogTitle>
                        <DialogActions>
                            <Button
                                onClick={handleClose}
                                sx={{ color: 'secondary.main' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => deleteLab(data?._id)}
                            >
                                {isLoading && <CircularProgress />}
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </CardActions>
        </Card>
    );
};

export default LabContainer;
