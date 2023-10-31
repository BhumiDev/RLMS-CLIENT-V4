import { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { getIndividalSection } from '../../../../API/Section';
import {
    createManual,
    deleteManual,
    editManualApi
} from '../../../../API/Lesson';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialogue from '../Components/Dialogue';
import {
    resetCurrentScreenForm,
    setCurrentScreenLoading
} from '../Slices/currentScreen';
import { store } from '../../../../store';

const Manual = () => {
    const loader = useSelector((state) => state?.currentScreen?.isLoading);
    console.log('loader', loader);
    const [manualValue, setManual] = useState('');
    const [open, setOpen] = useState();
    const [manualError, setManualError] = useState({
        isError: false,
        message: ''
    });
    const editManual = useSelector((state) => state?.currentScreen?.editable);
    const shouldResetManual = useSelector(
        (state) => state?.currentScreen?.resetForm
    );
    const sectionId = useSelector((state) => state?.currentScreen?.id);
    const courseId = useSelector((state) => state?.currentCourse?.data?._id);
    const dispatch = useDispatch();
    const handleManual = (e) => {
        e.target.value === ''
            ? setManualError({
                  isError: true,
                  message: 'Manual Title is required'
              })
            : setManualError({
                  isError: false,
                  message: ''
              });
        setManual(e.target.value.replace(/^\s+/, ''));
    };
    const handleDeleteManual = async () => {
        await deleteManual(sectionId, dispatch);
        setOpen(false);
    };

    const submitManual = async (e) => {
        console.log('CourseId in redux', courseId);
        if (manualValue === '' || !manualValue) {
            setManualError({
                isError: true,
                message: 'Manual Title is required'
            });
        } else {
            editManual
                ? await editManualApi(sectionId, manualValue, dispatch)
                : await createManual(courseId, manualValue, dispatch);
            dispatch(resetCurrentScreenForm(false));
            toast.success('Manual created successfully');
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (editManual) {
            getIndividalSection(sectionId).then((response) =>
                setManual(response)
            );
        }
    }, [sectionId]);

    useEffect(() => {
        shouldResetManual && setManual('');
    }, [shouldResetManual]);

    return (
        <>
            {loader ? (
                <Box
                    textAlign="center"
                    height="40vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box display="flex" mx={{ sm: 2, xs: 2 }}>
                    <TextField
                        label="Add Manual"
                        name="manual"
                        // size="small"
                        value={manualValue}
                        sx={{ width: '70%', mr: 2 }}
                        variant="outlined"
                        onChange={handleManual}
                        error={Boolean(manualError.isError)}
                        helperText={manualError.isError && manualError.message}
                    />
                    <Button
                        onClick={(e) => submitManual(e)}
                        variant="outlined"
                        color="secondary"
                    >
                        {editManual ? 'Edit' : 'Add'}
                    </Button>
                    {editManual && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClickOpen}
                            sx={{ ml: 2 }}
                        >
                            Delete
                            <DeleteIcon />
                        </Button>
                    )}

                    <Dialogue
                        open={open}
                        handleClose={handleClose}
                        name="Manual"
                        handleDelete={handleDeleteManual}
                    />
                </Box>
            )}
        </>
    );
};

export default Manual;
