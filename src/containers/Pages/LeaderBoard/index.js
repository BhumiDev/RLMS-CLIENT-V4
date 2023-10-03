import {
    Box,
    InputAdornment,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
    getAllCourses,
    getOverAllProgressOfInstructor,
    myCourses,
    myCoursesofInstructor,
    totalAssignmentsOfParticularCourseOfInstructor
} from '../../../API/Course';
import { useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import SearchIcon from '@mui/icons-material/Search';
import jwtDecode from 'jwt-decode';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { leaderboardBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CallMadeIcon from '@mui/icons-material/CallMade';
import Apiconfig from '../../../config/ApiConfig';
import { Link } from 'react-router-dom';
import './index.css';
import StarIcon from '@mui/icons-material/Star';
import LinearProgress from '@mui/material/LinearProgress';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export const LeaderBoard = () => {
    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);

    const [allCourses, setAllCourses] = useState([]);
    const [value, setValue] = useState('1');
    const [selectCourse, setSelectCourse] = useState('');
    const [searched, setSearched] = useState([]);
    const [totalStudentsEnrolled, setTotalStudentsEnrolled] = useState(0);
    const [totalAssignments, setTotalAssignments] = useState(0);
    const [studentsEnrolledInThisCourse, setStudentsEnrolledInThisCourse] =
        useState([]);
    const [studentsEnrolled, setStudentsEnrolled] = useState(0);
    const [allLiveCourses, setAllLiveCourses] = useState(0);
    const [coursesInBin, setCoursesInBin] = useState(0);
    const [studentId, setStudentId] = useState('');
    const [author, setAuthor] = useState('');

    const [isLoading, setIsloading] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);

    const getCourses = async () => {
        user?.role === 'student'
            ? myCourses(setAllCourses, page, setCount, setIsloading)
            : myCoursesofInstructor(
                  setAllCourses,
                  page,
                  setCount,
                  setIsloading
              );
    };

    useEffect(() => {
        getCourses();
        instructorDashboardData();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSelectCourse = async (e) => {
        setSelectCourse(e.target.value);
        setAuthor(e.target.value.author);
        await totalAssignmentsOfParticularCourseOfInstructor(
            e.target.value.author,
            e.target.value._id,
            setTotalStudentsEnrolled,
            setTotalAssignments,
            setStudentsEnrolledInThisCourse
        );
    };

    const instructorDashboardData = async () => {
        const res = await getOverAllProgressOfInstructor(
            author,
            setStudentsEnrolled,
            setAllLiveCourses,
            setCoursesInBin
        );
        console.log('res enrolled', res);
    };

    console.log('enrolled total', studentsEnrolled);

    // const instructorOverAllCourseProgress = async (id) => {
    //     console.log("author in func", author)
    //     await totalAssignmentsOfParticularCourseOfInstructor(author, id, setTotalStudentsEnrolled,
    //         setTotalAssignments, setStudentsEnrolledInThisCourse);
    // }

    console.log('studentsEnrolledInThisCourse', studentsEnrolledInThisCourse);
    console.log('select course', selectCourse);

    const handleSearchChange = (e) => {
        setSearched(e.target.value);
        // const filtered = studentsEnrolledInThisCourse.filter((item) => {
        //     if (!e.target.value) return true;
        //     if (item?._doc?.name
        //         .toLowerCase()
        //         .includes(e.target.value.toLowerCase())) return true;
        // });
        // setStudentsEnrolledInThisCourse(filtered);
        // console.log('filtered', filtered);
    };

    return (
        <>
            <Box
                px={{ md: 12, sm: 3, xs: 3 }}
                mt={2}
                sx={{ minHeight: '74.9vh' }}
                mb={5}
            >
                <Box my={1} mb={3}>
                    <BreadCrumb breadItems={leaderboardBreadcrumb} />
                </Box>
                <Box px={{ md: 10 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                    >
                        <Typography
                            color="primary"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '24px !important',
                                gap: 1,
                                fontWeight: 'bold'
                            }}
                        >
                            <EmojiEventsIcon sx={{ fontSize: '24px' }} />{' '}
                            Leaderboard
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                    >
                        <SchoolIcon sx={{ mt: 1 }} />
                        <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                        >
                            <InputLabel id="demo-simple-select-standard-label">
                                Courses
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={selectCourse}
                                onChange={handleSelectCourse}
                                label="Courses"
                            >
                                {/* <MenuItem value="all">All Courses</MenuItem> */}
                                {allCourses?.map((course) => (
                                    <MenuItem value={course}>
                                        {course?.courseName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box sx={{ width: '100%', typography: 'body1', mt: 4 }}>
                            <TabContext value={value}>
                                <Box>
                                    <TabList
                                        onChange={handleChange}
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab label="Learners" value="1" />
                                    </TabList>
                                </Box>
                            </TabContext>
                        </Box>
                        <Box width={{ md: '50%' }}>
                            <TextField
                                fullWidth
                                label="Search Name"
                                name="name"
                                size="small"
                                value={searched}
                                onChange={(e) => handleSearchChange(e)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </Box>
                    <Box mt={5}>
                        {selectCourse ? (
                            <>
                                {studentsEnrolledInThisCourse.length > 0 ? (
                                    <TableContainer
                                        component={Paper}
                                        sx={{ borderRadius: 0 }}
                                    >
                                        <Table
                                            sx={{
                                                minWidth: 650
                                                // borderSpacing: '16px',
                                                // borderCollapse: 'separate'
                                            }}
                                            aria-label="simple table"
                                        >
                                            <TableHead>
                                                <TableRow
                                                    sx={{
                                                        '& th': { border: 0 }
                                                    }}
                                                >
                                                    <TableCell>
                                                        (
                                                        {
                                                            studentsEnrolledInThisCourse?.length
                                                        }
                                                        ) User Id
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        Name
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Course Completed
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Score
                                                    </TableCell>
                                                    <TableCell>
                                                        <MoreVertIcon />
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {studentsEnrolledInThisCourse
                                                    ?.filter((item) => {
                                                        if (!searched)
                                                            return true;
                                                        if (
                                                            item?._doc?.name
                                                                .toLowerCase()
                                                                .includes(
                                                                    searched
                                                                ) ||
                                                            item?._doc?.name
                                                                .toUpperCase()
                                                                .includes(
                                                                    searched
                                                                )
                                                        )
                                                            return true;
                                                    })
                                                    .sort(
                                                        (a, b) =>
                                                            b.marks - a.marks
                                                    )
                                                    .map((student, i) => (
                                                        <TableRow
                                                            key={i}
                                                            sx={{
                                                                '& td': {
                                                                    border: 0,
                                                                    color:
                                                                        user._id ===
                                                                        student
                                                                            ?._doc
                                                                            ?._id
                                                                            ? 'primary.contrastText'
                                                                            : ''
                                                                },
                                                                border: 2,
                                                                color: 'primary.main',
                                                                backgroundColor:
                                                                    user._id ===
                                                                    student
                                                                        ?._doc
                                                                        ?._id
                                                                        ? 'primary.main'
                                                                        : ''
                                                            }}
                                                            style={{
                                                                borderRadius:
                                                                    '20px !important'
                                                            }}
                                                        >
                                                            <TableCell
                                                                sx={{
                                                                    fontWeight:
                                                                        'bold'
                                                                }}
                                                            >
                                                                {
                                                                    student
                                                                        ?._doc
                                                                        ?.userId
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    gap: 1
                                                                }}
                                                            >
                                                                <Avatar
                                                                    src={
                                                                        Apiconfig.url +
                                                                        student
                                                                            ?._doc
                                                                            ?.profilePath
                                                                    }
                                                                />
                                                                {
                                                                    student
                                                                        ?._doc
                                                                        ?.name
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontWeight:
                                                                        'bold'
                                                                }}
                                                                align="center"
                                                            >
                                                                {
                                                                    student
                                                                        ?._doc
                                                                        ?.completedcourses
                                                                        ?.length
                                                                }{' '}
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'center',
                                                                    gap: 1,
                                                                    color: 'text.primary',
                                                                    fontWeight:
                                                                        'bold'
                                                                }}
                                                            >
                                                                <StarIcon />
                                                                {student?.marks}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Link
                                                                    to={{
                                                                        pathname: `/dashboard/courses/view-student/${student?._doc?.userId}`
                                                                    }}
                                                                    state={{
                                                                        course: selectCourse,
                                                                        id: student
                                                                            ?._doc
                                                                            ?._id,
                                                                        marks: student?.marks
                                                                    }}
                                                                >
                                                                    <CallMadeIcon
                                                                        sx={{
                                                                            color:
                                                                                user._id ===
                                                                                student
                                                                                    ?._doc
                                                                                    ?._id
                                                                                    ? 'primary.contrastText'
                                                                                    : 'text.primary'
                                                                        }}
                                                                    />
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Box
                                        display="flex"
                                        width="100%"
                                        justifyContent="center"
                                    >
                                        <Typography>
                                            No student is enrolled in this
                                            course
                                        </Typography>
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Box
                                display="flex"
                                width="100%"
                                justifyContent="center"
                            >
                                <Typography>
                                    Select a course to view the rankings
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};
