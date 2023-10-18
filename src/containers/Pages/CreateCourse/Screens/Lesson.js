import React from 'react';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createLessons,
    createQuizAssessment,
    createResource,
    deleteLesson,
    deleteResources,
    editLesson,
    editResource,
    getCurrentLecture
} from '../../../../API/Lesson';
import Dialogue from '../Components/Dialogue';
import Delete from '@mui/icons-material/Delete';
import {
    initialValues,
    validationSchema
} from '../Formik/createLessonFormikData';
import ReactQuill from 'react-quill';
import modules from '../Components/Quill';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import {
    resetCurrentScreenForm,
    setCurrentScreenId,
    setCurrentScreenLoading,
    setCurrentScreenName,
    setCurrentScreenState
} from '../Slices/currentScreen';
import { store } from '../../../../store';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
// import { Toast } from 'react-toastify/dist/components';

// Add lesson, excercise, as well conditional rendering of excercise

const Lesson = () => {
    const loader = useSelector((state) => state?.currentScreen?.isLoading);
    console.log('loader', loader);
    const [open, setOpen] = useState(false);
    const [allResourcesToCheck, setAllResourceToBeChecked] = useState([]);
    const [allResources, setAllResource] = useState([]);
    const [resourceToBeCreated, setresourceToBeCreated] = useState([]);
    const [resourceToBeDeletedId, setResourceToBeDeletedId] = useState([]);

    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [lectureId, setLectureId] = useState();
    const [disabled, setDisabled] = useState(true);

    const [video, setVideo] = useState('');
    // const shouldResetForm=

    const theme = useTheme();
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const isEdit = useSelector((state) => state?.currentScreen?.editable);
    const shouldResetForm = useSelector(
        (state) => state?.currentScreen?.resetForm
    );
    const currentLessonId = useSelector((state) => state?.currentScreen?.id);
    const courseId = useSelector((state) => state?.currentCourse?.data?._id);
    const sectionId = useSelector(
        (state) => state?.currentCourse?.currentSectionId
    );

    useEffect(() => {
        setLectureId(currentLessonId);
    }, [currentLessonId]);

    // const [shouldResetForm, setShouldResetForm] = useState(!isEdit);

    const dispatch = useDispatch();

    const createLecture = async (values) => {
        console.log('Create lesson called part-1');
        await createLessons(values, courseId, sectionId, video, dispatch);
        console.log('Outside Create lesson');
        toast.success('lecture created Successfully');
        console.log('sectionid', sectionId);
    };

    const [formData, setFormData] = useState({
        // title: '',
        questions: [
            {
                lectureId: '',
                // questionType: 'mcq',
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

    const handleCreateQuestionsClose = () => {
        setShowQuestionForm(false);
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const data = [...formData.questions];

        data[index].lectureId = lectureId;
        setFormData({ ...formData, questions: data });

        if (name.slice(0, 6) === 'option') {
            data[index].options[name] = value;
            setFormData({ ...formData, questions: data });
        } else {
            data[index][name] = value;
            setFormData({ ...formData, questions: data });
        }

        console.log('formData', formData);
    };

    const addQuestion = () => {
        console.log('Form data in handlesubmit', formData);

        const newForm = {
            lectureId: '',
            // questionType: 'mcq',
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

    const handleSubmitForm = async () => {
        console.log('Form data in handlesubmit', formData);
        let isEmpty;
        let isOptions;

        formData?.questions.map((obj) => {
            isEmpty = Object.values(obj).some((x) => x === null || x === '');
            isOptions = Object.values(obj.options).some(
                (x) => x === null || x === ''
            );
        });

        console.log('Empty field', isEmpty, isOptions);
        if (isEmpty || isOptions) {
            toast.error('Please fill all the fields');
        } else {
            const res = await createQuizAssessment(lectureId, formData);
            console.log('res of quiz', res);
            setFormData({
                // title: '',
                questions: [
                    {
                        lectureId: '',
                        // questionType: 'mcq',
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
            setShowQuestionForm(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            // console.log('values', values);
            if (shouldResetForm) {
                // console.log('Wiping data');
                resetForm();
                dispatch(resetCurrentScreenForm(false));
                // dispatch(resetCurrentScreenForm(false))
            } else {
                // lecId,  video,    lessonFormData,    dispatch
                console.log('isEdit', isEdit);
                if (isEdit) {
                    await editLesson(currentLessonId, video, values, dispatch);
                    let counter = 0;

                    resourceToBeCreated.map((resource) => {
                        if (allResourcesToCheck.length > 0) {
                            let counter = 0;
                            allResourcesToCheck.map((resourceToCheck) => {
                                console.log(
                                    'resource To be Checked',
                                    resourceToCheck,
                                    'resource To be created',
                                    resource
                                );
                                if (!(resourceToCheck.name === resource.name)) {
                                    counter += 1;
                                }
                            });
                            createResource(
                                currentLessonId,
                                courseId,
                                resource,
                                values.resourceTitle
                            );
                            console.log('sectionid2', sectionId);
                            counter = 0;
                        } else {
                            if (resource.type === 'application/pdf') {
                                // console.log('About to hit createResource API');
                                createResource(
                                    currentLessonId,
                                    courseId,
                                    resource,
                                    values.resourceTitle
                                );
                                console.log('sectionid3', sectionId);
                            } else toast.error('Resource must be PDF only');
                        }

                        // })
                    });
                    // })

                    // }
                    // *********-------------------**************************/////////////
                    // Function to check whether the uploaded file already exist in backend

                    if (resourceToBeDeletedId.length > 0) {
                        console.log('Inside map');
                        deleteResources(
                            resourceToBeDeletedId,
                            currentLessonId,
                            dispatch
                        );
                        console.log('sectioni4', sectionId);
                    }
                } else {
                    // if (!video || video === '' || video === null) {
                    //     toast.error('Video is not valid or is empty');
                    // } else {
                    const lectureId = await createLessons(
                        values,
                        courseId,
                        sectionId,
                        video,
                        dispatch
                    );
                    console.log('lecture id', lectureId);
                    setLectureId(lectureId);
                    // for uploading video we need to call edit lesson API here:'
                    await editLesson(
                        lectureId,
                        video,
                        values,
                        dispatch
                        // toggleUpdate
                    );

                    resourceToBeCreated.map((resource) => {
                        if (resource.type === 'application/pdf') {
                            console.log('About to hit createResource API');

                            createResource(
                                lectureId,
                                courseId,
                                resource,
                                values.resourceTitle
                            );
                        }
                    });
                    // toast.success('lecture created Successfully');
                    // }

                    // allResourcesToCheck.map(())
                    // console.log('Resources to be created', resourceToBeCreated);
                    console.log('resource to be created', resourceToBeCreated);

                    // resourceToBeCreated
                    // await editLesson(
                    //     lectureId,
                    //     video,
                    //     values,
                    //     dispatch
                    // );
                }
            }

            // if (shouldResetForm) {
            //     resetForm();
            //     dispatch(setCurrentScreenState(false))

            // } else createLecture(values);
        }
    });

    const handleDelete = async () => {
        await deleteLesson(
            currentLessonId,
            sectionId,
            dispatch,
            setResourceToBeDeletedId
        );
        handleClose();
        dispatch(setCurrentScreenId(sectionId));
        // dispatch(setCurrentScreenName('manual'));
    };

    const uploadVideo = (e) => {
        const vid = e.target.files[0];
        console.log('video', vid);
        let data = vid.type;
        console.log('vid type', data);
        let result = data.substring(0, 5);
        console.log('result', result);

        if (result === 'video') {
            setVideo(vid);
            e.target.value = null;
            return;
        } else {
            toast.error('Please  upload video only!');
            return;
        }
    };

    // const setRess = (res) => {
    //     console.log('UPloading multiple resource');
    //     setresourceToBeCreated([...resourceToBeCreated, res])
    // }

    const uploadResource = (e) => {
        // console.log('Res in upload resource')
        // allResources.map((resources) => {

        // });
        if (allResources.length >= 3) {
            toast.error('Cannot upload more than 3 resources');
        } else {
            const res = e.target.files[0];
            console.log('Resource uploading...', res);

            let data = res.type;
            console.log('resouce to be created', resourceToBeCreated);

            console.log('type', data);
            if (data === 'application/pdf') {
                setAllResource([...allResources, res]);

                setresourceToBeCreated([...resourceToBeCreated, res]);

                console.log('here');
                console.log('resouce to be created', resourceToBeCreated);

                const existingResource = resourceToBeCreated?.find(
                    (resource) => resource.name === res.name
                );

                if (existingResource) {
                    toast.error('same file');
                } else {
                    setresourceToBeCreated([...resourceToBeCreated, res]);
                }

                // resourceToBeCreated.map((resource) => {
                //     console.log(
                //         'resource.resourseFile',
                //         resource.name,
                //         '||',
                //         'res.resourseFile',
                //         res.name
                //     );
                //     if (resource.name !== res.name) {
                //         setresourceToBeCreated([...resourceToBeCreated, res]);
                //     } else {
                //         toast.error('same file');
                //     }
                // });
                // console.log("resouce to be created2",resourceToBeCreated)
                // : setRess(res);

                e.target.value = null;
            } else {
                toast.error('please upload pdf');
            }
        }
    };

    const handleDeleteResource = (id) => {
        console.log('Delete Id fetched', id);
        // setresourceToBeCreated('');
        // const reqIndex = allResources.indexOf(id)
        allResources.map((resource, index) => {
            console.log('Compare id', resource._id, '||', id);
            if (resource._id === id) {
                console.log('Removing index...', index);
                allResources.splice(index, 1);
                setAllResource(allResources);
                setResourceToBeDeletedId([...resourceToBeDeletedId, id]);
            }
        });

        // set
    };
    const deleteVideo = () => {
        setVideo('');
    };
    console.log('Resource to be deletwed', resourceToBeDeletedId);
    const getCurrentLesson = async () => {
        store.dispatch(setCurrentScreenLoading(true));
        await getCurrentLecture(currentLessonId).then((response) => {
            console.log('all resources fetched', response.data.data.resource);
            setAllResource(response.data.data.resource);
            setAllResourceToBeChecked(response.data.data.resource);
            setVideo(response.data.data.video);
            formik.setValues(response.data.data, false);
        });
        store.dispatch(setCurrentScreenLoading(false));
    };

    const handleFormChange = (e) => {
        shouldResetForm && dispatch(resetCurrentScreenForm(false));
        const trimmedValue = e.target.value.replace(/^\s+/, ''); // Trim spaces before any character
        formik.handleChange(e);
        formik.setFieldValue('title', trimmedValue);
    };

    console.log('value', formik.values);

    useEffect(() => {
        currentLessonId && getCurrentLesson();
    }, [currentLessonId]);

    useEffect(() => {
        if (shouldResetForm) {
            // setShouldResetForm(true);
            setAllResource([]);
            formik.handleSubmit();
        }
    }, [shouldResetForm]);

    const [showFileInput, setShowFileInput] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);

    console.log('lectureId', lectureId);

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
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    mx={{ sm: 2, xs: 2 }}
                >
                    <Grid item display="flex" justifyContent="flex-end">
                        {isEdit && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleOpen}
                            >
                                Delete
                                <Delete />
                            </Button>
                        )}
                    </Grid>
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                            <Box>
                                <TextField
                                    label="Lesson Name"
                                    fullWidth
                                    name="title"
                                    variant="outlined"
                                    sx={{
                                        mb: 3
                                    }}
                                    value={formik.values.title}
                                    onChange={(e) => handleFormChange(e)}
                                    error={
                                        formik.touched.title &&
                                        Boolean(formik.errors.title)
                                    }
                                    helperText={
                                        formik.touched.title &&
                                        formik.errors.title
                                    }
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    error={
                                        formik.touched.description &&
                                        Boolean(formik.errors.description)
                                    }
                                    helperText={
                                        formik.touched.description &&
                                        formik.errors.description
                                    }
                                    // disabled
                                    sx={{
                                        '& .MuiInputBase-root.Mui-disabled': {
                                            '& > fieldset': {
                                                borderColor: 'black'
                                            }
                                        }
                                    }}
                                    InputProps={{
                                        style: {
                                            display: 'block',
                                            paddingBottom: 0
                                        },
                                        startAdornment: (
                                            <Field name="description">
                                                {({ field }) => (
                                                    <ReactQuill
                                                        placeholder="Write Description..."
                                                        theme="snow"
                                                        name="description"
                                                        value={field.value}
                                                        onChange={field.onChange(
                                                            field.name
                                                        )}
                                                        modules={modules}
                                                    />
                                                )}
                                            </Field>
                                        )
                                    }}
                                />
                            </Box>
                            <Box
                                display="flex"
                                my={2}
                                alignItems="center"
                                justifyContent="flex-start"
                            >
                                <Button
                                    variant="text"
                                    color="secondary"
                                    size="small"
                                    onClick={() => {
                                        setShowFileInput(true);
                                        setShowLinkInput(false);
                                    }}
                                >
                                    Upload video
                                </Button>
                                <Typography>or</Typography>
                                <Button
                                    variant="text"
                                    color="secondary"
                                    size="small"
                                    onClick={() => {
                                        setShowFileInput(false);
                                        setShowLinkInput(true);
                                    }}
                                >
                                    Upload Link
                                </Button>
                            </Box>
                            <Dialog
                                open={showQuestionForm}
                                onClose={handleCreateQuestionsClose}
                                fullWidth
                                TransitionComponent={Transition}
                                keepMounted
                            >
                                <DialogTitle>Add Quiz Assessment</DialogTitle>
                                <DialogContent>
                                    <Box my={3}>
                                        <Stack spacing={3}>
                                            {formData?.questions?.map(
                                                (currentItem, index) => (
                                                    <TextField
                                                        key={index}
                                                        id={`question-${index}`}
                                                        fullWidth
                                                        multiline
                                                        disabled
                                                        label={`Question ${
                                                            index + 1
                                                        }`}
                                                        InputLabelProps={{
                                                            style: {
                                                                paddingLeft:
                                                                    '20px',
                                                                color: '#09111C'
                                                            }
                                                        }}
                                                        InputProps={{
                                                            style: {
                                                                display:
                                                                    'block',
                                                                padding: '20px',
                                                                paddingBottom:
                                                                    '0px',
                                                                boxShadow:
                                                                    '0px 1px 4px 1px rgba(0, 0, 0, 0.15)'
                                                            },
                                                            startAdornment: (
                                                                <Box
                                                                    display="flex"
                                                                    gap={2}
                                                                    flexDirection="column"
                                                                >
                                                                    {/* <FormControl>
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
                                                                            handleChange(
                                                                                e,
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <MenuItem value="mcq">
                                                                            Multiple choice
                                                                            question
                                                                        </MenuItem>
                                                                        <MenuItem value="true/false">
                                                                            True/False
                                                                        </MenuItem>
                                                                    </Select>
                                                                </FormControl> */}
                                                                    <TextField
                                                                        fullWidth
                                                                        multiline
                                                                        label="Question"
                                                                        name="question"
                                                                        value={
                                                                            formData
                                                                                ?.questions
                                                                                ?.question
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleChange(
                                                                                e,
                                                                                index
                                                                            )
                                                                        }
                                                                    />

                                                                    <TextField
                                                                        fullWidth
                                                                        multiline
                                                                        label="Option a"
                                                                        name="option1"
                                                                        value={
                                                                            currentItem
                                                                                ?.options
                                                                                ?.option1
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                index
                                                                            );
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                    />
                                                                    <TextField
                                                                        fullWidth
                                                                        multiline
                                                                        label="Option b"
                                                                        name="option2"
                                                                        value={
                                                                            currentItem
                                                                                ?.options
                                                                                ?.option2
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                index
                                                                            );
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                    />
                                                                    <TextField
                                                                        fullWidth
                                                                        multiline
                                                                        label="Option c"
                                                                        name="option3"
                                                                        value={
                                                                            currentItem
                                                                                ?.options
                                                                                ?.option3
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                index
                                                                            );
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                    />
                                                                    <TextField
                                                                        fullWidth
                                                                        multiline
                                                                        label="Option d"
                                                                        name="option4"
                                                                        value={
                                                                            currentItem
                                                                                ?.options
                                                                                ?.option4
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                index
                                                                            );
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                    />
                                                                    <TextField
                                                                        fullWidth
                                                                        multiline
                                                                        label="Answer"
                                                                        name="answer"
                                                                        value={currentItem?.answer.replace(
                                                                            /\s/g,
                                                                            ''
                                                                        )}
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                index
                                                                            );
                                                                        }}
                                                                    />
                                                                </Box>
                                                            )
                                                        }}
                                                    />
                                                )
                                            )}
                                        </Stack>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        color="secondary"
                                        variant="text"
                                        onClick={addQuestion}
                                    >
                                        {' '}
                                        + Add Question
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={handleCreateQuestionsClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={handleSubmitForm}
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                                <ToastContainer />
                            </Dialog>

                            {showFileInput && (
                                <Box mt={3}>
                                    <TextField
                                        label="Video"
                                        disabled
                                        fullWidth
                                        value={formik.values.video}
                                        multiline
                                        placeholder={
                                            video?.name
                                                ? ''
                                                : formik.values.video
                                        }
                                        name="video"
                                        variant="outlined"
                                        onChange={uploadVideo}
                                        style={{
                                            marginBottom: '20px',
                                            display: 'flex',
                                            flexWrap: 'wrap'
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {video?.name && (
                                                        <Chip
                                                            style={{
                                                                maxWidth: 100
                                                            }}
                                                            label={video?.name}
                                                            onDelete={
                                                                deleteVideo
                                                            }
                                                        />
                                                    )}
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div className="upload-btn-wrapper">
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            size="small"
                                                            sx={{
                                                                display: 'flex',
                                                                gap: '4px'
                                                            }}
                                                        >
                                                            <Add
                                                                sx={{
                                                                    color: '#fff !important',
                                                                    fontSize:
                                                                        'large'
                                                                }}
                                                            />
                                                            Upload
                                                        </Button>
                                                        {/* </IconButton> */}

                                                        <input
                                                            type="file"
                                                            name="video"
                                                            onChange={
                                                                uploadVideo
                                                            }
                                                        />
                                                    </div>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Box>
                            )}
                            {showLinkInput && (
                                <Box mt={3}>
                                    <TextField
                                        label="Video Link"
                                        fullWidth
                                        value={formik.values.externalLink}
                                        multiline
                                        placeholder={formik.values.externalLink}
                                        name="externalLink"
                                        variant="outlined"
                                        onChange={(e) => handleFormChange(e)}
                                        // onChange={uploadVideo}
                                        style={{
                                            marginBottom: '20px',
                                            display: 'flex',
                                            flexWrap: 'wrap'
                                        }}
                                    />
                                </Box>
                            )}
                            <Box>
                                <TextField
                                    label="Resource Title"
                                    fullWidth
                                    value={formik.values.resourceTitle}
                                    // type="file"
                                    placeholder={formik.values.resourceTitle}
                                    name="resourceTitle"
                                    variant="outlined"
                                    style={{
                                        marginBottom: '20px'
                                    }}
                                    // onChange={formik.handleChange}
                                    onChange={(e) => {
                                        const trimmedValue =
                                            e.target.value.replace(/^\s+/, ''); // Trim spaces before any character
                                        formik.handleChange(e);
                                        formik.setFieldValue(
                                            'resourceTitle',
                                            trimmedValue
                                        );
                                    }}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Resources"
                                    disabled
                                    fullWidth
                                    name="pdf"
                                    variant="outlined"
                                    style={{
                                        marginBottom: '20px',
                                        display: 'flex',
                                        flexWrap: 'wrap'
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {console.log(
                                                    'formik.allResources',
                                                    allResources
                                                )}
                                                {allResources?.map(
                                                    (resource, index) => (
                                                        <Chip
                                                            style={{
                                                                maxWidth: 100
                                                            }}
                                                            id={index}
                                                            label={
                                                                resource?.name ||
                                                                resource?.resourseFile
                                                                    ?.split(
                                                                        'resource-'
                                                                    )
                                                                    .pop()
                                                            }
                                                            onDelete={() =>
                                                                handleDeleteResource(
                                                                    resource?._id
                                                                )
                                                            }
                                                            sx={{ ml: 1 }}
                                                        />
                                                    )
                                                )}
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div className="upload-btn-wrapper">
                                                    {/* <IconButton
                                    className="btn"
                                    variant="contained"
                                    color="secondary"
                                > */}
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="secondary"
                                                        sx={{
                                                            display: 'flex',
                                                            gap: '4px'
                                                        }}
                                                    >
                                                        <Add
                                                            sx={{
                                                                color: '#fff !important',
                                                                fontSize:
                                                                    'large'
                                                            }}
                                                        />
                                                        Upload
                                                    </Button>
                                                    {/* </IconButton> */}

                                                    <input
                                                        type="file"
                                                        name="resource"
                                                        onChange={
                                                            uploadResource
                                                        }
                                                    />
                                                </div>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                            <Box display="flex" gap={2}>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        // setShouldReset(false);
                                        formik.handleSubmit();
                                    }}
                                    variant="contained"
                                    color="secondary"
                                >
                                    {isEdit ? 'Save Lecture' : 'Submit Lecture'}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    disabled={!lectureId && disabled}
                                    startIcon={<Add />}
                                    onClick={() => setShowQuestionForm(true)}
                                >
                                    Add Video Assessment
                                </Button>
                            </Box>

                            {/* {showForm && (
                        <>
                            <CreateExercise sectionId={sectionId} />
                            {/* <McqDashbooad
                            sectionId={sectionId}
                        ></McqDashbooad> *
                        </>
                    )} */}
                        </form>
                    </FormikProvider>
                    <ToastContainer />
                    <Dialogue
                        name="lesson"
                        open={open}
                        handleDelete={handleDelete}
                        handleClose={handleClose}
                    />
                </Box>
            )}
        </>
    );
};

export default Lesson;
