import { useEffect, useState } from 'react';
import { Stack, Typography, Box, Grid, CircularProgress, Button } from '@mui/material';
import {
    getRecentCourses,
    getAllCourses,
    instructorRecentCourses,
    studentDashboardData,
    getOverAllProgressOfInstructor,
    getSuggestedCoursesForStudent
} from '../../../API/Course';
import CourseDetailCard from './courseDetailCard';
// import Data from './Data/LIstViewData';
import ListView from './ListView';
import jwtDecode from "jwt-decode";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DeleteIcon from '@mui/icons-material/Delete';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import Certificate from './Certificate';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';


const Left = () => {
    let token = localStorage.getItem("token");
    let user = token && jwtDecode(token);
    console.log("current-user", user);

    const navigate = useNavigate();

    const [data, setData] = useState();
    const [allCourses, setAllCourses] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // student dashboard data states
    const [totalEnrolled, setTotalEnrolled] = useState(0);
    const [coursesInProgress, setCourseInProgress] = useState(0);
    const [completionRate, setCompletionRate] = useState(0);

    // instructor dashboard data states
    const [studentsEnrolled, setStudentsEnrolled] = useState(0);
    const [allLiveCourses, setAllLiveCourses] = useState(0);
    const [coursesInBin, setCoursesInBin] = useState(0);

    const [suggestedCourses, setSuggestedCourses] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(3);
    const [recentItemsToShow, setRecentItemsToShow] = useState(3);

    const showMore = () => {
        setItemsToShow(suggestedCourses.length);
    }

    const showLess = () => {
        setItemsToShow(3);
    }

    const showMoreRecent = () => {
        setRecentItemsToShow(data.length);
    }

    const showLessRecent = () => {
        setRecentItemsToShow(3);
    }


    const getRecentlyStudiedCourses = async () => {
        setIsLoading(true)
        let recentlyCourses = await getRecentCourses()


        let courses = await getAllCourses()
        let all = courses
        let recent = recentlyCourses.data.data
        console.log("RECENT", recent);

        if (recentlyCourses.data.data) {

            let sorted1 = await all.sort((a, b) => a.courseNumber - b.courseNumber);
            console.log('Sorted 1 updated', sorted1)

            let sorted2 = await recent.sort((a, b) => a.courseNumber - b.courseNumber);

            console.log("sorted 2 updated", sorted2)

            let newarr = []
            let i = 0;
            let j = 0;
            while (i < sorted1.length && j < sorted2.length) {



                if (sorted1[i].courseNumber === sorted2[j].courseNumber) {
                    // console.log("pushing common", sorted1[i]._id,sorted2[j]._id);
                    newarr.push(sorted1[i]);
                    i++;
                    j++;
                }
                else if (sorted1[i].courseNumber < sorted2[j].courseNumber) {
                    // console.log("incresaing i")
                    i++;

                } else {
                    // console.log("incresaing j")

                    j++;

                }

            }

            console.log("recent array", newarr)

            setData(newarr)
            setIsLoading(false)

        } else {
            setData([])

        }
    }

    console.log('data', data)



    const getRecentlyCreatedCourses = async () => {
        setIsLoading(true);
        let data = await instructorRecentCourses()
        let filteredArray = data?.filter(item => item.isDeleted === false);

        console.log("filteredAray", filteredArray)
        setData(filteredArray);
        setIsLoading(false);

    }

    const instructorDashboardData = async () => {

        await getOverAllProgressOfInstructor(user._id, setStudentsEnrolled, setAllLiveCourses, setCoursesInBin);
    }


    const studentDashboardDetails = async () => {

        await studentDashboardData(user._id, setTotalEnrolled, setCourseInProgress, setCompletionRate);

    }

    useEffect(() => {



        if (user.role === "student") {
            getRecentlyStudiedCourses();
            studentDashboardDetails();
            getSuggestedCourses();
            console.log("inside student");

        }
        else {
            getRecentlyCreatedCourses();
            instructorDashboardData();
        }
    }, []);

    console.log("enrolled ,inprogress, completionrate", totalEnrolled, coursesInProgress, completionRate);
    console.log("enrolled ,live, inBin", studentsEnrolled.length, allLiveCourses, coursesInBin);

    const studentDetails = [
        {
            number: totalEnrolled,
            courseStatus: 'Total Enrolled Courses',
            component: <EmojiEventsIcon fontSize="large" sx={{ color: 'primary.light' }} />
        },
        {
            number: coursesInProgress,
            courseStatus: 'Courses in progress',
            component: <AutoGraphIcon fontSize="large" sx={{ color: 'primary.light' }} />
        },
        {
            number: `${Math.floor(completionRate)}%`,
            courseStatus: 'Completion Rate',
            component: <DateRangeIcon fontSize="large" sx={{ color: 'primary.light' }} />
        }
    ];

    const instructorProgressDetails = [
        {
            number: studentsEnrolled.length,
            courseStatus: 'Total Students Enrolled',
            component: <PeopleAltIcon fontSize="large" sx={{ color: 'primary.light' }} />
        },
        {
            number: allLiveCourses,
            courseStatus: 'Live Courses',
            component: <LiveTvIcon fontSize="large" sx={{ color: 'primary.light' }} />
        },
        {
            number: coursesInBin,
            courseStatus: 'Deleted Courses',
            component: <DeleteIcon fontSize="large" sx={{ color: 'primary.light' }} />
        }
    ];

    const getSuggestedCourses = async () => {
        const response = await getSuggestedCoursesForStudent();
        console.log("resof suggested", response);
        setSuggestedCourses(response);
    }

    return (
        <>
            {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0}> */}
            {isLoading ?
                <Box textAlign="center" height='60vh' display='flex' alignItems='center' justifyContent='center'>
                    <CircularProgress />
                </Box >
                :
                <>
                    <Grid container spacing={{ xs: 2, sm: 2, md: 6, lg: 10 }}>
                        {user.role === 'student' ?
                            <>
                                {studentDetails.map((e, i) => (
                                    <Grid item md={4} lg={4} sm={12} xs={12} display='grid'>
                                        <CourseDetailCard item={e} key={i} />
                                    </Grid>
                                ))}
                            </>
                            : <>
                                {instructorProgressDetails.map((item, i) => (
                                    <Grid item md={4} lg={4} sm={12} xs={12} display='grid'>
                                        <CourseDetailCard item={item} key={i} />
                                    </Grid>
                                ))
                                }
                            </>
                        }
                    </Grid>
                    <Box mt={8} display='flex' gap={2}>
                        <Button variant="outlined" color="secondary" startIcon={<LeaderboardIcon />} sx={{ width: '295px !important' }} onClick={() => navigate('/dashboard/leaderboard')}>
                            Leaderboard
                        </Button>

                        <Button variant="outlined" color="secondary" startIcon={<GroupsIcon />} sx={{ width: '295px !important' }} onClick={() => navigate('/dashboard/attendance')}>
                            Attendance
                        </Button>

                    </Box>
                    {suggestedCourses.length > 0 &&
                        user?.role === 'student' &&
                        <>
                            <Grid item>
                                <Typography variant="h4" mt={8} fontWeight={1000}>
                                    Suggested Courses
                                </Typography>
                                <Stack  sx={{height:"100%", overflow:"scroll", overflowX:"hidden", maxHeight:"75vh"}}>
                                {suggestedCourses?.slice(0, itemsToShow).map((item, i) => (
                                    <Box key={i} mb={6} mt={6}>
                                        <ListView item={item} />
                                    </Box>
                                ))}
                                </Stack>
                                <Box display='flex' justifyContent='flex-end'>
                                    {itemsToShow === 3 ?

                                        <Button
                                            variant='text'
                                            color='secondary'
                                            onClick={showMore}
                                        >
                                            Show More
                                        </Button>
                                        :
                                        <Button
                                            variant='text'
                                            color='secondary'
                                            onClick={showLess}
                                        >
                                            Show Less
                                        </Button>
                                    }
                                </Box>
                            </Grid>
                        </>
                    }
 <Grid item>

                    {
                        user.role === "instructor" ? (
                            <>
                                <Typography variant="h4" mt={8} fontWeight={1000}>
                                    Recently Created Courses
                                </Typography>
                                <Typography mt={1} mb={4}>
                                    {data?.length === 0 ? "You have not created any course yet." : ""}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography variant="h4" mt={8} fontWeight={1000}>
                                    Recently Studied Courses
                                </Typography>
                                <Typography mt={1} mb={4}>
                                    {data?.length === 0 ? "You have not studied any course yet." : ""}
                                </Typography>
                            </>

                        )
                    }

<Stack  sx={{height:"100%", overflow:"scroll", overflowX:"hidden", maxHeight:"75vh"}}>
                    {data?.slice(0, recentItemsToShow).map((item, i) => (
                            <Box key={i} mb={6} mt={6}>
                                <ListView item={item} myCourse />
                            </Box>
                        ))}
                           </Stack>
                     <Box display='flex' justifyContent='flex-end' sx={{mb:6}}>
                                    {recentItemsToShow === 3 ?

                                        <Button
                                            variant='text'
                                            color='secondary'
                                            onClick={showMoreRecent}
                                        >
                                            Show More
                                        </Button>
                                        :
                                        <Button
                                            variant='text'
                                            color='secondary'
                                            onClick={showLessRecent}
                                        >
                                            Show Less
                                        </Button>
                                    }
                                </Box>
 </Grid>



                    {/* {data?.map((item) => (
                <Box key={item.id}>
                <ListView item={item} myCourse/>
                </Box>
            ))} */}
                </>
            }
        </>
    );
};

export default Left;
