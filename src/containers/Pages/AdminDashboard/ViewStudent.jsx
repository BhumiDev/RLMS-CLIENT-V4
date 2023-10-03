import * as React from 'react';
import {
    Grid,
    Typography,
    Box,
    Stack,
    useTheme,
    Button,
} from '@mui/material';
import CircularStatic from './ProgressBar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import StudentsDetailsCard from './StudentsDetailsCard';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCourseProgress, totalAssignmentsOfParticularCourseOfInstructor, getScoreOfCourseofParticularStudent } from "../../../API/Course"

export const ViewStudent = () => {

    const [count, setCount] = useState(0);
    const [totalLectures, setTotalLectures] = useState(0);
    const [totalEnrolled, setTotalEnrolled] = useState(0);
    const [coursesInProgress, setCourseInProgress] = useState(0);
    const [completionRate, setCompletionRate] = useState(0);
    const [result, setresult] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [testResult, setTestResult] = useState(0);

    const theme = useTheme();
    const navigate = useNavigate();

    const { userId } = useParams();
    // console.log(userId);

    const location = useLocation();
    console.log(location)
    let course = location?.state?.course
    console.log("location se course in view stu", course?.sections);

    let id = location?.state?.id;
    let marks = location?.state?.marks;
    // console.log(id);

    useEffect(() => {

        getTotallecturesofCourse(course);
        getProgressData();
        scoreOfStudent();

    }, [count, totalMarks])

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

        console.log("studentid and courseId", id, course._id);

        await getCourseProgress(course?._id, id, setCount, setTotalEnrolled, setCourseInProgress, setCompletionRate);

        const CourseCompletionPercent = ((count / totalLectures) * 100);

        if (count !== 0) {

            setresult(CourseCompletionPercent);
        }



        if (count !== 0) {

            setresult(CourseCompletionPercent);
        }
    }

    const scoreOfStudent = async () => {

        const testPercent = ((marks / totalMarks) * 100);
        setTestResult(parseInt(testPercent) || 0);

    }

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
    ];

    return (
        <>
            <Button
                disableRipple
                size="small"
                startIcon={<KeyboardBackspaceIcon />}
                sx={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    px: { md: 11 },
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

            <Box
                p={5}
                px={{ md: 12 }}
                pt={0}
                pb={10}
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
                    <Grid item container sm={12} md={12} lg={12}>
                        <Grid
                            container
                            justifyContent="space-between"
                        >
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
                                            <Typography>
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
                                            <Typography>
                                                Test Pass Rate
                                            </Typography>
                                            <Grid item display='flex' flexDirection='row' alignItems='center'
                                                justifyContent='space-between' gap={10}
                                                sx={{
                                                    [theme.breakpoints.down('md')]: {
                                                        flexDirection: 'column',
                                                        gap: '5px'
                                                    }
                                                }}
                                            >
                                                <Typography>
                                                    Maximum Marks: {totalMarks}
                                                </Typography>
                                                <Typography>
                                                    Marks Obtained: {marks}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                        // style={{ border: "2px solid teal" }}
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
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}