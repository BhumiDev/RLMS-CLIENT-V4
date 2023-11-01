import { Box, Button, CircularProgress, Grid, IconButton, InputLabel, Stack, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import BreadCrumb from "../../../common/components/Breadcrumb";
import { AddQuestionBreadcrumb } from "../../../utils/StaticData/Breadcrumbs/Course";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addAssessmentQuestions } from "../../../API/Course";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";


export const AddAssessmentQuestions = () => {

    const [questions, setQuestions] = useState([{
        question: '',
        options: {
            option1: '',
            option2: '',
            option3: '',
            option4: ''
        },
        answer: ''
    }]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const trimmedValue = value.replace(/^\s+/, '');
        const trimmedName = name.replace(/^\s+/, '');
        const data = [...questions];

        if (trimmedName.slice(0, 6) === 'option') {
            data[index].options[trimmedName] = trimmedValue;
            setQuestions(data);
        } else {
            data[index][trimmedName] = trimmedValue;
            setQuestions(data);
        }
    };

    const loader = useSelector((state) => state?.currentScreen?.isLoading);

    const addQuestion = () => {
        let newForm = {
            question: '',
            options: {
                option1: '',
                option2: '',
                option3: '',
                option4: ''
            },
            answer: ''
        };
        questions.push(newForm);
        setQuestions([...questions]);
    };

    const handleSubmit = async () => {
        console.log("questions", questions);

        let isOptions;

        questions.map((obj) => {

            isOptions = Object.values(obj.options).some(
                (x) => x === null || x === ''
            );
        });

        if (isOptions) {
            toast.error('Please fill all the fields');
        } else {
            await addAssessmentQuestions(questions);
            toast.success('QuestionCreated!');

            setQuestions(
                [
                    {
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
            );
        }

        // const isOptions = Object.values(formData.options).some(
        //     (x) => x === null || x === ''
        // );
    };

    // const deleteQuestion = (index) => {
    //     if (formData.questions.length > 1) {
    //         const updatedQuestions = [...formData.questions];
    //         updatedQuestions.splice(index, 1);

    //         setFormData((prevFormData) => ({
    //             ...prevFormData,
    //             questions: updatedQuestions
    //         }));
    //     }
    // };
    const deleteQuestion = (index) => {
        if (questions.length > 1) {
          const updatedQuestions = [...questions];
          updatedQuestions.splice(index, 1);
          setQuestions(updatedQuestions);
        }
      };

    const [top, setTop] = useState(true);

    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 250 ? setTop(false) : setTop(true)
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <>
            <Box px={{ md: 12, sm: 3, xs: 3 }} mb={5} minHeight='76.6vh' width='100%'>
                <Box display="flex" justifyContent='space-between' sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'background.default',
                    zIndex: 99999,
                    p: 3,
                    boxShadow: !top && 4,
                    borderRadius: !top && 1
                }}
                >
                    <BreadCrumb breadItems={AddQuestionBreadcrumb} />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={handleSubmit}
                    // sx={{ position: 'fixed' }}
                    >
                        Save Questions
                    </Button>
                </Box>

                {loader ?
                    <Box display='flex' alignItems='center' justifyContent='center' height='60vh'>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        <Grid container display="flex" flexDirection='column' gap={4}>
                            {questions?.map((question, index) => {
                                return (
                                    <Box my={4} display="flex" flexDirection='column' gap={4}>

                                        <Grid item display="flex" alignItems='center' justifyContent='space-between' gap={2} md={12}>
                                            <Typography variant="h5" color='secondary.onDarkContrastText' sx={{ fontWeight: 600, minWidth:'110px' }}>Ques {index + 1} :</Typography>
                                            <TextField
                                                sx={{ width: '100%'  }}
                                                name="question"
                                                multiline
                                                label='Enter question here'
                                                value={question.question}
                                                onChange={(e) => {
                                                    handleChange(e, index);
                                                }}
                                            />
                                        <Stack
                                               sx={{
                                                 justifyContent: 'end',
                                                 alignItems: 'end',
                                               }}
                                             >
                                               <IconButton
                                                 aria-label="delete"
                                                 onClick={() => {
                                                   console.log('deleteQuestion', index);
                                                   deleteQuestion(index);
                                                 }}
                                                 disabled={questions?.length <= 1}
                                               >
                                                 <DeleteIcon
                                                   style={{
                                                     color: 'red',
                                                   }}
                                                 />
                                               </IconButton>
                                             </Stack>
                                        </Grid>
                                        <Box display="flex" flexDirection='column' gap={2}>
                                            <Grid item display="flex" alignItems='center' gap={4.5} md={12}>
                                                <Typography variant="subtitle1" color='secondary.onDarkContrastText' sx={{ fontWeight: 600, minWidth:'90px' }}>Option 1 :</Typography>
                                                <TextField
                                                    sx={{ width: '60%' }}
                                                    name="option1"
                                                    multiline
                                                    label='Enter option 1'
                                                    value={question.options.option1}
                                                    onChange={(e) => {
                                                        handleChange(e, index);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item display="flex" alignItems='center' gap={4} md={12}>
                                                <Typography variant="subtitle1" color='secondary.onDarkContrastText' sx={{ fontWeight: 600, minWidth:'95px' }}>Option 2 :</Typography>
                                                <TextField
                                                    sx={{ width: '60%' }}
                                                    name="option2"
                                                    multiline
                                                    label='Enter option 2'
                                                    value={question.options.option2}
                                                    onChange={(e) => {
                                                        handleChange(e, index);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item display="flex" alignItems='center' gap={4} md={12}>
                                                <Typography variant="subtitle1" color='secondary.onDarkContrastText' sx={{ fontWeight: 600, minWidth:'95px' }}>Option 3 :</Typography>
                                                <TextField
                                                    sx={{ width: '60%' }}
                                                    name="option3"
                                                    multiline
                                                    label='Enter option 3'
                                                    value={question.options.option3}
                                                    onChange={(e) => {
                                                        handleChange(e, index);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item display="flex" alignItems='center' gap={4} md={12}>
                                                <Typography variant="subtitle1" color='secondary.onDarkContrastText' sx={{ fontWeight: 600, minWidth:'95px' }}>Option 4 :</Typography>
                                                <TextField
                                                    sx={{ width: '60%' }}
                                                    name="option4"
                                                    multiline
                                                    label='Enter option 4'
                                                    value={question.options.option4}
                                                    onChange={(e) => {
                                                        handleChange(e, index);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item display="flex" alignItems='center' gap={5.3} md={12}>
                                                <Typography variant="subtitle1" color='secondary.onDarkContrastText' sx={{ fontWeight: 600, minWidth:'85px' }}>Answer : </Typography>
                                                <TextField
                                                    sx={{ width: '60%' }}
                                                    name="answer"
                                                    multiline
                                                    label='Enter answer'
                                                    value={question.answer.replace(/\s/g, "")}
                                                    onChange={(e) => {
                                                        handleChange(e, index);
                                                    }}
                                                />
                                            </Grid>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Grid>
                        <Box>
                            <Button
                                startIcon={<AddIcon />}
                                variant="outlined"
                                size="small"
                                color="secondary"
                                sx={{ mt: 6 }}
                                onClick={addQuestion}
                            >
                                Add More Questions
                            </Button>
                        </Box>
                    </>
                }
            </Box>
            <ToastContainer />
        </>
    )
}