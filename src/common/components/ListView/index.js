import * as React from 'react';
import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Chip,
    Stack,
    Button,
    TextField,
    LinearProgress
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Apiconfig from '../../../config/ApiConfig';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import jwtDecode from 'jwt-decode';
import Pagination from '@mui/material/Pagination';
import { ToastContainer, toast } from 'react-toastify';
// import usePagination from '../GridView/hooks/pagination';
import AddMachineDialogTest from '../GridView/Component/AddMachineDialogTest';
import { useDispatch } from 'react-redux';
import { setCurrentScreenName } from '../../../containers/Pages/CreateCourse/Slices/currentScreen';

const handleTotalSection = (section) => {
    // console.log('sextion', section);
    let count = 0;
    for (let i of section) {
        console.log(i.lectures.length);
        count += i.lectures.length;
    }

    // console.log('value of count', count);
    return count;
};

const ListView = ({
    data,
    myCourse,
    page,
    setPage,
    count,
    setCount,
    getConversations,
    myCourses
}) => {
    // let [page, setPage] = useState(1);
    // const PER_PAGE = 12;
    const [courseId, setCourseId] = useState('');
    let [addMachineDialogState, setDialogState] = useState(false);

    // const count = Math.ceil(data?.length / PER_PAGE);
    // const _DATA = usePagination(data, PER_PAGE);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e, p) => {
        setPage(p);
        {
            myCourse ? myCourses(p) : getConversations(p);
        }
        // _DATA.jump(p);
    };
    const addMachine = (id) => {
        console.log('course id in params', id);
        setCourseId(id);
        // courseId = id
        setDialogState(true);
    };
    const closeMachineDialog = () => setDialogState(false);

    const theme = useTheme();

    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);

    return (
        <>
            {data?.map((course) => (
                <Grid
                    container
                    spacing={2}
                    key={course.id}
                    alignItems="center"
                    mb={7}
                    sx={{
                        py: 2,
                        position: 'relative',
                        '&:before': {
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: 'rgb(25 49 79 / 20%)',
                            content: '""',
                            width: '100%',
                            height: '0.2px',
                            filter: 'blur(0.8px)'
                        }
                    }}
                >
                    <Grid item md={2}>
                        <img
                            src={Apiconfig.url + course.thumbnail}
                            // style="border-radius:12px"
                            style={{ borderRadius: '5px' }}
                            alt="myCourse"
                            width="202px"
                            height="126px"
                        />
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={5}
                        lg={7}
                        sx={{
                            display: 'block',
                            justifyContent: 'space-between',
                            alignItems: 'end'
                        }}
                    >
                        <Box>
                            {' '}
                            <Stack direction="row" spacing={1}>
                                <Chip label={course.majorCategory} />
                            </Stack>
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
                                    variant="h4"
                                    sx={{
                                        mt: 1,
                                        minWidth: '300px'
                                    }}
                                >
                                    {course.courseName.charAt(0).toUpperCase() +
                                        course?.courseName.slice(1)}
                                </Typography>
                            </Link>
                        </Box>
                        <Box display="flex">
                            <Typography variant="body2">
                                {course.sections.length} Lessons
                            </Typography>
                            <Typography variant="body2" sx={{ mx: 2 }}>
                                {handleTotalSection(course.sections)} videos
                                {/* <p>{handleTotalSection(course.sections)} Videos</p> */}
                            </Typography>
                        </Box>
                    </Grid>
                    {/* <Grid item md={2}>
                <Box display="flex" justifyContent="space-between" >
                 
                </Box>
            </Grid> */}
                    <Grid item xs={12} sm={12} md={5} lg={3}>
                        {/* <LinearProgress
                    variant="determinate"
                    color="secondary"
                    sx={{ height: 13 }}
                    value={course.progress}
                /> */}
                        <Box
                            display="flex"
                            alignItems="end"
                            // justifyContent="flex-end"
                            flexDirection="column"
                            gap={1}
                            pt={2}
                            sx={{
                                [theme.breakpoints.down('md')]: {
                                    // flexDirection: 'column',
                                    gap: '20px',
                                    justifyContent: 'space-between'
                                }
                            }}
                        >
                            {/* <Button color="secondary" size="small">
                        Restart
                    </Button> */}
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
                                            marginRight: '8px'
                                        }}
                                    />
                                    Track Progress
                                </Typography>
                            </Link>
                            <Grid
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
                                                style={{ fontWeight: 600 }}
                                                onClick={dispatch(
                                                    setCurrentScreenName(
                                                        'overview'
                                                    )
                                                )}
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                    )}
                                {user?.role === 'instructor' && (
                                    <Box>
                                        <Button
                                            color="attend"
                                            size="small"
                                            variant="outlined"
                                            style={{ fontWeight: 600 }}
                                            onClick={() =>
                                                addMachine(
                                                    course._id,
                                                    course?.sections
                                                )
                                            }
                                        >
                                            Add Machine
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            ))}
            <AddMachineDialogTest
                open={addMachineDialogState}
                setOpen={addMachine}
                handleClose={closeMachineDialog}
                courseId={courseId}
            />
            <ToastContainer />

            <Box display="flex" justifyContent="center" mb={5}>
                <Pagination
                    color="secondary"
                    variant="outlined"
                    count={count}
                    page={page}
                    onChange={handleChange}
                />
            </Box>
        </>
    );
};

ListView.propTypes = {
    course: PropTypes.objectOf(PropTypes.object).isRequired,
    myCourse: PropTypes.bool.isRequired
};

export default ListView;
