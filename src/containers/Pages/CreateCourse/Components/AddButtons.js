import { Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
    setCurrentScreenId,
    setCurrentScreenName,
    setCurrentScreenState,
    resetCurrentScreenForm
} from '../Slices/currentScreen';

const AddButtons = () => {
    const dispatch = useDispatch();
    const handleAdd = (name) => {
        dispatch(resetCurrentScreenForm(true));
        switch (name) {
            case 'manual':
                dispatch(setCurrentScreenName('manual'));
                dispatch(setCurrentScreenId(''));
                dispatch(setCurrentScreenState(false));
                // dispatch(resetCurrentScreenForm(false));
                break;
            case 'lesson':
                dispatch(setCurrentScreenName('lesson'));
                dispatch(setCurrentScreenId(''));
                dispatch(setCurrentScreenState(false));
                // dispatch(resetCurrentScreenForm(false));
                break;
            case 'exercise':
                dispatch(setCurrentScreenName('exercise'));
                dispatch(setCurrentScreenId(''));
                dispatch(setCurrentScreenState(false));
                // dispatch(resetCurrentScreenForm(false));
                break;
            default:
                break;
        }
    };
    return (
        <Box display="flex" mt={3} px={{ xs: 2, sm: 2, md: 0 }}>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleAdd('lesson')}
            >
                Add Lesson
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => handleAdd('exercise')}
            >
                Add Exercise
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => handleAdd('manual')}
            >
                Add Manual
            </Button>
        </Box>
    );
};

export default AddButtons;
