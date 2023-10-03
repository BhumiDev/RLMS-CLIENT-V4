import {
    Button,
    Chip,
    // Divider,
    Box,
    LinearProgress,
    Stack,
    Typography,
    Grid
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Box } from '@mui/system';
import { url } from '../../../config/ApiConfig';
import CourseImg from '../../../assets/images/login.jpg';
import jwtDecode from "jwt-decode"


const ListView = ({ item, myCourse }) => {

    let token = localStorage.getItem("token");
    let user = token && jwtDecode(token);

    // container
    return (<Grid
        container
        wrap='nowrap'
        direction="row"
        mt={2}

        pb={2}
        justifyContent="space-between"
        borderBottom="2px solid #edeff2"
        borderBottomColor="primary.borderGrey"
    >
        {/* box1 */}
        <Grid item md={10} xs={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }}>
                <img
                    src={`${url}${item.thumbnail}`}
                    style={{ borderRadius: '5px' }}
                    alt="myCourse"
                    width="120px"
                    height="100px"
                />

                <Stack ml={{ xs: 0, sm: 2, md: 3 }} direction={{ xs: 'column' }}>
                    <Box mb={1}>
                        <Chip label={item.majorCategory} />
                    </Box>

                    <Typography variant="Body" color="text.primary">
                        {item.courseName.charAt(0).toUpperCase() + item.courseName.slice(1)}
                    </Typography>
                </Stack>
            </Stack>
        </Grid>
        {/* box 2 */}
        <Grid item textAlign="right" md={2}>
            {/* <Typography
                variant="subtitle2"
                mb={0.5}
                ml={1}
                mt={{ xs: 1 }}
                color="secondary.main"
            >
                {item.progress}% Completed
            </Typography>
            <LinearProgress
                variant="determinate"
                color="secondary"
                sx={{ height: 13 }}
                value={item.progress}
            /> */}
            <Box mt={3}>
                <Stack
                    direction="row"
                    size="small"
                    mt={4}
                    justifyContent="space-between"
                >
                    {/* <Button variant="text" border="none" color="secondary">
                        Restart
                    </Button> */}
                    <Link
                        to={{
                            pathname: `/dashboard/courses/view-course/${item._id}`
                        }}
                        state={
                            myCourse
                                ? {
                                    myCourse: 'myCourse'
                                }
                                : {
                                    myCourse: 'allCourse'
                                }
                        }
                    >
                        {
                            user?.role === "instructor" ? (
                                <Button variant="outlined" color="view">
                                    View
                                </Button>
                            ) : (
                                <>
                                    {myCourse ?
                                        <Button variant="outlined" color="view">
                                            continue
                                        </Button>
                                        :
                                        <Button variant="outlined" color="view">
                                            View
                                        </Button>
                                    }
                                </>
                            )
                        }
                    </Link>
                </Stack>
            </Box>
        </Grid>
        <Box>{/* <Divider /> */}</Box>
    </Grid>
    )
};


export default ListView;

ListView.propTypes = {
    item: PropTypes.objectOf(PropTypes.oneOfType(
        [PropTypes.string, PropTypes.object, PropTypes.array, PropTypes.bool, PropTypes.number]
    )).isRequired,
    myCourse: PropTypes.bool.isRequired,
};