import { Stack, Grid, Card, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CourseDetailCard = ({ item }) => (
    // <Stack direction="row">
    <Card sx={{ borderLeft: '14px solid', borderLeftColor:'primary.light', px: 2, py: 2, boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between">
            <Box>
                <Typography variant="h4" color="secondary">
                    {item.number}
                </Typography>
                <Typography variant="body1">{item.courseStatus}</Typography>
            </Box>
            {item.component}
        </Box>
        {/* <Grid
            container
            sx={{ borderLeft: '20px solid primary.light' }}
            // width="252px"
            // height="100px"
            justifyContent="space-between"
            p={2}
            // borderRadius="10px"
        >
            <Grid item md={4} xs={4}></Grid>
            <Grid
                item
                md={7}
                xs={7}
                sx={{
                    fontWeight: '400',
                    fontSize: '17px',
                    lineHeight: '23.8px',
                    fontFamily: 'Poppins'
                }}
                variant="body"
            >
                {item.component}
            </Grid>
            <Grid
                item
                sx={{
                    fontWeight: '400',
                    fontSize: '17px',
                    lineHeight: '140%',
                    fontFamily: 'Poppins'
                }}
            >
                {item.courseStatus}
            </Grid>
        </Grid> */}
    </Card >
    // </Stack>
);

CourseDetailCard.propTypes = {
    item: PropTypes.objectOf(PropTypes.oneOfType(
        [PropTypes.string, PropTypes.object, PropTypes.array, PropTypes.bool, PropTypes.number]
    )).isRequired
};

export default CourseDetailCard;
