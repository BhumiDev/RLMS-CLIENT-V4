import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    LinearProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
    // Pagination
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Apiconfig from '../../../config/ApiConfig';
import jwtDecode from 'jwt-decode';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreIcon from '@mui/icons-material/Restore';
import { ToastContainer, toast } from 'react-toastify';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import Pagination from '@mui/material/Pagination';
// import usePagination from './hooks/pagination';
import {
    addToRecent,
    myCourses,
    recoverCourse,
    deleteCourse,
    getReviews
} from '../../../API/Course';
import { useLocation } from 'react-router-dom';
import { idID } from '@mui/material/locale';
// import AddMachineDialogBox from './Component/AddMachineDialog';
import AddMachineDialogTest from './Component/AddMachineDialogTest';
import { formatDuration } from '../../../containers/Pages/AdminDashboard/Main';
import { setCurrentScreenName } from '../../../containers/Pages/CreateCourse/Slices/currentScreen';
import { useDispatch } from 'react-redux';

const GridView = ({
    data,
    browseCourses,
    myCourse,
    searchData,
    network,
    page,
    setPage,
    count,
    setCount,
    getConversations,
    myCourses
}) => {
    console.log('data is', data);

    const [allReviews, setAllReviews] = useState([]);
    const [deleteCourseId, setDeleteCourseId] = useState([]);

    const [courseId, setCourseId] = useState('');
    const [sections, setSections] = useState([]);
    let [addMachineDialogState, setDialogState] = useState(false);
    // const PER_PAGE = 15;

    // const count = Math.ceil(data?.length / PER_PAGE);
    // const _DATA = usePagination(data, PER_PAGE);

    console.log('sections', sections);

    const dispatch = useDispatch();

    const handleChange = (e, p) => {
        setPage(p);
        {
            myCourse ? myCourses(p) : getConversations(p);
        }
        // data.jump(p);
    };

    console.log('page', page);
    const addMachine = (id, sections) => {
        console.log('course id in params', id);
        setCourseId(id);
        setSections(sections);
        // courseId = id
        setDialogState(true);
    };
    const closeMachineDialog = () => setDialogState(false);

    const location = useLocation();
    const navigate = useNavigate();

    // console.log('LOOATION PATH', location.pathname);

    if (location.pathname === '/dashboard/courses/recently-deleted') {
        console.log('hellooooo boooom');
    }

    const handleRecover = (id) => {
        console.log('idd of course', id);
        recoverCourse(id, navigate, toast);
    };

    // const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const [open, setOpen] = useState(false);

    const handleClickOpen = (course) => {
        setDeleteCourseId(course);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeletePermanently = (courseId) => {
        console.log('courseID', courseId);
        deleteCourse(courseId, navigate, toast);

        setOpen(false);
    };

    const theme = useTheme();
    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);
    const handleTotalSection = (section) => {
        // console.log('sextion', section);
        let count = 0;
        for (let i of section) {
            count += i?.lectures?.length;
        }

        // console.log('value of count', count);
        return count ? count : 0;
    };

    // console.log('searchData', searchData);
    // console.log('machine err', <AddMachineDialogBox />);

    if (data?.length === 0) {
        return (
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: 'auto',
                    paddingTop: '40px'
                }}
            >
                {(!searchData && user?.role === 'student') ||
                (!searchData && user?.role === 'instructor') ? (
                    <h1>Empty!</h1>
                ) : (
                    <h1>Not Found!</h1>
                )}
            </Box>
        );
    }

    // useEffect(() => {
    //     // getAllReviews();
    // }, []);

    // useEffect(() => {
    //     setPage();
    // });

    console.log('courseId', courseId);

    // console.log('allreviews', allReviews);

    return (
        <Box width="100%" mt={{ md: 6, sm: 1 }}>
            {/* <h1 style={{textAlign: "center", marginTop: "10px"}} >Search Result</h1> */}
            <Grid container display="flex" spacing={4}>
                {/* {console.log("qwerty", data)} */}
                {data?.map((course, i) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={user?.role === 'instructor' ? 4 : 3}
                        lg={user?.role === 'instructor' ? 4 : 3}
                        key={i}
                        mb={7}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                image={Apiconfig.url + course.thumbnail}
                                alt="Course Thumbnail"
                            />
                            {/* 
                            {!browseCourses || (
                                <LinearProgress
                                    variant="determinate"
                                    color="secondary"
                                    sx={{
                                        [theme.breakpoints.up('sm')]: {
                                            display: 'none'
                                        }
                                    }}
                                    value={course.progress}
                                />
                            )} */}
                            <CardContent sx={{ px: 2 }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    spacing={1}
                                >
                                    <Chip label={course.majorCategory} />
                                    {course.duration &&
                                    course.duration !== 0 &&
                                    course.duration !== '0 Hours' ? (
                                        <Chip
                                            label={formatDuration(
                                                course.duration
                                            )}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </Stack>

                                {/* ---------------------Mobile only content---------------------- */}
                                <Box
                                    sx={{
                                        [theme.breakpoints.up('sm')]: {
                                            display: 'none'
                                        }
                                    }}
                                >
                                    <Link
                                        to={{
                                            pathname: `/dashboard/courses/view-course/${course._id}`
                                        }}
                                        state={
                                            myCourse
                                                ? {
                                                      myCourse: 'myCourse'
                                                  }
                                                : {
                                                      myCourse: 'allCourse'
                                                  }
                                        }
                                    >
                                        <Typography
                                            // px={2}
                                            sx={{
                                                mt: 1,
                                                maxWidth: '100px',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden'
                                            }}
                                            gutterBottom
                                            // variant="h4"
                                            color="text.primary"
                                            fontSize={17}
                                            fontWeight={500}
                                        >
                                            {course?.courseName
                                                .charAt(0)
                                                .toUpperCase() +
                                                course?.courseName.slice(1)}
                                        </Typography>
                                    </Link>

                                    {location.pathname ===
                                        '/dashboard/courses/my-courses' && (
                                        <Link
                                            to={{
                                                pathname:
                                                    '/dashboard/courses/track-progress'
                                            }}
                                            state={{
                                                course: course
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '17px',
                                                    fontWeight: '400',
                                                    color: 'primary.light'
                                                }}
                                            >
                                                <DonutLargeIcon
                                                    sx={{
                                                        fontSize: '17px',
                                                        marginBottom: '-2px',
                                                        marginRight: '5px'
                                                    }}
                                                />
                                                Track Progress
                                            </Typography>
                                        </Link>
                                    )}

                                    <Grid
                                        mt={1.5}
                                        item
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        gap={2}
                                    >
                                        {user?.role === 'instructor' &&
                                            location?.pathname ===
                                                '/dashboard/courses/my-courses' && (
                                                <>
                                                    <Link
                                                        to={{
                                                            pathname: `/dashboard/courses/edit-course/${course._id}`
                                                        }}
                                                        state={{
                                                            isEdit: true,
                                                            courseId: course._id
                                                        }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            color="view"
                                                            variant="outlined"
                                                            style={{
                                                                fontWeight: 600
                                                            }}
                                                            onClick={dispatch(
                                                                setCurrentScreenName(
                                                                    'overview'
                                                                )
                                                            )}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        color="attend"
                                                        size="small"
                                                        variant="outlined"
                                                        style={{
                                                            fontWeight: 600
                                                        }}
                                                        onClick={() =>
                                                            addMachine(
                                                                course._id,
                                                                course?.sections
                                                            )
                                                        }
                                                    >
                                                        Add Machine
                                                    </Button>
                                                </>
                                            )}
                                    </Grid>
                                </Box>

                                <Link
                                    to={{
                                        pathname: `/dashboard/courses/view-course/${course._id}`
                                    }}
                                    state={
                                        myCourse
                                            ? {
                                                  myCourse: 'myCourse'
                                              }
                                            : {
                                                  myCourse: 'allCourse'
                                              }
                                    }
                                >
                                    <Typography
                                        color="text.primary"
                                        onClick={
                                            myCourse
                                                ? () => addToRecent(course._id)
                                                : null
                                        }
                                        px={0}
                                        sx={{
                                            mt: 1,
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            [theme.breakpoints.down('sm')]: {
                                                display: 'none'
                                            }
                                        }}
                                        gutterBottom
                                        variant="h4"
                                        fontSize={17}
                                        fontWeight={500}
                                    >
                                        {course?.courseName
                                            .charAt(0)
                                            .toUpperCase() +
                                            course?.courseName.slice(1)}
                                    </Typography>
                                </Link>
                                <Box
                                    px={0}
                                    display="flex"
                                    justifyContent=""
                                    sx={{
                                        [theme.breakpoints.down('sm')]: {
                                            display: 'none'
                                        }
                                    }}
                                >
                                    <Typography variant="caption">
                                        {course?.sections?.length} Modules
                                    </Typography>
                                    <Typography variant="caption">
                                        <p
                                            style={{
                                                marginLeft: '10px'
                                            }}
                                        >
                                            {handleTotalSection(
                                                course?.sections
                                            )}{' '}
                                            Lessons
                                        </p>
                                    </Typography>
                                    {/* <Typography ml="10px" variant="caption">
                                        Labs
                                    </Typography> */}
                                </Box>
                                <Box>
                                    <Typography variant="caption">
                                        {course?.author?.name}
                                    </Typography>
                                </Box>
                            </CardContent>

                            {/* ---------------------End of Mobile only content---------------------- */}
                            {/*------------------------- Desktop only content---------------------------- */}

                            <Box>
                                <Box
                                    sx={{
                                        [theme.breakpoints.down('sm')]: {
                                            display: 'none'
                                        }
                                    }}
                                >
                                    {/* {browseCourses || (
                                    <LinearProgress
                                        variant="determinate"
                                        color="secondary"
                                        sx={{ height: 10 }}
                                        value={course?.progress}
                                    />
                                )} */}
                                    {/* 
                                {browseCourses ? (
                                    <Box
                                        display="flex"
                                        justifyContent="end"
                                        ml={3.5}
                                        py={2}
                                        pr={2}
                                    >
                                        <Link
                                            to={{
                                                pathname: `/dashboard/view-course/${course._id}`
                                            }}
                                            state={
                                                myCourse
                                                    ? { myCourse: 'myCourse' }
                                                    : { myCourse: 'allCourse' }
                                            }
                                        >
                                            <Stack
                                                direction="row"
                                                alignContent="flex-start"
                                            >
                                                <Box ml={2} mt={0.5}>
                                                    <Button
                                                        color="secondary"
                                                        variant="outlined"
                                                        style={{
                                                            width: '80px',
                                                            height: '40px',
                                                            p: 2
                                                        }}
                                                    >
                                                        View
                                                    </Button>
                                                </Box>
                                            </Stack>
                                        </Link>
                                    </Box>
                                ) : ( */}
                                    <>
                                        <Grid
                                            container
                                            display="flex"
                                            justifyContent="space-between"
                                            gap={1}
                                            py={1}
                                            px={1}
                                            // pl={2}
                                            // pr={2}
                                        >
                                            {location.pathname ===
                                                '/dashboard/courses/recently-deleted' && (
                                                <>
                                                    <Grid item>
                                                        <Box>
                                                            <Button
                                                                variant="outlined"
                                                                color="secondary"
                                                                onClick={() => {
                                                                    // console.log("course._id1", course._id, course)
                                                                    handleClickOpen(
                                                                        course
                                                                    );
                                                                }}
                                                            >
                                                                Delete
                                                                Permanently{' '}
                                                                <DeleteForeverIcon />
                                                            </Button>
                                                            <Dialog
                                                                open={open}
                                                                onClose={
                                                                    handleClose
                                                                }
                                                                aria-labelledby="alert-dialog-title"
                                                                aria-describedby="alert-dialog-description"
                                                            >
                                                                <DialogTitle id="alert-dialog-title">
                                                                    {
                                                                        'Delete course'
                                                                    }
                                                                </DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText id="alert-dialog-description">
                                                                        Do you
                                                                        want to
                                                                        delete
                                                                        total
                                                                        Seconds
                                                                        Course
                                                                        permanently?
                                                                        totalSeconds
                                                                        course
                                                                        will be
                                                                        deleted
                                                                        from all
                                                                        the
                                                                        catalogues
                                                                        and
                                                                        sections
                                                                    </DialogContentText>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button
                                                                        size="small"
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                        color="secondary"
                                                                        variant="outlined"
                                                                    >
                                                                        cancel
                                                                    </Button>
                                                                    <Button
                                                                        size="small"
                                                                        color="error"
                                                                        variant="contained"
                                                                        onClick={() => {
                                                                            console.log(
                                                                                'course._id',
                                                                                deleteCourseId?._id
                                                                            );
                                                                            handleDeletePermanently(
                                                                                deleteCourseId?._id
                                                                            );
                                                                        }}
                                                                        autoFocus
                                                                    >
                                                                        Delete
                                                                        <DeleteForeverIcon />
                                                                    </Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                        </Box>
                                                        {/* <Button
                                                    color="secondary"
                                                    variant="outlined"
                                                   
                                                    >
                                                    Delete Permanently <DeleteForeverIcon/>
                                                </Button> */}
                                                    </Grid>

                                                    <Grid item>
                                                        <Button
                                                            color="secondary"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                handleRecover(
                                                                    course._id
                                                                );
                                                            }}
                                                        >
                                                            Recover{' '}
                                                            <RestoreIcon />
                                                        </Button>
                                                    </Grid>
                                                </>
                                            )}
                                            <Grid
                                                item
                                                mb={1}
                                                display="flex"
                                                alignItems="flex start"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                                sx={{
                                                    width: '100%'
                                                }}
                                            >
                                                {location.pathname ===
                                                '/dashboard/courses/my-courses' ? (
                                                    <Link
                                                        to={{
                                                            pathname:
                                                                '/dashboard/courses/track-progress'
                                                        }}
                                                        state={{
                                                            course: course
                                                        }}
                                                    >
                                                        <Typography
                                                            pl={1}
                                                            sx={{
                                                                fontSize:
                                                                    '17px',
                                                                fontWeight:
                                                                    '400',
                                                                color: 'primary.light',
                                                                marginBottom: 1
                                                            }}
                                                        >
                                                            <DonutLargeIcon
                                                                sx={{
                                                                    fontSize:
                                                                        '17px',
                                                                    marginBottom:
                                                                        '-2px',
                                                                    marginRight:
                                                                        '8px'
                                                                }}
                                                            />
                                                            Track Progress
                                                        </Typography>
                                                    </Link>
                                                ) : (
                                                    ''
                                                )}
                                                <Grid
                                                    item
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    gap={2}
                                                    px={1}
                                                >
                                                    {user?.role ===
                                                        'instructor' &&
                                                        location?.pathname ===
                                                            '/dashboard/courses/my-courses' && (
                                                            <>
                                                                <Link
                                                                    to={{
                                                                        pathname: `/dashboard/courses/edit-course/${course._id}`
                                                                    }}
                                                                    state={{
                                                                        isEdit: true,
                                                                        courseId:
                                                                            course._id
                                                                    }}
                                                                >
                                                                    <Button
                                                                        size="small"
                                                                        color="view"
                                                                        variant="outlined"
                                                                        style={{
                                                                            fontWeight: 600
                                                                        }}
                                                                        onClick={dispatch(
                                                                            setCurrentScreenName(
                                                                                'overview'
                                                                            )
                                                                        )}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                </Link>
                                                                <Button
                                                                    color="attend"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    style={{
                                                                        fontWeight: 600
                                                                    }}
                                                                    onClick={() =>
                                                                        addMachine(
                                                                            course._id,
                                                                            course?.sections
                                                                        )
                                                                    }
                                                                >
                                                                    Add Machine
                                                                </Button>
                                                            </>
                                                        )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                    {/* )} */}
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <AddMachineDialogTest
                open={addMachineDialogState}
                setOpen={addMachine}
                handleClose={closeMachineDialog}
                courseId={courseId}
                sections={sections}
            />
            {/* <AddMachineDialogBox open={addMachineDialogState} setOpen={addMachine}/> */}
            <ToastContainer />

            <Box display="flex" justifyContent="center" mb={5}>
                <Pagination
                    color="secondary"
                    variant="outlined"
                    count={count}
                    // setCount = {setCount}
                    page={page}
                    // setPage = {setPage}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
};

GridView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    browseCourses: PropTypes.bool.isRequired,
    myCourse: PropTypes.bool.isRequired
};

export default GridView;
