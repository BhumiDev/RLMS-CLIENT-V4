import {
    TextField,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Button,
    Checkbox,
    TextareaAutosize
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { createQuestion } from '../../../API/Course';
import { isNull } from 'lodash';

const McqDashbooad = (props) => {
    // const [steps, setSteps] = React.useState([1]);
    const [sectionId, setSectionId] = React.useState(props.sectionId);
    const [type, setType] = useState('mcq');
    // const [formErrors, setErrors] = useState({});
    // const [result, setResult] = useState(false);

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

    // const modules = {
    //     toolbar: [
    //         [{ header: '1' }, { header: '2' }, { font: [] }],
    //         [{ size: [] }],
    //         ['bold', 'italic', 'underline'],
    //         ['clean']
    //     ]
    // };

    // const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline'];

    // const handleQuestion = (html, delta, source, contents, editor) => {
    //     console.log( contents);
    //     console.log( contents.getContents());
    //     // console.log(content.getEditor())
    // };

    console.log('sectionId - ', sectionId);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let options = formData.options;

        if (name.slice(0, 6) === 'option') options[name] = value;

        console.log(name.slice(0, 6));

        name.slice(0, 6) != 'option'
            ? setFormData({ ...formData, [name]: value })
            : setFormData({ ...formData, options: options });
    };

    const handleSubmit = async () => {
        console.log('formData and sectionId', formData, sectionId);

        const isEmpty = Object.values(formData).some(
            (x) => x === null || x === ''
        );
        const isOptions = Object.values(formData.options).some(
            (x) => x === null || x === ''
        );

        if (isEmpty || isOptions || !sectionId) {
            toast.error('Please fill all the fields');
        } else {
            await createQuestion(formData, sectionId);
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
        }
    };

    console.log('props.sectionId', props.sectionId);

    // const validate = (values, index) => {
    //     const errors = {};
    //     console.log(values.question[index].question);
    //     if (!values.question[index].question) {
    //         (errors.question = 'question is required!!'),
    //             (errors.index = index);
    //     }
    //     if (!values.question[index].answer) {
    //         (errors.answer = 'answer is required!!'), (errors.index = index);
    //     }
    //     if (!values.excerciseHeading) {
    //         (errors.excerciseHeading = 'heading is required!!'),
    //             (errors.index = index);
    //     }

    //     return errors;
    // };

    // const handleChange = (event, index) => {
    //     setType(event.target.value);
    //     handleQuestions(event, index);
    // };
    // const [age, setAge] = React.useState('');

    // const handleChanges = (event, index) => {
    //     setAge(event.target.value);

    //     handleQuestions(event, index);
    // };
    // const deleteStep = () => {
    //     steps.pop();
    //     setSteps([...steps]);
    // };

    // const [formData, setData] = React.useState({
    //     question: [{ question: '', answer: '' }]
    // });
    // const handleQuestions = (event, index) => {
    //     // console.log(index);

    //     formData.question[index] = {
    //         ...formData.question[index], //current obj values
    //         [event.target.name]: event.target.value
    //     };

    //     // setData({ ...formData, []})
    //     // setErrors(validate(formData, index));
    //     setResult(true);
    // };
    // useEffect(() => {
    //     console.log(formErrors);
    //     if (Object.keys(formErrors).length == 0 && result) {
    //         // console.log(formData)
    //     }
    // }, [formErrors]);
    // console.log('wow props', props.sectionId);

    return (
        <Box sx={{ margin: '20px 0' }}>
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Type</InputLabel>
                    <Select
                        labelId="select-label"
                        id="type-select"
                        name="questionType"
                        value={formData.questionType}
                        label="Age"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    >
                        <MenuItem value="mcq">MCQ</MenuItem>
                        <MenuItem value="true/false">TRUE/FALSE</MenuItem>
                    </Select>
                </FormControl>

                <Box>
                    {/* <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        bounds={'.quill'}
                        style={{
                            height: '150px',
                            marginBottom: '45px',
                            zIndex: '100'
                        }}
                        value={question}
                        onChange={handleQuestion}
                        placeholder="Type..."
                    /> */}

                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        name="question"
                        placeholder="Question..."
                        value={formData.question}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #121212',
                            borderRadius: '5px',
                            fontSize: '17px'
                        }}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </Box>
                {type === 'mcq' ? (
                    <>
                        <Box>
                            <TextField
                                fullWidth
                                name="option1"
                                label="option(a)"
                                id="option"
                                value={formData.options.option1}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></TextField>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                name="option2"
                                id="option"
                                label="option(b)"
                                value={formData.options.option2}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></TextField>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                name="option3"
                                label="option(c)"
                                id="option"
                                value={formData.options.option3}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></TextField>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                name="option4"
                                label="option(d)"
                                id="option"
                                value={formData.options.option4}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></TextField>
                        </Box>
                    </>
                ) : null}

                <Box>
                    <TextField
                        fullWidth
                        name="answer"
                        label="answer (a, b, c, d)"
                        value={formData.answer}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    ></TextField>
                </Box>
            </Stack>
            <Button
                sx={{ marginTop: '20px' }}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
            >
                done
            </Button>
            <ToastContainer />
        </Box>
    );
};
export default McqDashbooad;
