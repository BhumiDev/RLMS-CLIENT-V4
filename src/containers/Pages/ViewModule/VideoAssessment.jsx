import React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { getVideoQuiz, submitLectureVideoQuiz } from '../../../API/Lesson';
import { Reactions } from './Reaction';
import { ToastContainer, toast } from 'react-toastify';


export const VideoAssessment = ({ lectureId, setFeedback }) => {

    const [showReactions, setShowReactions] = useState(false);


    const [data, setData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [value, setValue] = useState({});

    const getQuestions = async () => {
        const res = await getVideoQuiz(lectureId);
        console.log("res of question", res);
        if (res.length > 0) {
            setData(res);
        } else {
            setData([]);
        }
    }

    useEffect(() => {
        getQuestions();
    }, [lectureId])

    const question = data[currentQuestion];

    const handleNext = () => {
        if (currentQuestion < data?.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

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

        const res = await submitLectureVideoQuiz(lectureId, dataArr);
        console.log('res of submitVideoQuiz', res);
        toast.success(res?.data.message);
        setShowReactions(true);
    };


    return (
        <>
            {data?.length > 0 && !showReactions ?
                <>
                    <Box px={3} width='100%'>
                        <Box sx={{ display: 'flex' }}>
                            <Typography color='primary.lighter' variant='body1' sx={{ fontWeight: 600 }}>
                                Question {currentQuestion + 1}
                            </Typography>
                            <Typography sx={{ fontWeight: 600 }}>/{data?.length}</Typography>
                        </Box>
                        <Box my={2}>
                            <Typography variant='subtitle1'>
                                {question?.question}
                            </Typography>
                        </Box>
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
                                    sx={{ color: 'secondary.contrastText' }}
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
                                    sx={{ color: 'secondary.contrastText' }}
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
                                    sx={{ color: 'secondary.contrastText' }}
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
                                    sx={{ color: 'secondary.contrastText' }}
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
                        <Box display="flex" justifyContent='flex-end'>
                            {currentQuestion < data?.length - 1 ?
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
                        </Box>
                    </Box>
                </>
                :
                <Reactions lectureId={lectureId} setFeedback={setFeedback} totalMarks={data?.length * 10} />
            }

            <ToastContainer />
        </>
    )
}