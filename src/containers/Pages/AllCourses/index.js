/* global chrome */
import {
    Box,
    Button,
    Stack,
    Chip,
    Divider,
    useTheme,
    CircularProgress,
    Typography
} from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// import { useSelector } from 'react-redux';
import { FilterList } from '@mui/icons-material';
import { store } from '../../../store';
// import ToggleTheme from '../../../utils/ToggleTheme';
import BreadCrumb from '../../../common/components/Breadcrumb';
// import SecondaryHeader from '../../../common/components/SecondaryHeader/index';
import GridView from '../../../common/components/GridView/index';
import Apiconfig from '../../../config/ApiConfig';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const token = localStorage.getItem('token');
    let user = token && jwtDecode(token);

    const storeState = store.getState();

    // const getConversations = async () => {
    //     try {
    //         const res = await Axios.get(
    //             `${Apiconfig.course.coursesWithFormat}/${user._id}`
    //         );
    //         let arr = res.data.studentUnenrollCourse;
    //         let filteredData = arr.filter((item) => item.isDeleted === false);
    //         setData(filteredData);
    //         setIsloading(false);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    const getConversations = async () => {
        const token = localStorage.getItem('token');
        console.log('page in api', page);
        try {
            const res = await Axios.get(
                `${Apiconfig.course.paginatedAllCourses}?page=${page}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('alll course of student with format', res.data);
            let arr = res.data.data;
            console.log('ARR', arr);
            console.log('total pages', res.data.total_pages);
            let filteredData = arr.filter((item) => item.isDeleted === false);
            setData(filteredData);
            setCount(res.data.total_pages);
            // setData(res.data.studentUnenrollCourse);
            setIsloading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const checkForExtension = () => {
        console.log(chrome.runtime, 'chrome');
    };
    useEffect(() => {
        setIsloading(true);
        checkForExtension();
        getConversations(page);
    }, [page]);

    const theme = useTheme();

    return (
        // column and gutter
        <>
            <Divider
                sx={{
                    [theme.breakpoints.up('sm')]: {
                        display: 'none'
                    }
                }}
            />

            {/* Main Container */}
            <Box px={{ xs: 3, sm: 3, md: 12 }} minHeight="79.5vh">
                {/* <Brightness6 onClick={ToggleTheme} /> */}
                <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    // alignItems={{ md: 'end' }}
                    mb={{ xs: 1 }}
                    mt={{ xs: 1.5 }}
                    gap={2}
                >
                    <Link to="/dashboard/courses/mandatory-courses">
                        <Button variant="contained" color="secondary">
                            Mandatory Courses
                        </Button>
                    </Link>
                    <Link to="/dashboard/courses/my-courses">
                        <Button variant="contained" color="secondary">
                            My Courses
                        </Button>
                    </Link>
                </Box>
                {isLoading ? (
                    <Box textAlign="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <GridView
                            data={data}
                            page={page}
                            count={count}
                            setCount={setCount}
                            setPage={setPage}
                            getConversations={getConversations}
                            browseCourses
                        />
                    </>
                )}
            </Box>
        </>
    );
};

export default Dashboard;
