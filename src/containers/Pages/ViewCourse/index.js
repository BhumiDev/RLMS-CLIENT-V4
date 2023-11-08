import {
    Box,
    Button,
    Grid,
    // Card,
    // CardContent,
    // CardActions,
    Dialog,
    Typography,
    useTheme,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Rating,
    Avatar,
    CircularProgress
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import React, { useEffect, useState, useCallback } from 'react';

import Axios from 'axios';

import { checkAlreadyRequested, sendRequest } from '../../../API/Request';
// import { deleteCourse } from '../../../API/Course';
import {
    addToRecentlyDeleted,
    createReviews,
    editReview,
    getReviews
} from '../../../API/Course';
import { deleteSection } from '../../../API/Lesson';

// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
import SecondaryHeader from '../../../common/components/SecondaryHeader';

import CircularProgressWithLabel from '../../../common/components/CircularProgress';

import BreadCrumb from '../../../common/components/Breadcrumb';

// import courseDetail from '../../../assets/images/course.png';
import Module from './ModuleList';

import Apiconfig from '../../../config/ApiConfig';
import jwtDecode from 'jwt-decode';
import { array } from 'prop-types';
import parse from 'html-react-parser';
import DeleteIcon from '@mui/icons-material/Delete';
import LabContainer from './Components/LabContainer';
import EdiText from 'react-editext';
import { useSelector } from 'react-redux';
import { setCurrentScreenLoading } from '../CreateCourse/Slices/currentScreen';
import { store } from '../../../store';

const ViewCourse = () => {
    const loader = useSelector((state) => state?.currentScreen?.isLoading);
    console.log('loader', loader);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const fromMyCourse = location?.state?.myCourse;
    console.log('fromMyCourse of view Course', fromMyCourse);
    const { courseId } = useParams();
    const token = localStorage.getItem('token');
    let user = token && jwtDecode(token);

    const theme = useTheme();
    // const [courseId,setCourseId] = useEffect(coursetemp)
    const [course, setCourse] = useState([]);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(null);

    const [disabled, setDisabled] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [submitReviewDisabled, setSubmitReviewDisabled] = useState(true);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [allReviews, setAllReviews] = useState([]);
    const [fake, setFake] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [alreadyRequested, setAlreadyRequested] = useState(false);

    const getCourse = useCallback(async () => {
        store.dispatch(setCurrentScreenLoading(true));
        try {
            const res = await Axios.get(
                `${Apiconfig.course.getCourse}/${courseId}`,
                {
                    headers: { authorization: `Bearer ${token}` }
                }
            );

            // console.log('response of get individual course', res.data.data);
            console.log('response of get individual course', res);

            setCourse(res.data.data);
            store.dispatch(setCurrentScreenLoading(false));
        } catch (err) {
            console.log(err);
        }
    }, [courseId, token]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleReviewFieldChange = (e) => {
        const updatedReview = e.target.value.replace(/^\s+/, '');

        setReview(updatedReview);
        setSubmitReviewDisabled(updatedReview === '');
    };

    // const handleReviewFieldChangeKeyDown = (e) => {
    //     e.preventDefault(); // Prevent line break in the textarea
    //     if (e.ctrlKey && e.key === 'Enter') {
    //         handleReviewFieldChange(e)
    //     }}

    /////////////////////////////////////////////////////

    // const handleDelete = () => {
    //     console.log('courseId od delete button', courseId);
    //     deleteCourse(courseId, navigate, toast);

    //     setOpen(false);
    // };
    const recentlyDeleted = () => {
        console.log('courseId od delete button', courseId);
        addToRecentlyDeleted(courseId, navigate, toast);

        //  deleteCourse(courseId, navigate, toast);
        setOpen(false);
    };

    const handleSectionDelete = async (sectionId) => {
        console.log('handleSectionDelete', sectionId);
        await deleteSection(sectionId, toast);

        setOpen2(null);
    };

    const checkRequest = async () => {
        const res = await checkAlreadyRequested(courseId);
        console.log('res of check request', res);
        setAlreadyRequested(res?.data?.alreadyRequested);
    };

    useEffect(() => {
        checkRequest();
    }, [fake]);

    const handleSendRequest = async (id) => {
        setDisabled(true);
        console.log('idddd', id);
        await sendRequest(id);
        toast.success('Request sent Successfully!');
        setDisabled(false);
        setFake(!fake);
    };

    const reviewData = {
        stars: rating,
        review
    };

    const postReview = async () => {
        const res = await createReviews(reviewData, courseId);
        console.log('response of post review', res);
        setFake(!fake);
        setReview('');
        setRating(0);
    };
    const handleGiveRating = (event, newValue) => {
        const updatedReview = newValue;
        setRating(updatedReview);
        setSubmitDisabled(updatedReview === null);
    };

    const getAllReviews = async () => {
        const res = await getReviews(courseId);
        console.log('res of all reviews', res);
        setAllReviews(res.data.data);
    };

    const updateReview = async (reviewId, data, starsData) => {
        console.log('data and reviewId', data, reviewId, starsData);
        const res = await editReview(data, reviewId, starsData);
        console.log('res of edit api', res);
        toast.success(res.data.message);
        setFake(!fake);
    };
    useEffect(() => {
        updateReview();
    }, [fake]);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const visibleReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);

    const handleToggleReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    useEffect(() => {
        getCourse();
        getAllReviews();
    }, [getCourse, open2, fake, showAllReviews]);

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
                    mx={{ xs: 4, md: 12 }}
                    sx={{ minHeight: 'calc(100vh - 125px)' }}
                >
                    {/* <Box mb={{ md: 3, lg: 6 }}>
                <BreadCrumb breadItems={breadcrumb} />
            </Box> */}

                    <Grid
                        container
                        md={{ md: 3, lg: 6 }}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Button
                            disableRipple
                            size="small"
                            startIcon={<KeyboardBackspaceIcon />}
                            sx={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '10px 0px !important',
                                margin: '10px 0px ',
                                color: 'primary.light',
                                '&:hover': {
                                    background: 'none'
                                }
                            }}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>

                        {user?.role === 'instructor' && (
                            <Grid item>
                                <Box sx={{ margin: '15px 0' }}>
                                    <Button
                                        variant="outlined"
                                        endIcon={<DeleteIcon />}
                                        onClick={handleClickOpen}
                                        sx={{
                                            color: 'secondary.main',
                                            borderColor: 'secondary.main'
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure you want to delete
                                                this course ?
                                            </DialogContentText>
                                        </DialogContent>

                                        <DialogActions>
                                            <Button
                                                onClick={handleClose}
                                                autoFocus
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={recentlyDeleted}
                                                autoFocus
                                                variant="contained"
                                                color="error"
                                                size="small"
                                            >
                                                Delete
                                                <DeleteIcon />
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    <Grid container spacing={{ md: 3, lg: 4 }}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                [theme.breakpoints.up('sm')]: {
                                    display: 'none'
                                }
                            }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                my={3}
                            >
                                <Typography variant="h4">
                                    {course?.title}
                                </Typography>
                                <CircularProgressWithLabel value={80} />
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <img
                                src={`${Apiconfig.url}${course?.thumbnail}`}
                                alt="course-thumb"
                                style={{ borderRadius: '4px' }}
                            />
                            {/* <img src={Apiconfig.url+ course[0].thumbnail} alt="course-thumb" /> */}
                        </Grid>
                        <Grid item md={8} sm={12} mt={{ xs: 4, sm: 4 }}>
                            <Box
                                sx={{
                                    [theme.breakpoints.down('sm')]: {
                                        display: 'none'
                                    }
                                }}
                            >
                                <SecondaryHeader
                                    title={`${course?.courseName} (${course?.courseCode})`}
                                    endText="10% Complete"
                                    hideEnd={fromMyCourse}
                                />
                            </Box>

                            <Box mt={3}>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    <b>Description</b>
                                </Typography>
                                <Typography variant="body1">
                                    {parse(`${course?.description}`)}
                                </Typography>
                                {/* <Typography variant="body1" sx={{ my: 2 }}>
                            {' '}
                            <b>Prerequisites</b>
                        </Typography>

                        <Typography variant="body1" sx={{ ml: 4 }}>
                            {' '}
                            <ul>
                                <li>
                                    To take a trivial example, which of us ever
                                    undertakes laborious physical exercise,
                                    except to obtain some advantage from it? But
                                    who has any right to find fault with a man
                                    who chooses to enjoy a pleasure.
                                </li>
                                <li>
                                    These cases are perfectly simple and easy to
                                    distinguish. In a free hour, when our power
                                    of choice is untrammelled and when nothing
                                    prevents our being able to do what we like
                                    best.
                                </li>
                            </ul>
                        </Typography> */}
                            </Box>
                        </Grid>
                    </Grid>
                    {/* Virtual Labs */}
                    {/* <Box mt={{ xs: 4, md: 4, lg: 8 }}>
                <SecondaryHeader
                    title="Virtual Labs"
                    endText="(3/12)"
                    hideEnd={fromMyCourse}
                />
                <AliceCarousel items={items} responsive={responsive} />
            </Box> */}
                    {/* <Box mt={{ xs: 4, sm: 4, md: 4, lg: 8 }}>
                <SecondaryHeader
                    title="Virtual Labs"
                    endText={`${course?.vm?.length}`}
                />
                <Grid container spacing={3} mb={{ sm: 2, xs: 2, md: 0 }}>
                    {course?.vm?.map((lab) => (
                        <Grid item md={3} sm={6} xs={12}>
                            <LabContainer
                                data={lab}
                                setFake={setFake}
                                fake={fake}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box> */}
                    <Box mt={{ xs: 4, sm: 4, md: 4, lg: 8 }}>
                        <SecondaryHeader
                            title="Modules"
                            endText={`${course?.sections?.length}`}
                            // hideEnd={fromMyCourse}
                        />
                        {course?.sections?.map((moduleData, index) => (
                            <Module
                                courseCategory={course?.majorCategory}
                                courseId={courseId}
                                authorId={course.author}
                                moduleData={moduleData}
                                fromMyCourse={fromMyCourse}
                                setOpen2={setOpen2}
                                open2={open2}
                                serialNumber={index + 1}
                                key={moduleData._id}
                                handleSectionDelete={handleSectionDelete}
                                id={moduleData._id}
                            />
                        ))}

                        {/* <Module fromMyCourse={fromMyCourse} />
                <Module fromMyCourse={fromMyCourse} />
                <Module fromMyCourse={fromMyCourse} />
                <Module fromMyCourse={fromMyCourse} />
                <Module fromMyCourse={fromMyCourse} /> */}
                    </Box>

                    {fromMyCourse === 'allCourse' && user?.role === 'student' && (
                        <Box>
                            {!alreadyRequested ? (
                                <Button
                                    onClick={() => handleSendRequest(courseId)}
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    disabled={disabled}
                                >
                                    Request to Enroll
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                >
                                    Request Already Sent
                                </Button>
                            )}
                        </Box>
                    )}

                    {user?.role === 'student' && (
                        <Box item mb={5} mt={2}>
                            {/* <SecondaryHeader
                        title="Reviews"
                    /> */}
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                mb={3}
                            >
                                {allReviews?.length === 0 ? (
                                    'No reviews yet!'
                                ) : (
                                    <Typography>
                                        {allReviews?.length} reviews
                                    </Typography>
                                )}
                                {fromMyCourse !== 'allCourse' && (
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={() =>
                                            setShowReview(!showReview)
                                        }
                                    >
                                        Leave a Review
                                    </Button>
                                )}
                            </Box>
                            {showReview && (
                                <>
                                    <Grid item>
                                        {fromMyCourse !== 'allCourse' && (
                                            <>
                                                <Rating
                                                    size="large"
                                                    name="simple-controlled"
                                                    value={rating}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) =>
                                                        handleGiveRating(
                                                            event,
                                                            newValue
                                                        )
                                                    }
                                                />
                                                <Grid
                                                    item
                                                    display="flex"
                                                    width="100%"
                                                    gap={3}
                                                    alignItems="center"
                                                    justifyContent="flex-start"
                                                >
                                                    <TextField
                                                        fullWidth
                                                        // rows={4}
                                                        multiline
                                                        // size="small"
                                                        label="Enter Review"
                                                        value={review}
                                                        onChange={
                                                            handleReviewFieldChange
                                                        }
                                                        height="200px !important"
                                                        disabled={
                                                            submitDisabled
                                                        }
                                                    />

                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        sx={{
                                                            padding:
                                                                '16px !important'
                                                        }}
                                                        onClick={postReview}
                                                        disabled={
                                                            submitReviewDisabled
                                                        }
                                                    >
                                                        Submit
                                                    </Button>
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                </>
                            )}
                            <Grid mt={2}>
                                {visibleReviews.map((review) => (
                                    <React.Fragment key={review._id}>
                                        <Grid
                                            item
                                            display="flex"
                                            gap={2}
                                            alignItems="center"
                                        >
                                            <Avatar
                                                src={
                                                    Apiconfig.url +
                                                    review?.user?.profilePath
                                                }
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{ fontSize: '13px' }}
                                            >
                                                {review.user.name}
                                            </Typography>
                                            {user?._id === review.user._id ? (
                                                <Rating
                                                    size="small"
                                                    name="simple-controlled"
                                                    value={review.stars}
                                                    readOnly={false}
                                                    onChange={(
                                                        event,
                                                        starsData
                                                    ) => {
                                                        updateReview(
                                                            review._id,
                                                            review.review,
                                                            starsData
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <Rating
                                                    size="small"
                                                    name="simple-controlled"
                                                    value={review.stars}
                                                    readOnly={true}
                                                />
                                            )}
                                        </Grid>
                                        {user?._id === review.user._id ? (
                                            <EdiText
                                                cancelOnUnfocus
                                                type="text"
                                                viewProps={{
                                                    style: {
                                                        fontSize: '14px',
                                                        marginLeft: '65px'
                                                    }
                                                }}
                                                onCancel={(v) =>
                                                    console.log(
                                                        'CANCELLED: ',
                                                        v
                                                    )
                                                }
                                                onSave={(v) => {
                                                    console.log('vvv', v);
                                                    updateReview(
                                                        review._id,
                                                        v,
                                                        review.stars
                                                    );
                                                }}
                                                // Call updateReview when "Control + Enter" is pressed
                                                onKeyDown={(e) => {
                                                    if (
                                                        e.ctrlKey &&
                                                        e.key === 'Enter'
                                                    ) {
                                                        //   if (user?._id === review.user._id) {
                                                        updateReview(
                                                            review._id,
                                                            review.review,
                                                            review.stars
                                                        );
                                                        //   }
                                                    }
                                                }}
                                                value={review.review}
                                            />
                                        ) : (
                                            <Typography
                                                variant="body1"
                                                sx={{ marginLeft: 5 }}
                                            >
                                                {review.review}
                                            </Typography>
                                        )}
                                    </React.Fragment>
                                ))}

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    {allReviews?.length === 0 ? (
                                        ''
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            color="primary.light"
                                            sx={{
                                                fontSize: '13px !important',
                                                fontWeight: 600,
                                                textDecoration: 'underline',
                                                cursor: 'pointer'
                                            }}
                                            onClick={handleToggleReviews}
                                        >
                                            {showAllReviews
                                                ? 'See less reviews'
                                                : 'See more reviews'}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        </Box>
                    )}

                    <ToastContainer />
                </Box>
            )}
        </>
    );
};

export default ViewCourse;
