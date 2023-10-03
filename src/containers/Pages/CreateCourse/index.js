import { Box, Grid } from '@mui/material';
import OverView from './Components/Overview';
import CurrentScreen from './Components/CurrentScreen';
import { ToastContainer, toast } from 'react-toastify';
import AddButtons from './Components/AddButtons';
// import Manual from './Screens/Manual';
import { useSelector } from 'react-redux';

import { useLocation, useParams } from 'react-router';

const CreateCourse = () => {
    const loaction = useLocation();
    const params = useParams();
    const currentCourseManuals = useSelector(
        (state) => state?.currentCourse?.data?.sections
    );

    const shouldRender = () => {
        if (currentCourseManuals?.length > 0 && params?.courseId) {
            return <AddButtons />;
        }
    };

    return (
        <Box my={4}>
            <Grid container spacing={8} alignItems="stretch">
                <Grid item md={4} sm={12} xs={12} mx={{ md: 0, sm: 2, xs: 2 }}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        pl={{ md: 12 }}
                        height="100%"
                    >
                        <OverView />
                    </Box>
                </Grid>
                <Grid
                    item
                    md={7}
                    sm={12}
                    xs={12}
                    height="100%"
                    minHeight="calc(100vh - 95px)"
                >
                    <CurrentScreen />
                    {shouldRender()}
                </Grid>
            </Grid>
            <ToastContainer />
        </Box>
    );
};

export default CreateCourse;
