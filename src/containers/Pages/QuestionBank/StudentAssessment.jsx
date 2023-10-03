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
import { Box, Typography } from '@mui/material';
import { getAssessmentQuestions, submitAssessmentAnswer } from '../../../API/Course';
import { useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const StudentAssessment = () => {

    const [open, setOpen] = useState(true);
    const [timer, setTimer] = useState(30);

    const handleClose = () => {
        setOpen(false);
    };

    const [data, setData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [randomQuestions, setRandomQuestions] = useState([]);
    const [value, setValue] = useState({});

    const getQuestions = async () => {
        const res = await getAssessmentQuestions();
        console.log("res of question", res);
        setData(res[0].questions);
    }

    useEffect(() => {
        getQuestions();
    }, [])

    useEffect(() => {
        const shuffledQuestions = data.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, 10);
        setRandomQuestions(selectedQuestions);
    }, [data]);

    const question = randomQuestions[currentQuestion];

    useEffect(() => {
        let myInterval;
        let tempInterval;
        if (randomQuestions.length - 1 !== currentQuestion) {
            myInterval = setInterval(() => {
                if (timer > 0) {
                    setTimer(timer - 1);
                } else if (timer === 0) {
                    handleNext();
                    setTimer(30);
                }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            }
        } else {
            if (timer > 0) {
                tempInterval = setInterval(() => {
                    setTimer(timer - 1)
                }, 1000);
                return () => {
                    clearInterval(tempInterval);
                };
            } else {
                handleSubmit();
            }
        }
    }, [timer]);

    const handleNext = () => {
        if (currentQuestion < randomQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimer(30);
        }
    };

    // console.log("question", question);

    const handleChange = (questionId, event, id, index) => {
        const { value: selectedValue } = event.target;

        setValue((prevValues) => ({
            ...prevValues,
            [questionId]: {
                questionId: id,
                answer: selectedValue,
            }
        }));
    };

    // console.log("value", value);

    const handleSubmit = async () => {
        const dataArr = [];
        Object.entries(value).map(([key, value]) => {
            dataArr.push(value);
        });

        const submitData = {
            solutions: dataArr
        };
        console.log('formdata', submitData);
        const res = await submitAssessmentAnswer(submitData);
        console.log('res of submitAssessmentAnswer', res);
        setOpen(false);

    };


    return (
        <>
            {data?.length > 0 &&
                <Dialog
                    open={open}
                    // onClose={handleClose}
                    maxWidth="md"
                    fullWidth
                    TransitionComponent={Transition}
                    keepMounted
                >
                    <Box p={5}>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography color='primary.light' variant='body1' sx={{ fontWeight: 600 }}>
                                    Question {currentQuestion + 1}
                                </Typography>
                                <Typography sx={{ fontWeight: 600 }}>/{randomQuestions.length}</Typography>
                            </Box>
                            <Typography>
                                00:{timer >= 10 ? timer : `0${timer}`}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant='subtitle1'>
                                    {question?.question}
                                </Typography>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                >
                                    <FormGroup
                                        value={value[`question${currentQuestion}`]?.answer || false}
                                        onChange={(e) =>
                                            handleChange(
                                                `question${currentQuestion}`,
                                                e,
                                                question?._id,
                                                currentQuestion
                                            )
                                        }
                                        name={`question${currentQuestion}`}
                                    >
                                        <FormControlLabel
                                            value="option1"
                                            sx={{ color: 'secondary.onDarkContrastText' }}
                                            control={
                                                <Checkbox
                                                    checked={value[`question${currentQuestion}`]?.answer == 'option1'}
                                                    color="secondary"
                                                />
                                            }
                                            label={question?.options.option1}

                                        />
                                        <FormControlLabel
                                            value='option2'
                                            sx={{ color: 'secondary.onDarkContrastText' }}
                                            control={
                                                <Checkbox
                                                    checked={value[`question${currentQuestion}`]?.answer == 'option2'}
                                                    color="secondary"
                                                />
                                            }
                                            label={question?.options.option2}
                                        />
                                        <FormControlLabel
                                            value='option3'
                                            sx={{ color: 'secondary.onDarkContrastText' }}
                                            control={
                                                <Checkbox
                                                    checked={value[`question${currentQuestion}`]?.answer == 'option3'}
                                                    color="secondary"
                                                />
                                            }
                                            label={question?.options.option3}
                                        />
                                        <FormControlLabel
                                            value='option4'
                                            sx={{ color: 'secondary.onDarkContrastText' }}
                                            control={
                                                <Checkbox
                                                    checked={value[`question${currentQuestion}`]?.answer == 'option4'}
                                                    color="secondary"
                                                />
                                            }
                                            label={question?.options.option4}
                                        />
                                    </FormGroup>
                                </Box>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {currentQuestion < randomQuestions.length - 1 ?
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            }
                        </DialogActions>
                    </Box>
                </Dialog>
            }
        </>
    )
}