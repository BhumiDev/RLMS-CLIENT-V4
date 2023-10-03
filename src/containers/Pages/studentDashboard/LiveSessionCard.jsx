import { Avatar, Button, Chip, Stack, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import PeopleIcon from '@mui/icons-material/People';


const LiveSessionCard = ({ item }) => (
    <Grid container direction="row" justifyContent="space-between" m={4}>
      
        <Grid item justifyContent="center" mt={4}>
            {item.id}
        </Grid>
        <Grid item md={4}>
            <Stack direction="row">
                <Typography variant="Caption2" fontSize="small" mt={1} mr={2}>
                    {item.liveIcon}
                    {item.live}
                </Typography>

                <Chip label={item.topic} />
            </Stack>
            <Typography
                variant="Caption"
                sx={{
                    Weight: '500',
                    Size: '17px',
                    lineHeight: '23.8px',
                    Letter: '0.5 px'
                }}
            >
                {item.title}
            </Typography>
            <Typography
                sx={{
                    Weight: '400',
                    Size: '10px',
                    LineHeight: '12px',
                    Letter: '0.4 px',
                    color: '#656a71'
                }}
                variant="subtitle2"
            >
                {item.componentTimer}
                {item.status}&nbsp;
                {item.remainingTime}
            </Typography>
        </Grid>
        <Grid item md={2}>
            <Stack direction="row" mt={3}>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ mt: -0.7, mr: 0.6 }}
                />
                <Typography variant="caption" color="#83878d">
                    Instructor
                    <br />
                    <Typography
                        variant="caption"
                        fontWeight="bold"
                        color="#282f38"
                    >
                        {item.instructorName}
                    </Typography>
                </Typography>
            </Stack>
        </Grid>
        <Grid item md={2} color="primary.light">
            <Stack direction="row">
                {item.componentCalendar}
                {item.date} &nbsp; {item.componentWatch}
                {item.time}
            </Stack>
            <Stack direction="row" marginBottom={3} mt={0.6}>
                <PeopleIcon />
                <Typography variant="body2">{item.numberOfStudent}</Typography>
                <Typography marginLeft={4} variant="body2">
                    attending...
                </Typography>
            </Stack>
        </Grid>
        <Grid mt={2} md={2}>
            <Button
                variant="contained"
                sx={{ backgroundColor: 'secondary.main', size: 'small' }}
                borderRadius="16px"
            >
                Attend
            </Button>
        </Grid>
    </Grid>
);

export default LiveSessionCard;

LiveSessionCard.propTypes = {
    item: PropTypes.arrayOf(PropTypes.array).isRequired
};
