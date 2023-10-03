//  const handleSubmit = async () => {
//         console.log('Form data', formData)
//         let isEmpty;
//         let isOptions;

//         isEmpty = Object.values(formData).some(
//             (x) => x === null || x === ''
//         );

//         isOptions = Object.values(formData.options).some(
//             (x) => x === null || x === ''
//         );

//         if (isEmpty || isOptions || !sectionId) {
//             toast.error('Please fill all the fields');
//         } else {
//             await createQuestion(formData, sectionId);
//             toast.success('QuestionCreated!');

//             setFormData({
//                 questionType: 'mcq',
//                 question: '',
//                 options: {
//                     option1: '',
//                     option2: '',
//                     option3: '',
//                     option4: ''
//                 },
//                 answer: ''

//             });
//         }

//         // const isOptions = Object.values(formData.options).some(
//         //     (x) => x === null || x === ''
//         // );
//     };

import {
    Box,
    Stack,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    FormControlLabel,
    Radio,
    RadioGroup,
    Button,
    Grid,
    CircularProgress
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { createQuestion, getIndividualQuestion } from '../../../../API/Course';
import { setCurrentScreenLoading } from '../Slices/currentScreen';
import {
    createQuestion,
    editQuestion,
    getIndividualQuestion
} from '../../../../API/Course';
import { blue } from '@mui/material/colors';

const Exercise = (props) => {
    // const [selectedOption, setSelectedOption] = useState('');
    const loader = useSelector((state) => state?.currentScreen?.isLoading);
    console.log('loader', loader);
    const [formData, setFormData] = useState({
        questionType: 'mcq',
        question: '',
        options: {
            option1: '',
            option2: '',
            option3: '',
            option4: ''
        },
        answer: ''
    });
    const dispatch = useDispatch();
    const shouldEditQuestion = useSelector(
        (state) => state?.currentScreen?.editable
    );
    const questionId = useSelector((state) => state?.currentScreen?.id);
    // const [sectionId, setSectionId] = useState(props.sectionId);
    const sectionId = useSelector(
        (state) => state?.currentCourse?.currentSectionId
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('value to be changed', name);
        // const newOptions = [...formData.options];
        if (name.slice(0, 6) === 'option') {
            setFormData({
                ...formData,
                options: { ...formData.options, [name]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    console.log('formData', formData);

    const handleSubmit = async () => {
        // store.dispatch(setCurrentScreenLoading(true))
        console.log('Form data in handlesubmit', formData);
        let isEmpty;
        let isOptions;

        isEmpty = Object.values(formData).some((x) => x === null || x === '');
        isOptions = Object.values(formData.options).some(
            (x) => x === null || x === ''
        );

        if (
            isEmpty ||
            !sectionId ||
            (formData.questionType === 'mcq' && isOptions && formData.answer)
        ) {
            console.log('Empty field', isEmpty, isOptions, sectionId);
            toast.error('Please fill all the fields');
        } else {
            shouldEditQuestion
                ? await editQuestion(formData, questionId, dispatch)
                : await createQuestion(formData, sectionId, dispatch);

            toast.success('QuestionCreated!');

            setFormData({
                questionType: 'mcq',
                question: '',
                options: {
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: ''
                },
                answer: ''
            });
            // setSelectedOption('');
        }
        // store.dispatch(setCurrentScreenLoading(false))

        // const isOptions = Object.values(formData.options).some(
        //     (x) => x === null || x === ''
        // );
    };
    // console.log('Resource to be deletwed', resourceToBeDeletedId);
    const getCurrentQuestion = async () => {
        store.dispatch(setCurrentScreenLoading(true));
        await getIndividualQuestion(questionId).then((response) => {
            console.log('all questions fetched', response);

            setFormData({
                questionType: response?.data?.excercise?.questionType,
                question: response?.data?.excercise?.question,
                options: {
                    option1: response?.data?.excercise?.options[0]?.a,
                    option2: response?.data?.excercise?.options[1]?.b,
                    option3: response?.data?.excercise?.options[2]?.c,
                    option4: response?.data?.excercise?.options[3]?.d
                },
                answer: response?.data?.excercise?.answer
            });
            store.dispatch(setCurrentScreenLoading(false));
        });
        // store.dispatch(setCurrentScreenLoading(false))
    };

    const resetQuestions = () =>
        setFormData({
            questionType: 'mcq',
            question: '',
            options: {
                option1: '',
                option2: '',
                option3: '',
                option4: ''
            },
            answer: ''
        });

    useEffect(() => {
        questionId ? getCurrentQuestion() : resetQuestions();
    }, [questionId]);

    return (
        <>
            {loader ? (
                <Box
                    textAlign="center"
                    height="60vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box my={3}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            multiline
                            disabled
                            InputLabelProps={{
                                style: {
                                    paddingLeft: '20px',
                                    color: '#09111C'
                                }
                            }}
                            InputProps={{
                                style: {
                                    display: 'block',
                                    padding: '20px',
                                    paddingBottom: '0px',
                                    borderLeft: '12px solid #5292DD',
                                    boxShadow:
                                        '0px 1px 4px 1px rgba(0, 0, 0, 0.15)'
                                },
                                startAdornment: (
                                    <Box
                                        display="flex"
                                        gap={2}
                                        flexDirection="column"
                                    >
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label">
                                                Question type
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="questionType"
                                                label="Question Type"
                                                value={formData?.questionType}
                                                onChange={(e) =>
                                                    handleChange(e)
                                                }
                                            >
                                                <MenuItem value="mcq">
                                                    Multiple choice question
                                                </MenuItem>
                                                <MenuItem value="true/false">
                                                    True/False
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            fullWidth
                                            multiline
                                            label="Question"
                                            name="question"
                                            value={formData?.question}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        {/* {formData?.options?.map((val, index)=>{
                                // console.log("option val", val)
                                return(
                                    <> */}
                                        {/* { console.log("option val", val)} */}
                                        {formData?.questionType === 'mcq' ? (
                                            <>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    // key={index}
                                                    // id={`question-${index}`}
                                                    label="Option a"
                                                    name="option1"
                                                    value={
                                                        formData?.options
                                                            ?.option1
                                                    }
                                                    // value={
                                                    //     formData?.options.option1
                                                    // }
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        // handleChange ? (e) => handleChange(e, index) : (event) => handleChange(index, event);
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    // key={index}
                                                    label="Option b"
                                                    name="option2"
                                                    value={
                                                        formData?.options
                                                            ?.option2
                                                    }
                                                    // value={
                                                    //     formData?.options.option2
                                                    // }
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        // handleChange ? (e) => handleChange(e, index) : (event) => handleChange(index, event);
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    // key={index}
                                                    label="Option c"
                                                    name="option3"
                                                    value={
                                                        formData?.options
                                                            ?.option3
                                                    }
                                                    // value={
                                                    //     formData?.options.option1
                                                    // }
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        // handleChange ? (e) => handleChange(e, index) : (event) => handleChange(index, event);
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    // key={index}
                                                    label="Option d"
                                                    name="option4"
                                                    value={
                                                        formData?.options
                                                            ?.option4
                                                    }
                                                    // value={
                                                    //     formData?.options.option1
                                                    // }
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        // handleChange ? (e) => handleChange(e, index) : (event) => handleChange(index, event);
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                                <TextField
                                                    multiline
                                                    fullWidth
                                                    label="Answer"
                                                    name="answer"
                                                    value={formData?.answer}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <FormControl>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="answer"
                                                        // key={index}
                                                        value={formData?.answer}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                    >
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="True"
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                        <FormControlLabel
                                                            value="false"
                                                            control={<Radio />}
                                                            label="False"
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </>
                                        )}
                                        {/* </>
                                 
                                )
                    })
                } */}
                                    </Box>
                                )
                            }}
                        />
                        {/* ); */}
                        {/* //  })}  */}
                    </Stack>
                    <Grid>
                        {/* <Button
                        color="secondary"
                        variant="text"
                        sx={{ marginTop: '16px' }}
                        onClick={addQuestion}
                    >
                        + Add Question
                    </Button> */}
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{ marginTop: '16px' }}
                            onClick={handleSubmit}
                        >
                            {shouldEditQuestion ? 'Edit' : 'Submit'}
                        </Button>
                    </Grid>
                    <ToastContainer />
                </Box>
            )}
        </>
    );
};

export default Exercise;
