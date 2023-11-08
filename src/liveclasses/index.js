import * as React from 'react';
import {
    Grid,
    Typography,
    Box,
    Button,
    Stack,
    Chip,
    TextField
} from '@mui/material';
import { format } from 'date-fns';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import Axios from 'axios';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CircleIcon from '@mui/icons-material/Circle';
import TodayIcon from '@mui/icons-material/Today';
import { GridSearchIcon } from '@mui/x-data-grid';
import ApiConfig from '../config/ApiConfig';
import { Link } from 'react-router-dom';
import live from '../assets/images/liveClasses.png';
import moment from 'moment/moment';

const token = localStorage.getItem('token');

const LiveClasses = () => {
    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState();
    const [meeting, setMeeting] = React.useState();
    const token = localStorage.getItem('token');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose1 = () => {
        setOpen(false);
        window.open(meeting);
    };

    const getLiveData = async () => {
        try {
            const res = await Axios.get(
                `${ApiConfig.liveClass.getAllLiveClasses}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            setData(res.data.data.slice(0, 4));

            const res2 = await Axios.get(`${ApiConfig.course.getAllCourses}`);

            setCourse(res2);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        getLiveData();
    }, []);

    const handleMeeting = (e) => {
        setMeeting(e.target.value);
    };
    return (
        <Grid
            container
            p={{ sm: 1, md: 0, xs: 1 }}
            px={{ md: 10 }}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: 'calc(100vh - 185px)'
            }}
        >
            <Grid item>
                <Box
                    my={3}
                    p={{ md: 2, xs: 0, sm: 0 }}
                    md={6}
                    sx={{
                        width: { lg: '75%', md: '75%', sm: '100%', xs: '100%' }
                        // mx: { lg: '20%', md: '3%', sm: '1%' }
                    }}
                >
                    {/* <Typography
                        variant="body1"
                        sx={{
                            alignItems: 'center',
                            mb: 8,
                            fontWeight: 500,
                            color: 'primary.light'
                            [theme.breakpoints.down('md')]: {
                                mb: 4,
                            width:'100%' }
                        }}
                    >
                        {' '}
                    </Typography> */}
                    <Typography
                        variant="h3"
                        sx={{
                            display: 'flex',
                            mt: 8
                            // width: '100%'
                        }}
                    >
                        Create live session!
                    </Typography>
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                display: 'flex'
                                // width: '100%'
                            }}
                        >
                            Make concept clarification and doubt solving easy
                            with regular checks and interactions.
                        </Typography>
                    </Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <Link to="/dashboard/liveclasses/schedule">
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<AccessTimeIcon />}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    width: '100%',
                                    height: '70px',
                                    padding: '6px 21px'
                                }}
                            >
                                Schedule live for later
                            </Button>
                        </Link>
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleClickOpen}
                                startIcon={<AddBoxIcon />}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    width: '100%',
                                    height: '70px',
                                    padding: '6px 21px'
                                }}
                            >
                                Join meeting
                            </Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <TextField
                                            label="Name"
                                            id="outlined-size-small"
                                            defaultValue=""
                                            columns={10}
                                            sx={{ m: 1, width: '25ch' }}
                                        />
                                        <TextField
                                            label="Meeting Url"
                                            id="outlined-size-small"
                                            defaultValue=""
                                            columns={10}
                                            sx={{ m: 1, width: '25ch' }}
                                            onChange={handleMeeting}
                                        />
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleClose}
                                        sx={{ color: 'secondary.main' }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleClose1}
                                        autoFocus
                                        sx={{ color: 'secondary.main' }}
                                    >
                                        Join
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Stack>
                </Box>
            </Grid>
            {/* box on right side */}

            <Grid item md={3.2} sm={12} xs={12} borderLeft="2px solid #cecece">
                <Box sx={{ typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                            <TabList
                                aria-label="lab API tabs example"
                                TabIndicatorProps={{
                                    sx: { backgroundColor: 'secondary.main' }
                                }}
                            >
                                <Tab label="Upcoming" value="1" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {data?.map((item, e) => (
                                <Stack
                                    key={e}
                                    borderBottom="1px solid #cecece"
                                    pb={1}
                                >
                                    {/* <Stack direction="row">
                                        <CircleIcon backgroundColor="red" fontSize="small" color="error" />
                                        <Typography color="error" size="small" variant='subtitle2'>
                                            Live Now
                                        </Typography>
                                    </Stack> */}
                                    <Typography>{item.course}</Typography>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Chip
                                            label={item.category}
                                            sx={{ fontSize: '10px' }}
                                        />

                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="end"
                                            variant="subtitle2"
                                            sx={{ color: 'primary' }}
                                        >
                                            <Box display="flex" gap="3px">
                                                <TodayIcon fontSize="xs" />
                                                <Typography variant="body2">
                                                    {' '}
                                                    {moment(
                                                        item.setDate
                                                    ).format('YYYY-MM-DD')}{' '}
                                                </Typography>
                                                <AccessTimeFilledIcon fontSize="xs" />
                                                <Typography variant="body2">
                                                    {' '}
                                                    {moment(
                                                        item.setDate
                                                    ).format('h:mm a')}{' '}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Stack>
                                </Stack>
                            ))}
                        </TabPanel>
                    </TabContext>
                </Box>
                <Box display="flex" justifyContent="end">
                    <Box component="img" src={live} alt="class" />
                </Box>
            </Grid>
        </Grid>
    );
};
export default LiveClasses;
