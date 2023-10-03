import * as React from 'react';
import {
    Grid,
    Typography,
    Box,
    Stack,
    useTheme,
    Button,
} from '@mui/material';
import Cards from './Cards';
import Graphs from './Graphs';
import Pdf from "react-to-pdf";
const ref = React.createRef();
// import Certificate from './certificate';


import { useLocation, useNavigate } from 'react-router-dom';
import StudentsDetailsCard from './StudentsDetailsCard';
import CircularStatic from './ProgressBar';
import TestPassPercentage from './TestPassPercentage';
import StudentsScoreCard from './StudentsScoreCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import jwtDecode from 'jwt-decode';
import { getCourseProgress, totalAssignmentsOfParticularCourseOfInstructor, getScoreOfCourseofParticularStudent, getScreenTimeOfCourseForStudent } from "../../../API/Course"
import { useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useReactToPrint } from 'react-to-print';
import DownloadIcon from '@mui/icons-material/Download';
import { useDownloadExcel } from "react-export-table-to-excel";
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { trackProgressBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';

export const formatDuration = (totalSeconds) => {
    var h = Math.floor(totalSeconds / (60 * 60));
    var divisor_for_minutes = totalSeconds % (60 * 60);
    var m = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var s = Math.ceil(divisor_for_seconds);
    return `${h}h : ${m}m : ${s}s`
};

const Main = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    // student progress detail states
    const [count, setCount] = useState(0);
    const [totalLectures, setTotalLectures] = useState(0);
    const [totalEnrolled, setTotalEnrolled] = useState(0);
    const [coursesInProgress, setCourseInProgress] = useState(0);
    const [completionRate, setCompletionRate] = useState(0);
    const [result, setresult] = useState(0);
    const [totalScores, setTotalScore] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [testResult, setTestResult] = useState(0);

    const [totalStudentsEnrolled, setTotalStudentsEnrolled] = useState(0);
    const [totalAssignments, setTotalAssignments] = useState(0);
    const [studentsEnrolledInThisCourse, setStudentsEnrolledInThisCourse] = useState([]);
    const [disabled, setDisabled] = useState(false)

    const location = useLocation();

    let course = location?.state?.course
    console.log("location se course", course);
    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);

    console.log("user", user);

    const cardRef = React.useRef();
    const cardRefInst = React.useRef();
    const tableRef = React.useRef();

    React.useEffect(() => {

        if (user.role === "student") {
            getTotallecturesofCourse(course);
            getProgressData();
            scoreOfStudent();
            getAllScreenTimeOfCourse();
        }
        else if (user.role === "instructor") {
            instructorOverAllCourseProgress();
        }

    }, [count, totalScores])

    const getTotallecturesofCourse = (course) => {
        let totallec = 0;
        let marks = 0;

        for (let section of course?.sections) {
            console.log("section one by one", section)
            totallec += section.lectures.length;
            marks += section.question.length;
        }
        console.log("total lectures=", totallec);
        setTotalLectures(totallec);

        console.log("total questions =", marks);
        setTotalMarks(marks * 10);

    }


    const getProgressData = async () => {

        console.log("studentid and courseId", user._id, course._id);


        await getCourseProgress(course?._id, user?._id, setCount, setTotalEnrolled, setCourseInProgress, setCompletionRate);

        const CourseCompletionPercent = ((count / totalLectures) * 100);

        if (count !== 0) {

            setresult(CourseCompletionPercent);
        }
    }

    const instructorOverAllCourseProgress = async () => {
        await totalAssignmentsOfParticularCourseOfInstructor(course?.author, course._id, setTotalStudentsEnrolled,
            setTotalAssignments, setStudentsEnrolledInThisCourse);
    }



    const scoreOfStudent = async () => {
        const response = await getScoreOfCourseofParticularStudent(course._id, user._id);
        getTotalMarks(response);

        const testPercent = ((totalScores / totalMarks) * 100);
        setTestResult(parseInt(testPercent) || 0);

    }

    const getTotalMarks = (value) => {

        let sum = 0;

        for (let total of value) {
            if (total.studentId === user._id) {
                console.log("test", total)
                for (let marks of total.totalScore) {
                    sum += marks.givenMarks;
                }
            }
        }

        setTotalScore(sum)
    }

    console.log("studentsEnrolled", studentsEnrolledInThisCourse);

    const StudentProgressDetails = [
        {
            number: totalEnrolled,
            courseStatus: 'Total Enrolled Courses',
            component: <PeopleAltIcon fontSize="large" sx={{ color: 'primary.light' }} />

        },
        {
            number: coursesInProgress,
            courseStatus: 'Courses in progress',
            component: <DonutLargeIcon fontSize="large" sx={{ color: 'primary.light' }} />
        },
        {
            number: `${Math.floor(completionRate)}%`,
            courseStatus: 'Completion Rate',
            component: <AssignmentTurnedInIcon fontSize="large" sx={{ color: 'primary.light' }} />
        }
    ]

    const instructorCourseProgress = [
        {
            number: totalStudentsEnrolled,
            courseStatus: "Total Students enrolled",
            component: <PeopleAltIcon />,
        },
        {
            number: totalAssignments,
            courseStatus: "Assignments",
            component: <StickyNote2Icon />,
        },
        {
            number: "240 hr",
            courseStatus: "Total watch time",
            component: <AccessTimeFilledIcon />,
        },
    ]

    const handlePrint = useReactToPrint({
        content: () => cardRef.current,
        documentTitle: "Student ScoreCard"
    });

    const handlePrintInstructor = useReactToPrint({
        content: () => cardRefInst.current,
        documentTitle: "Student ScoreCard"
    });

    const getPageMargins = () => {
        return `@page { margin: 50px 50px 50px 50px !important; }`;
    };

    const downloadZip = () => {
        let div = document.createElement('div');
        div.append(cardRefInst.current);
        var str = div.innerHTML;

        let blob = new Blob([str], { type: 'text/html' });

        const zip = new JSZip();
        zip.file("Hello.txt", blob);

        zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "example.zip");
        });
    }

    const [screenTime, setScreenTime] = useState(0);

    const getAllScreenTimeOfCourse = async () => {
        const response = await getScreenTimeOfCourseForStudent(course?._id, user?._id);
        console.log("RESPINSE OF GETALLSCREENIME", response);
        setScreenTime(response[0]?.screenTimeDuration);
    }

    return (
        <Box sx={{ minHeight: 'calc(100vh - 185px)' }}>
            <Grid display='flex' justifyContent={{ md: 'space-between', sm: 'space-between', xs: 'flex-start' }}
                flexDirection={{ sm: 'row', xs: 'column' }} alignItems='start' px={{ md: 11.5, sm: 3, xs: 3 }} pt={2}>
                <BreadCrumb breadItems={trackProgressBreadcrumb} />
                {user?.role !== 'student' ?
                    <Grid item display='flex' justifyContent={{ xs: 'space-between', sm: 'flex-end' }} gap={2}>
                        <Button
                            size='small'
                            variant="outlined"
                            onClick={handlePrintInstructor}
                            m="10px"
                            color='secondary'
                            style={{ textTransform: 'none' }}
                            startIcon={<DownloadIcon />}
                        >
                            DOWNLOAD REPORT
                        </Button>
                        <Button
                            size='small'
                            variant="outlined"
                            onClick={downloadZip}
                            m="10px"
                            color='secondary'
                            style={{ textTransform: 'none' }}
                            startIcon={<DownloadIcon />}
                        >
                            EXPORT AS ZIP
                        </Button>
                    </Grid> :
                    <Grid item display='flex' justifyContent={{ xs: 'space-between', sm: 'flex-end' }} gap={2}>
                        <Button
                            color='secondary'
                            onClick={handlePrint}
                            m="10px"
                            size='small'
                            style={{ textTransform: 'none' }}
                            endIcon={<DownloadIcon />}
                        >
                            DOWNLOAD REPORT
                        </Button>
                        <Grid display='flex' flexDirection='column'>
                            <Button
                                color='secondary'
                                size='small'
                                disabled={testResult > 60 ? false : true}
                                onClick={() => {
                                    navigate("/certificate", {
                                        state: {
                                            name: user.name,
                                            email: user.email,
                                            courseName: course.courseName,
                                            passingPercentage: testResult,
                                        }
                                    })
                                }}
                                m="10px"
                                style={{ textTransform: 'none' }}
                            >
                                VIEW CERTIFICATE
                            </Button>
                            {testResult < 60 ?
                                <Typography variant='body 1'
                                    style={{
                                        fontSize: '12px',
                                        color: 'red',
                                        position: 'absolute',
                                        right: '15px',
                                        padding: '28px 0px 0px 0px',
                                        textAlign: 'center',
                                        marginRight: '80px'
                                    }}>
                                    *Test Percentage is less than 60%
                                </Typography> : ""}
                        </Grid>


                    </Grid>
                }

            </Grid>


            <Box
                p={5}
                px={{ md: 12, sm: 3 }}
                pt={0}
                pb={0}
                sx={{
                    [theme.breakpoints.down('sm')]: {
                        padding: 4,
                        pt: 0
                    }
                }}
            >
                <Grid
                    container
                    mt={7}
                    justifyContent="space-between"
                    style={{
                        marginBottom: '80px'
                    }}
                >
                    {/* ------------------------Instructor View------------------------- */}

                    {user.role !== 'student' ?
                        <Grid item container sm={12} md={12} lg={12}>
                            <Grid ref={cardRefInst}
                                container
                                justifyContent="space-between"
                            >
                                <style>{getPageMargins()}</style>
                                <Grid item md={12} sm={12} xs={12} lg={12}>
                                    <Stack
                                        width='100%'
                                        height="100%"
                                        gap={{ xs: 2, sm: 2, md: 6, lg: 10 }}
                                        flexDirection="row"
                                        justifyContent="space-between"
                                        sx={{
                                            [theme.breakpoints.down('md')]: {
                                                flexDirection: 'column'
                                            }
                                        }}
                                    >
                                        {instructorCourseProgress.map((item, i) => {
                                            return (
                                                <StudentsDetailsCard
                                                    key={i}
                                                    item={item}
                                                />
                                            );
                                        })}
                                    </Stack>
                                </Grid>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    width='100%'
                                >
                                    <Grid item
                                        mt={7}
                                        md={6}
                                    // width="50%"
                                    >
                                        <Graphs data={studentsEnrolledInThisCourse} />
                                    </Grid>
                                </Box>
                                <Grid
                                    container
                                    mt={7}
                                    justifyContent="space-between"
                                    sx={{ border: 'ipx solid red' }}
                                >

                                    <Box
                                        container
                                        sx={{ width: '100%' }}
                                    // style={{ border: "1px solid red" }}
                                    >
                                        <Typography variant="h4" mb={3} fontWeight={1000}>
                                            Students Score Board
                                        </Typography>

                                        <Box borderRadius={3} sx={{ boxShadow: 3, p: 3 }}>
                                            <Box
                                                md={12}
                                                sm={12}
                                                sx={{
                                                    [theme.breakpoints.down('md')]: {
                                                        width: '100%',
                                                        overflowX: 'scroll'
                                                    },

                                                    [theme.breakpoints.down('sm')]: {
                                                        width: '100%'
                                                    }
                                                }}
                                            >
                                                {studentsEnrolledInThisCourse.length === 0 ?
                                                    <Typography variant='body 1'>No students are enrolled in this course</Typography> :
                                                    <StudentsScoreCard data={studentsEnrolledInThisCourse} course={course} />
                                                }

                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Grid>
                        :
                        // ------------------------student view---------------------------------

                        <Grid container sm={12} md={12} lg={12} >
                            <Grid ref={cardRef}
                                container
                                justifyContent="space-between"
                            >
                                <style>{getPageMargins()}</style>
                                <Grid item md={12} sm={12} xs={12} lg={12}>
                                    <Stack
                                        width='100%'
                                        height="100%"
                                        gap={{ xs: 2, sm: 2, md: 6, lg: 10 }}
                                        flexDirection="row"
                                        justifyContent="space-between"
                                        sx={{
                                            [theme.breakpoints.down('md')]: {
                                                flexDirection: 'column'
                                            }
                                        }}
                                    >
                                        {StudentProgressDetails.map((item, i) => {
                                            return (
                                                <StudentsDetailsCard
                                                    key={i}
                                                    item={item}
                                                />
                                            );
                                        })}
                                    </Stack>
                                </Grid>
                                <Grid
                                    sx={{
                                        boxSizing: 'border-box',
                                        [theme.breakpoints.down('md')]: {
                                            margin: '30px 0',
                                            flexDirection: 'column'
                                        },
                                    }}

                                    item
                                    md={12}
                                    sm={12}
                                    xs={12}
                                    mt={7}
                                    borderRadius={3}
                                    display='flex'
                                    justifyContent='space-between'
                                    gap={4}
                                >
                                    <Grid
                                        item
                                        width='100%'
                                        p={{ md: 5, xs: 3, sm: 3 }}
                                        borderRadius={3}
                                        sx={{ boxShadow: 8 }}
                                    >
                                        <Grid
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent:
                                                    'space-evenly',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Grid
                                                item
                                                sx={{ mb: 5, mt: 2 }}
                                                textAlign="center"
                                            >
                                                <Typography variant="body1" color="text.primary">
                                                    Course Progress
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                {
                                                    result && (
                                                        <CircularStatic
                                                            progress={result}
                                                        />
                                                    )
                                                }

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        width='100%'
                                        p={{ md: 5, xs: 3, sm: 3 }}
                                        borderRadius={3}
                                        sx={{ boxShadow: 8 }}
                                    >
                                        <Grid
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent:
                                                    'space-evenly',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Grid
                                                item
                                                sx={{ mb: 3 }}
                                                textAlign="center"
                                            >
                                                <Typography variant="body1" color="text.primary">
                                                    Test Pass Rate
                                                </Typography>
                                                <Grid item display='flex' flexDirection='row' alignItems='center'
                                                    justifyContent='space-between' gap={10} mt={{ md: 0, sm: 2, xs: 2 }}
                                                    sx={{
                                                        [theme.breakpoints.down('md')]: {
                                                            flexDirection: 'column',
                                                            gap: '5px'
                                                        }
                                                    }}
                                                >
                                                    <Typography variant="body1" color="text.primary" display='flex' flexDirection={{ md: 'column', sm: 'row', xs: 'row' }} alignItems='center' >
                                                        Maximum Marks: <Typography>{totalMarks}</Typography>
                                                    </Typography>
                                                    <Typography variant="body1" color="text.primary" display='flex' flexDirection={{ md: 'column', sm: 'row', xs: 'row' }} alignItems='center'>
                                                        Marks Obtained: <Typography>{totalScores}</Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                {
                                                    testResult && (
                                                        <CircularStatic
                                                            progress={testResult}
                                                        />
                                                    )
                                                }

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        width='100%'
                                        p={{ md: 5, xs: 3, sm: 3 }}
                                        borderRadius={3}
                                        sx={{ boxShadow: 8 }}
                                    >
                                        <Grid
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent:
                                                    'space-evenly',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Grid
                                                item
                                                sx={{ mb: 5, mt: 2 }}
                                                textAlign="center"
                                            >
                                                <Typography variant="body1" color="text.primary">
                                                    Time Spent On Course
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <Typography variant="body1" color="text.primary">
                                                    {formatDuration(Math.floor(screenTime))}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Box>
        </Box>
    );
};

export default Main;