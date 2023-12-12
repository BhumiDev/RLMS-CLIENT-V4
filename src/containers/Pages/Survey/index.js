import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Slide from '@mui/material/Slide';
import { getSurvey, submitSurvey } from '../../../API/Course';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './index.css';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Survey = () => {
    const [open, setOpen] = useState(true);
    const [data, setData] = useState([]);
    const [value, setValue] = useState({});

    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);

    const handleChange = (questionId, event, id, index) => {
        const { value: selectedValue } = event.target;

        console.log('selectedvalue', selectedValue);

        setValue((prevValues) => ({
            ...prevValues,
            [questionId]: {
                // question: id,
                option: Number(selectedValue),
                questionNumber: index + 1,
                user: user?._id
            }
        }));
    };

    console.log('value', value);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getSurveys();
    }, []);

    const getSurveys = async () => {
        const res = await getSurvey();
        console.log('res of getSurvey', res);
        if (res.length > 0) {
            setData(res);
        }
    };

    console.log('survey data', data);

    const handleSubmit = async () => {
        const dataArr = [];
        Object.entries(value).map(([key, value]) => {
            console.log('value in obj', value);
            dataArr.push(value);
        });

        if (dataArr.length !== data[0]?.questions?.length) {
            toast.error('Please submit all the answers');
        } else {
            const submitData = {
                answers: dataArr
            };
            console.log('formdata', submitData);
            const res = await submitSurvey(submitData.answers, data[0]?._id);
            console.log('res of submitAnswer', res);
            setOpen(false);
        }
    };

    return (
        <div>
            {data?.length > 0 && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth
                    TransitionComponent={Transition}
                    keepMounted
                >
                    <DialogTitle>Survey</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h5">
                                    {data[0]?.title}
                                </Typography>
                            </Box>
                            <Box>
                                {data[0]?.questions?.map((question, i) => (
                                    <>
                                        <Typography>
                                            {i + 1}. {question?.question}
                                        </Typography>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name={`question${i}`}
                                                value={
                                                    value[`question${i}`]
                                                        ?.option || ''
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        `question${i}`,
                                                        e,
                                                        question?._id,
                                                        i
                                                    )
                                                }
                                            >
                                                <FormControlLabel
                                                    value={1}
                                                    control={<Radio />}
                                                    label={
                                                        question.options.option1
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={2}
                                                    control={<Radio />}
                                                    label={
                                                        question.options.option2
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={3}
                                                    control={<Radio />}
                                                    label={
                                                        question.options.option3
                                                    }
                                                />
                                                <FormControlLabel
                                                    value={4}
                                                    control={<Radio />}
                                                    label={
                                                        question.options.option4
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </>
                                ))}
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <ToastContainer />
        </div>
    );
};

export default Survey;
