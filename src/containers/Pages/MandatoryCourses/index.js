import { useEffect, useState } from 'react';
import { getMandatoryCoursesForStudent } from '../../../API/Course';
import GridView from '../../../common/components/GridView';
import { Box, CircularProgress, Typography } from '@mui/material';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { mandatoryCoursesBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
import { useDispatch, useSelector } from 'react-redux';

export const MandatoryCourses = () => {
    const [mandatoryCourses, setMandatoryCourses] = useState([]);

    const loader = useSelector((state) => state?.currentScreen?.isLoading);
    const dispatch = useDispatch();

    const getMandatoryCourses = async () => {
        const response = await getMandatoryCoursesForStudent(dispatch);
        console.log('res of mandatorycourses', response);
        setMandatoryCourses(response);
    };

    useEffect(() => {
        getMandatoryCourses();
    }, []);

    return (
        <>
            <Box px={{ md: 12, sm: 5, xs: 5 }} mt={4} minHeight="77.4vh">
                <Box mb={5}>
                    <BreadCrumb breadItems={mandatoryCoursesBreadcrumb} />
                </Box>
                {loader ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <GridView data={mandatoryCourses} />
                )}
            </Box>
        </>
    );
};
