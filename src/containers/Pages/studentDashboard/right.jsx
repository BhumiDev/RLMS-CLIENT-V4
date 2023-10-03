import {
    Button,
    Typography,
    Avatar,
    Stack,
    Card,
    Box
} from '@mui/material';
import PropTypes from 'prop-types';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Apiconfig from '../../../config/ApiConfig';



const Right = ({ item }) => {

    console.log("item", item)
    const urlhandle = () => {
        window.open(item.url)
    }
    return (

        <Card md={3} sx={{ borderRadius: 0.5, mb: 3, boxShadow: 3 }}>
            <Box p={1}>
                <Stack mb={1}>
                    <Typography
                        variant="Caption"
                        sx={{
                            Weight: '500',
                            fontSize: '13px',
                            lineHeight: '23.8px',
                            Letter: '0.5 px',
                        }}
                    >
                        {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                    </Typography>

                </Stack>

                <Stack direction="row" variant="subtitle2">
                    <Typography>
                        <Stack
                            direction="row"
                            sx={{
                                Weight: '400',
                                fontSize: '13px',
                                LineHeight: '12px',
                                Letter: '0.4 px',
                                color: 'secondary'
                            }}
                            component='span'
                            variant="subtitle2"
                        >
                            <EventIcon sx={{ fontSize: '13px', marginTop: '3px' }} />
                            &nbsp;{item.setdate}
                        </Stack>
                    </Typography>
                </Stack>
                <Stack mb={2}>
                    <Box sx={{ width: 120 }}>
                        <Stack variant="subtitle2" direction="row" sx={{ fontSize: '13px' }}>
                            <WatchLaterIcon sx={{ fontSize: '13px', marginTop: '3px' }} />
                            &nbsp;{item.settime}
                        </Stack>
                    </Box>
                </Stack>
                {/* <Stack direction="row" marginBottom={3}>
                    <PeopleIcon color="primary.light" sx={{ fontSize: '15px', marginTop: '3px' }} />
                    <Typography variant="body2" color="primary.light" ml={0.5}>
                        2000
                    </Typography>
                    <Typography marginLeft={2} variant="body2" color="primary.light">
                        enrolled
                    </Typography>
                </Stack> */}
                <Stack direction="row" justifyContent="space-between" gap={1}>
                    <Stack direction="row">
                        <Avatar
                            alt={item.instructor}
                            src={Apiconfig.url + item.userId.profilePath}
                            sx={{ mt: 0.3, mr: 0.6, width: 27, height: 27 }}
                        />
                        <Typography variant="caption">
                            Instructor
                            <br />
                            <Typography variant="caption" fontWeight="bold">
                                {item?.instructor?.charAt(0).toUpperCase() + item.instructor?.slice(1)}
                            </Typography>
                        </Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        p={{ md: 2 }}
                        size='small'
                        color="attend"
                        borderradius="16px"
                        onClick={urlhandle}
                    >
                        Attend
                    </Button>
                </Stack>
            </Box>
        </Card>
        // {/* </Stack> */}
    );
}
export default Right;

Right.propTypes = {
    item: PropTypes.objectOf(PropTypes.oneOfType(
        [PropTypes.string, PropTypes.object, PropTypes.array, PropTypes.bool, PropTypes.number]
    )).isRequired
};
