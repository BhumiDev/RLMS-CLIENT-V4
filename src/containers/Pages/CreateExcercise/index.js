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
    Grid
} from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createQuestion } from '../../../API/Course';

export const CreateExercise = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        questions: [
            {
                questionType: 'mcq',
                question: '',
                options: {
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: ''
                },
                answer: ''
            }
        ]
    });

    const [sectionId, setSectionId] = useState(props.sectionId);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const data = [...formData.questions];

        if (name.slice(0, 6) === 'option') {
            data[index].options[name] = value;
            setFormData({ ...formData, questions: data });
        } else {
            data[index][name] = value;
            setFormData({ ...formData, questions: data });
        }
    };

    const addQuestion = () => {
        let newForm = {
            questionType: 'mcq',
            question: '',
            options: {
                option1: '',
                option2: '',
                option3: '',
                option4: ''
            },
            answer: ''
        };
        formData.questions.push(newForm);
        setFormData({ ...formData });
    };

    const handleSubmit = async () => {
        console.log('formData', formData);

        let isEmpty;
        let isOptions;

        formData.questions.map((obj) => {
            isEmpty = Object.values(formData).some(
                (x) => x === null || x === ''
            );

            isOptions = Object.values(obj.options).some(
                (x) => x === null || x === ''
            );
        });

        if (isEmpty || isOptions || !sectionId) {
            toast.error('Please fill all the fields');
        } else {
            await createQuestion(formData, sectionId);
            toast.success('QuestionCreated!');

            setFormData({
                title: '',
                questions: [
                    {
                        questionType: 'mcq',
                        question: '',
                        options: {
                            option1: '',
                            option2: '',
                            option3: '',
                            option4: ''
                        },
                        answer: ''
                    }
                ]
            });
        }

        // const isOptions = Object.values(formData.options).some(
        //     (x) => x === null || x === ''
        // );
    };

    return (
        <>
            <Box my={3}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        multiline
                        label="Test Heading"
                        name="title"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    {formData?.questions?.map((currentItem, index) => {
                        return (
                            <TextField
                                key={index}
                                id={`question-${index}`}
                                fullWidth
                                multiline
                                disabled
                                label={`Question ${index + 1}`}
                                InputLabelProps={{
                                    style: {
                                        paddingLeft: '20px',
                                        color: '#09111C'
                                    }
                                }}
                                InputProps={{
                                    sx: {
                                        display: 'block',
                                        padding: '20px',
                                        paddingBottom: '0px',
                                        borderLeft:
                                            formData?.questions?.length - 1 ===
                                            index
                                                ? '12px solid secondary.main'
                                                : '',
                                        boxShadow:
                                            '0px 1px 4px 1px rgba(0, 0, 0, 0.15)'
                                    },
                                    startAdornment: (
                                        <Box
                                            display="flex"
                                            gap={2}
                                            flexDirection="column"
                                        >
                                            <TextField
                                                fullWidth
                                                multiline
                                                label="Question"
                                                name="question"
                                                value={currentItem.question}
                                                onChange={(e) => {
                                                    handleChange(e, index);
                                                }}
                                            />
                                            <FormControl>
                                                <InputLabel id="demo-simple-select-label">
                                                    Question type
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="questionType"
                                                    label="Question Type"
                                                    value={
                                                        currentItem.questionType
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(e, index)
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
                                            {currentItem?.questionType ===
                                            'mcq' ? (
                                                <>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        label="Option a"
                                                        name="option1"
                                                        value={
                                                            currentItem?.options
                                                                .option1
                                                        }
                                                        onChange={(e) => {
                                                            handleChange(
                                                                e,
                                                                index
                                                            );
                                                        }}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        label="Option b"
                                                        name="option2"
                                                        value={
                                                            currentItem?.options
                                                                .option2
                                                        }
                                                        onChange={(e) => {
                                                            handleChange(
                                                                e,
                                                                index
                                                            );
                                                        }}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        label="Option c"
                                                        name="option3"
                                                        value={
                                                            currentItem?.options
                                                                .option3
                                                        }
                                                        onChange={(e) => {
                                                            handleChange(
                                                                e,
                                                                index
                                                            );
                                                        }}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        label="Option d"
                                                        name="option4"
                                                        value={
                                                            currentItem?.options
                                                                .option4
                                                        }
                                                        onChange={(e) => {
                                                            handleChange(
                                                                e,
                                                                index
                                                            );
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="option1"
                                                            value={
                                                                currentItem
                                                                    ?.options
                                                                    .option1
                                                            }
                                                            onChange={(e) => {
                                                                handleChange(
                                                                    e,
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <FormControlLabel
                                                                value="true"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="True"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    handleChange(
                                                                        e,
                                                                        index
                                                                    );
                                                                }}
                                                            />
                                                            <FormControlLabel
                                                                value="false"
                                                                control={
                                                                    <Radio />
                                                                }
                                                                label="False"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    handleChange(
                                                                        e,
                                                                        index
                                                                    );
                                                                }}
                                                            />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </>
                                            )}
                                            <TextField
                                                fullWidth
                                                multiline
                                                label="Answer"
                                                name="answer"
                                                value={currentItem?.answer}
                                                onChange={(e) => {
                                                    handleChange(e, index);
                                                }}
                                            />
                                        </Box>
                                    )
                                }}
                            />
                        );
                    })}
                </Stack>
                <Grid>
                    <Button
                        color="secondary"
                        variant="text"
                        sx={{ marginTop: '16px' }}
                        onClick={addQuestion}
                    >
                        + Add Question
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ marginTop: '16px' }}
                        onClick={handleSubmit}
                    >
                        Upload Test
                    </Button>
                </Grid>
                <ToastContainer />
            </Box>
        </>
    );
};
