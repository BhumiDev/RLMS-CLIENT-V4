import { useEffect, useState } from 'react';
import {
    getInstructorLearningPaths,
    getStudentLearningPaths
} from '../../../API/Course';
import GridView from '../../../common/components/GridView';
import { Box, Button, Chip, CircularProgress, Typography } from '@mui/material';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { StudentLearningPathBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const LearningPathsPage = () => {
    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);

    const dispatch = useDispatch();
    const loader = useSelector((state) => state?.currentScreen?.isLoading);

    const [learningPath, setLearningPath] = useState([]);

    const getLearningPathForStudent = async () => {
        const res = await getStudentLearningPaths(dispatch);
        console.log('res of learning path stu', res);
        setLearningPath(res);
    };

    const getLearningPaathForInstructor = async () => {
        const res = await getInstructorLearningPaths(dispatch);
        console.log('res of learning path stu', res);
        setLearningPath(res);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'student') {
            getLearningPathForStudent();
        } else {
            getLearningPaathForInstructor();
        }
    }, []);

    return (
        <>
            <Box px={{ md: 12, sm: 5, xs: 5 }} mt={3} minHeight="74.1vh" mb={5}>
                <Box my={1} mb={3}>
                    <BreadCrumb breadItems={StudentLearningPathBreadcrumb} />
                </Box>
                {user?.role === 'instructor' && (
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                navigate(
                                    '/dashboard/learning-path/create-learning-path'
                                )
                            }
                        >
                            Create Learning Path
                        </Button>
                    </Box>
                )}
                {loader ? (
                    <Box
                        height="56vh"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {learningPath.length > 0 ? (
                            learningPath?.map((path) => (
                                <>
                                    <Box>
                                        <Typography
                                            variant="h4"
                                            fontWeight={1000}
                                        >
                                            {path?.title
                                                .charAt(0)
                                                .toUpperCase() +
                                                path?.title.slice(1)}
                                        </Typography>
                                        <Box mt={1}>
                                            {user?.role === 'student' && (
                                                <Chip
                                                    label={`Instructor: ${path?.author?.userName}`}
                                                />
                                            )}
                                        </Box>
                                        <GridView
                                            data={path?.courses}
                                            myCourse
                                        />
                                    </Box>
                                </>
                            ))
                        ) : (
                            <Box display="flex" justifyContent="center">
                                <Typography variant="h5">
                                    No Learning Paths found
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </>
    );
};
