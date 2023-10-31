import { useEffect, useState } from 'react';
import { getRecentlyDeletedCourses } from '../../../API/Course';
import { Box, Container } from '@mui/material';
// import { GridView } from "@mui/icons-material";
import GridView from '../../../common/components/GridView';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { recentlyDeletedBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';

export const RecentlyDeletedCourses = () => {
    const [data, setData] = useState();

    const getData = async () => {
        let response = await getRecentlyDeletedCourses();
        console.log('ghata ka data', response.data.data);
        setData(response.data.data.reverse());
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Box mt={5} px={{ md: 12, sm: 3, xs: 3 }}>
                <BreadCrumb breadItems={recentlyDeletedBreadcrumb} />
            </Box>
            <Container
                sx={{ px: { md: 12 }, minHeight: 'calc(100vh - 217px)' }}
            >
                <GridView data={data} myCourse />
            </Container>
        </>
    );
};
