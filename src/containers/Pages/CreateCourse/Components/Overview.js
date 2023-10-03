import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
    resetCurrentScreenForm,
    setCurrentScreenId,
    setCurrentScreenName,
    setCurrentScreenState,
    setShowAddButtons
} from '../Slices/currentScreen';
import {
    getIndividualCourse,
    setCurrentSectionId
} from '../Slices/currentCourse';
import { useEffect } from 'react';

const OverView = () => {
    const { courseId } = useParams();
    const currentCourse = useSelector((state) => state?.currentCourse?.data);
    const shouldUpdate = useSelector((state) => state?.currentScreen?.id);
    const shouldUpdateScreen = useSelector(
        (state) => state?.currentScreen?.isLoading
    );
    const currentScreenName = useSelector(
        (state) => state?.currentScreen?.name
    );
    const location = useLocation();
    const dispatch = useDispatch();

    const enableManual = (sectionId) => {
        dispatch(resetCurrentScreenForm(false));
        dispatch(setCurrentScreenName('manual'));
        dispatch(setCurrentScreenId(sectionId));
        dispatch(setCurrentSectionId(sectionId));
        dispatch(setCurrentScreenState(true));
        dispatch(setShowAddButtons(true));
    };

    const displayOverview = () => {
        dispatch(resetCurrentScreenForm(false));
        dispatch(setCurrentScreenName('overview'));
        courseId && dispatch(setCurrentScreenState(true));
        courseId && dispatch(setCurrentScreenId(courseId));
        courseId
            ? dispatch(setShowAddButtons(true))
            : dispatch(setShowAddButtons(false));
    };
    const viewLecture = (lectureid, sectionid) => {
        dispatch(resetCurrentScreenForm(false));
        dispatch(setCurrentScreenName('lesson'));
        dispatch(setCurrentScreenId(lectureid));
        dispatch(setCurrentSectionId(sectionid));
        dispatch(setCurrentScreenState(true));
        dispatch(setShowAddButtons(true));
    };
    const viewExercise = (excerciseId, sectionid) => {
        dispatch(setCurrentScreenName('exercise'));
        dispatch(setCurrentSectionId(sectionid));
        dispatch(setCurrentScreenId(excerciseId));
        dispatch(setCurrentScreenState(true));
        dispatch(setShowAddButtons(true));
    };

    const setupForEditCourse = () => {
        console.log('CourseId in edit course useEffect', courseId);
        if (courseId) {
            dispatch(getIndividualCourse(courseId));
        }
    };
    useEffect(() => {
        setupForEditCourse();
    }, [shouldUpdate, currentScreenName, shouldUpdateScreen]);

    return (
        <Card style={{ width: '100%' }}>
            <CardHeader
                title="Overview"
                sx={{ mb: 1, cursor: 'pointer' }}
                onClick={displayOverview}
            />
            <Divider />
            <CardContent>
                <Typography variant="body1">Manuals</Typography>
                {location.pathname === '/dashboard/courses/create-course' ||
                    currentCourse?.sections?.map((section) => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                            >
                                <Typography
                                    // varant="h3"
                                    onClick={() => enableManual(section._id)}
                                >
                                    {section.title}{' '}
                                    {`(${section?.lectures?.length})`}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box mt={1}>
                                    {}
                                    {section?.question?.length > 0 ||
                                    section?.lectures?.length > 0 ? (
                                        <Typography variant="h5" sx={{ my: 2 }}>
                                            Lectures
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="body1"
                                            color="#999999"
                                        >
                                            This Manual is empty
                                        </Typography>
                                    )}
                                    {section?.lectures?.map(
                                        (lecture, index) => (
                                            <Typography
                                                variant="body1"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    viewLecture(
                                                        lecture._id,
                                                        section._id
                                                    )
                                                }
                                            >
                                                {index + 1}. {lecture.title}
                                            </Typography>
                                        )
                                    )}
                                    {section?.question.length > 0 && (
                                        <Typography variant="h5" sx={{ my: 2 }}>
                                            Exercises
                                        </Typography>
                                    )}

                                    {section?.question?.map(
                                        (question, index) => (
                                            <>
                                                {console.log(
                                                    'question in map',
                                                    question
                                                )}
                                                <Typography
                                                    variant="body1"
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={() =>
                                                        viewExercise(
                                                            question._id,
                                                            section._id
                                                        )
                                                    }
                                                >
                                                    {index + 1}.{' '}
                                                    {question.question}
                                                </Typography>
                                            </>
                                        )
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
            </CardContent>
        </Card>
    );
};

export default OverView;
