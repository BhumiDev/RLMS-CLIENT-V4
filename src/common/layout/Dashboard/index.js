import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    TextField,
    Avatar,
    InputAdornment,
    useMediaQuery,
    ListItemIcon,
    Button,
    useTheme,
    Menu,
    MenuItem,
    Grid,
    DialogTitle,
    DialogContent,
    Badge
    // Container
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Notifications, Search, Close, Logout } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
// import {useTheme  } from '@mui/material/styles';
import jwtDecode from 'jwt-decode';

// import PropTypes from 'prop-types';
import Logo from '../../../assets/Logo.svg';
import './index.css';
import {
    checkAssessmentAvailabitlity,
    getAllCircular,
    getCurrentUser,
    searchCourse
} from '../../../API/Course';
import { border } from '@mui/system';

// ----------------------------------------------------------------------
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
// ----------------------------------------------------------------------

// import { socket } from '../../../containers/Pages/studentDashboard';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { useCurrentChatContext } from '../../../containers/Pages/ChatBox/ChatContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { format } from 'timeago.js';
import Apiconfig from '../../../config/ApiConfig';
import PersonIcon from '@mui/icons-material/Person';
import ThemeConfig from '../../../theme';
import { useSelector } from 'react-redux';
import { settoggleTheme, storePrevThemes } from '../../../theme/reducer';
import { store } from '../../../store';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Polls } from '../../../containers/Pages/Polls';
import Survey from '../../../containers/Pages/Survey';
import { StudentAssessment } from '../../../containers/Pages/QuestionBank/StudentAssessment';
import { updateAttendance } from '../../../API/Attendance';

const drawerWidth = 240;

const DashboardLayout = (props) => {
    const [user, setUser] = useState(null);
    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);
    const [appNotifications, setAppNotifications] = useState([]);
    const [msgNotifications, setMsgNotifications] = useState([]);
    const theme = useTheme();
    const location = useLocation();
    const currentPath = location?.pathname.split('/', 3).join('/');
    // console.log('active handle data location', currentPath);
    // console.log('splited current path', currentPath.split('/', 3).join('/'));

    const [pollsShow, setPollsShow] = useState(false);

    const highlighter = (path) => (currentPath === path ? 'active' : null);

    const { currentChat, setCurrentChat, socket } = useCurrentChatContext();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const data = token && jwtDecode(token);
        getUser();
        getAllCirculars();
    }, [currentPath]);

    const themeMode = useSelector((state) => state?.theme?.mode);
    const prevThemes = useSelector((state) => state?.theme?.prevTheme);

    // console.log('prevTheme', prevThemes);

    const [checked, setChecked] = useState(false);

    useEffect(() => {}, [themeMode]);
    const handleToggle = () => {
        setChecked(!checked);

        // console.log('toggle theme called', themeMode);
        if (!checked) {
            store.dispatch(settoggleTheme('dark'));
        } else {
            store.dispatch(settoggleTheme('light'));
        }
    };

    // console.log('themeMode', themeMode);

    const [available, setAvailable] = useState(true);

    const checkAvailability = async () => {
        const res = await checkAssessmentAvailabitlity();
        setAvailable(res.data.isAttempted);
    };

    useEffect(() => {
        checkAvailability();
    }, [available]);

    // console.log('available', available);

    const getUser = async () => {
        const res = await getCurrentUser();
        setUser(res?.data?.data);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token to be decoded', token);
        const user = token && jwtDecode(token);
        if (token) {
            socket &&
                socket.on('sendNotification', (data) => {
                    console.log(
                        'in sendNotification',
                        data.filter((x) => x.doneBy._id !== user?._id)
                    );
                    setAppNotifications(
                        data.filter((x) => x?.doneBy?._id !== user?._id)
                    );
                });
            socket &&
                socket.on('live-notification', (data) => {
                    console.log('in liveNotification', data);
                    setAppNotifications([
                        ...appNotifications,
                        data.filter((x) => x?.doneBy?._id !== user?._id)
                    ]);
                });
            socket &&
                socket.on('getNotification', (data) => {
                    setMsgNotifications((prev) => [...prev, data]);
                });
            setPollsShow(true);
            // setShowSurvey(true);
        }
    }, [socket]);

    // console.log('notifications---------', appNotifications);

    const mp = new Map(
        msgNotifications.map((o) => [
            o.senderId,
            { ...o, count: 0, _id: o.conversationId }
        ])
    );
    for (const { senderId } of msgNotifications) mp.get(senderId).count++;
    const msgCountresult = Array.from(mp.values());
    const filteredCount = msgCountresult.filter(
        (n) => n._id !== currentChat?._id && n.senderId !== user._id
    );

    // console.log('msgCount', filteredCount);

    const toggleSearch = () => {
        setSearch(!search);
    };
    const navigate = useNavigate();

    // const attendanceId = useSelector((state) => state?.authReducer?.attendanceId);
    const attendanceId = localStorage.getItem('attendanceId');

    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [expand, setExpand] = useState(mdDown);

    const [showSurvey, setShowSurvey] = useState(false);

    const [show, setShow] = useState(false);
    // console.log('show1', show);
    const handleClickOpen = () => {
        setShow(true);
    };

    const handleClose1 = () => {
        setShow(false);
        store.dispatch(settoggleTheme(prevThemes));
    };

    const setTheme = () => {
        setShow(false);
    };

    const handleTheme = (theme) => {
        console.log('clicked');
        store.dispatch(storePrevThemes());
        store.dispatch(settoggleTheme(theme));
    };

    let customStyle = {
        transition: theme.transitions.create('width'),
        width: '100%'
    };

    if (mdDown) {
        customStyle = {
            ...customStyle,
            width: '50px',
            color: 'red'
        };
    }

    const logout = async () => {
        localStorage.removeItem('token');
        const update = await updateAttendance(attendanceId);
        console.log('update attendance', update);
        socket.disconnect();
        navigate('/');
    };

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const handleChange = async (e) => {
        console.log(e.target.value);
        setInputSearch(e.target.value);

        if (e.target.value !== '') {
            let data = await searchCourse(e.target.value);
            navigate('/dashboard/search', { state: data });
        } else {
            navigate('/dashboard');
        }
    };

    // const handleKeyPress = async (e) => {
    //     if (inputSearch !== '' && e.key === 'Enter') {
    //         console.log('jiii enter');

    //         console.log('value of input', inputSearch);
    //         let data = await searchCourse(inputSearch);
    //         navigate('/dashboard/search', { state: data });
    //     }

    //     return;
    // };

    const handleSubmit = async () => {
        console.log('in handle submit');

        console.log('value of input', inputSearch);
        let data = await searchCourse(inputSearch);
        navigate('/dashboard/search', { state: data });
    };

    const debounceOnChange = useCallback(debounce(handleChange), []);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleNotificationsDrawerToggle = () => {
        setNotificationsOpen(!notificationsOpen);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const profileOpen = Boolean(profileAnchorEl);

    const handleProfileClick = (e) => {
        setProfileAnchorEl(e.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };

    const [allCircular, setAllCircular] = useState([]);
    const [instructorCircular, setInstructorCircular] = useState([]);
    const [studentCircular, setStudentCircular] = useState([]);

    const [circularAnchorEl, setCircularAnchorEl] = useState(null);
    const circularOpen = Boolean(circularAnchorEl);

    const handleCircularClick = (e) => {
        setCircularAnchorEl(e.currentTarget);
    };

    const handleCircularClose = () => {
        setCircularAnchorEl(null);
    };

    const getAllCirculars = async () => {
        const res = await getAllCircular();
        // console.log('res', res);
        setInstructorCircular(res?.data?.instructorCirculars);
        setAllCircular(res?.data?.circularForBoth);
        setStudentCircular(res?.data?.studentCirculars);
    };

    const drawer = (
        <div>
            <Button onClick={handleDrawerToggle}>
                {' '}
                <CloseIcon />{' '}
            </Button>
            <Divider />
            <List onClick={handleDrawerToggle}>
                {/* {[
                    'Dashboard',
                    'Courses',
                    'Resolve Doubts',
                    'Schedule Live',
                    'Whiteboard'
                ].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                <Link to="/dashboard" style={{ color: 'primary' }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </Link>
                <Link
                    to={
                        user?.role === 'instructor'
                            ? '/dashboard/courses/my-courses'
                            : '/dashboard/courses/all-courses'
                    }
                    style={{ color: 'primary' }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ImportContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Courses" />
                    </ListItemButton>
                </Link>
                <Link
                    to={'/dashboard/learning-path'}
                    style={{ color: 'primary' }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ImportContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Learning Paths" />
                    </ListItemButton>
                </Link>
                {/* for student nav----------------------------------- */}
                {user?.role === 'student' ? (
                    <>
                        <Link
                            to="/dashboard/chat-Box"
                            style={{ color: 'primary' }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <ChatIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ask Doubts" />
                            </ListItemButton>
                        </Link>
                    </>
                ) : (
                    // ------------------------------------
                    <>
                        <Link
                            to="/dashboard/chat-Box"
                            style={{ color: 'primary' }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <ChatIcon />
                                </ListItemIcon>
                                <ListItemText primary="Resolve Doubts" />
                            </ListItemButton>
                        </Link>
                        <Link
                            to="/dashboard/liveclasses"
                            style={{ color: 'primary' }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <OndemandVideoIcon />
                                </ListItemIcon>
                                <ListItemText primary="Schedule Live" />
                            </ListItemButton>
                        </Link>
                        <Link to="/whiteboard" style={{ color: 'primary' }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <NoteAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="Whiteboard" />
                            </ListItemButton>
                        </Link>
                    </>
                )}
            </List>
            <Divider />
        </div>
    );

    // ***************************************************************************
    // ***************************************************************************
    return (
        <Box>
            {pollsShow && <Polls setShowSurvey={setShowSurvey} />}
            {showSurvey && <Survey />}
            {!available && user?.role === 'student' && <StudentAssessment />}
            <Dialog
                open={show}
                // onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    select your preferred theme
                </DialogTitle>
                <DialogContent>
                    <Button
                        onClick={() => handleTheme('light')}
                        variant="text"
                        sx={{ color: '#3498db' }}
                    >
                        Default
                    </Button>
                    <Button
                        onClick={() => handleTheme('dark')}
                        variant="text"
                        sx={{ color: '#bb86fc' }}
                    >
                        Dark
                    </Button>
                    <Button
                        onClick={() => handleTheme('pink')}
                        variant="text"
                        sx={{ color: '#FF74B1' }}
                    >
                        Roseate
                    </Button>
                    <Button
                        onClick={() => handleTheme('humid')}
                        variant="text"
                        sx={{ color: '#F7D060' }}
                    >
                        Amber
                    </Button>
                    <Button
                        onClick={() => handleTheme('saffron')}
                        variant="text"
                        sx={{ color: '#F46C1F' }}
                    >
                        Autumn
                    </Button>
                    <Button
                        onClick={() => handleTheme('gradient')}
                        // variant="filled"
                        // sx={{background:"linear-gradient(86.52deg, #493071 32.24%, #54C1BA 135.46%)"}}
                        variant="text"
                        sx={{ color: '#0250AB' }}
                    >
                        Ramp
                        {/* <Typography sx={{color: "#ffffff"}}> </Typography> */}
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1} sx={{ color: 'error.main' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={setTheme}
                        variant="outlined"
                        color="secondary"
                    >
                        Set Theme
                    </Button>
                </DialogActions>
            </Dialog>
            <AppBar
                position="static"
                sx={{
                    [theme.breakpoints.down('md')]: { px: 3 },
                    [theme.breakpoints.up('md')]: { px: 12 }
                }}
                className="box-shadow"
                elevation={0}
                maxwidth="sm"
            >
                <Toolbar disableGutters elevation={4}>
                    {/* <Container> */}
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: {
                                    xs: 'block',
                                    md: 'none',
                                    sm: 'block',
                                    lg: 'none'
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box
                            display="flex"
                            sx={{
                                [theme.breakpoints.down('sm')]: { width: 120 }
                            }}
                        >
                            <img src={Logo} alt="logo" />
                        </Box>
                    </Box>{' '}
                    {/* <Icon */}
                    {/* <IconButton
                        onClick={logout}
                        sx={{ color: '#fff' }}
                        aria-label="sign-out"
                        component="label"
                    >
                        <Logout />
                    </IconButton> */}
                    {/* <MenuItem>
                        <FormControlLabel
                            control={
                                <MaterialUISwitch
                                    sx={{ m: 1 }} 
                                    defaultChecked={checked}
                                    onChange={handleToggle}
                                />
                            } */}
                    {/* //   label="Theme Mode" */}
                    {/* // /> */}
                    {/* </MenuItem> */}
                    <Box
                        mr={3}
                        display={{ sm: 'none', xs: 'none', md: 'block' }}
                    >
                        <div id="google_translate_element"></div>
                    </Box>
                    {user?.role === 'student' && (
                        <Box
                            mx={2}
                            display={{ sm: 'none', xs: 'none', md: 'block' }}
                        >
                            <Badge badgeContent={4} color="primary">
                                <WorkspacePremiumIcon color="text.primary" />
                            </Badge>
                        </Box>
                    )}
                    <IconButton
                        sx={{ color: 'secondary.navColorText' }}
                        onClick={handleCircularClick}
                        size="small"
                        aria-controls={
                            circularAnchorEl ? 'account-menu' : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={circularOpen ? 'true' : undefined}
                    >
                        <NewspaperIcon sx={{ mx: 2 }} />
                    </IconButton>
                    <Menu
                        anchorEl={circularAnchorEl}
                        id="account-menu"
                        open={circularOpen}
                        onClose={handleCircularClose}
                        onClick={handleCircularClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 35,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0
                                }
                            }
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top'
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom'
                        }}
                    >
                        {allCircular?.map((circular) => (
                            <>
                                <Link
                                    to="/dashboard/circular"
                                    state={{
                                        data: circular
                                    }}
                                >
                                    <MenuItem
                                        sx={{
                                            display: 'block',
                                            minWidth: '300px'
                                        }}
                                    >
                                        <Typography color="text.primary">
                                            {circular?.agenda}
                                        </Typography>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '12px !important'
                                                }}
                                                color="text.primary"
                                            >
                                                {format(circular.createdAt)}
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                </Link>
                            </>
                        ))}
                        {user?.role === 'instructor' &&
                            instructorCircular?.map((circular) => (
                                <>
                                    <Link
                                        to="/dashboard/circular"
                                        state={{
                                            data: circular
                                        }}
                                    >
                                        <MenuItem
                                            sx={{
                                                display: 'block',
                                                minWidth: '300px'
                                            }}
                                        >
                                            <Typography color="text.primary">
                                                {circular?.agenda}
                                            </Typography>
                                            <Box
                                                display="flex"
                                                justifyContent="flex-end"
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            '12px !important'
                                                    }}
                                                    color="text.primary"
                                                >
                                                    {format(circular.createdAt)}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    </Link>
                                </>
                            ))}
                        {user?.role === 'student' &&
                            studentCircular?.map((circular) => (
                                <>
                                    <Link
                                        to="/dashboard/circular"
                                        state={{
                                            data: circular
                                        }}
                                    >
                                        <MenuItem
                                            sx={{
                                                display: 'block',
                                                minWidth: '300px'
                                            }}
                                        >
                                            <Typography color="text.primary">
                                                {circular?.agenda}
                                            </Typography>
                                            <Box
                                                display="flex"
                                                justifyContent="flex-end"
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            '12px !important'
                                                    }}
                                                    color="text.primary"
                                                >
                                                    {format(circular.createdAt)}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    </Link>
                                </>
                            ))}
                    </Menu>
                    <IconButton
                        onClick={handleClick}
                        sx={{ color: 'secondary.navColorText' }}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Notifications
                            sx={{
                                [theme.breakpoints.down('sm')]: { mx: 0.2 },
                                [theme.breakpoints.up('sm')]: { mx: 2 }
                            }}
                        />

                        <NotificationBadge
                            count={appNotifications?.length}
                            effect={[
                                null,
                                null,
                                { top: '-15px' },
                                { top: '-15px', right: '3px' }
                            ]}
                        />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 225,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0
                                }
                            }
                        }}
                        MenuListProps={{
                            sx: {
                                height: '90vh',
                                overflowY: 'auto',
                                paddingLeft: '16px',
                                paddingRight: '16px',
                                display: 'flex',
                                flexDirection: 'column'
                            }
                        }}
                    >
                        <Typography variant="h3" p={2}>
                            Notifications
                        </Typography>
                        {!appNotifications.length ? (
                            <MenuItem>No new messages</MenuItem>
                        ) : (
                            appNotifications.map((item) => {
                                return (
                                    <div>
                                        {item.type === 'like' ? (
                                            <MenuItem
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                    gap: '8px',
                                                    [theme.breakpoints.down(
                                                        'sm'
                                                    )]: {
                                                        display: 'block'
                                                    }
                                                }}
                                            >
                                                <Grid
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    <FavoriteIcon
                                                        sx={{ color: 'red' }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize:
                                                                '14px !important'
                                                        }}
                                                    >
                                                        {item?.doneBy?.userName}{' '}
                                                        liked
                                                    </Typography>
                                                </Grid>
                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            '10px !important'
                                                    }}
                                                >
                                                    {format(item?.createdAt)}
                                                </Typography>
                                            </MenuItem>
                                        ) : item.type === 'comment' ? (
                                            <MenuItem
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                    gap: '8px',
                                                    [theme.breakpoints.down(
                                                        'sm'
                                                    )]: {
                                                        display: 'block'
                                                    }
                                                }}
                                            >
                                                <Grid
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    <CommentIcon
                                                        sx={{
                                                            color: 'primary.light'
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize:
                                                                '14px !important'
                                                        }}
                                                    >
                                                        {item?.doneBy?.userName}{' '}
                                                        commented
                                                    </Typography>
                                                </Grid>
                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            '10px !important'
                                                    }}
                                                >
                                                    {format(item?.createdAt)}
                                                </Typography>
                                            </MenuItem>
                                        ) : item.type === 'Accepted' ||
                                          'Declined' ? (
                                            <MenuItem
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                    gap: '8px',
                                                    [theme.breakpoints.down(
                                                        'sm'
                                                    )]: {
                                                        display: 'block'
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            '14px !important'
                                                    }}
                                                    noWrap
                                                >
                                                    Enrollment Request
                                                    <span
                                                        style={{
                                                            fontWeight: '550',
                                                            color:
                                                                item.type ===
                                                                'Accepted'
                                                                    ? 'green'
                                                                    : 'red'
                                                        }}
                                                    >
                                                        &nbsp;{item.type}
                                                    </span>
                                                    &nbsp; for course
                                                    <span
                                                        style={{
                                                            fontWeight: '550'
                                                        }}
                                                    >
                                                        &nbsp;
                                                        {
                                                            item
                                                                .notificationData
                                                                .courseName
                                                        }
                                                    </span>
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            '10px !important'
                                                    }}
                                                >
                                                    {format(item?.createdAt)}
                                                </Typography>
                                            </MenuItem>
                                        ) : (
                                            ''
                                        )}
                                        <Divider
                                            sx={{
                                                width: '100%',
                                                borderWidth: '2px !important'
                                            }}
                                        />
                                    </div>
                                );
                            })
                        )}
                    </Menu>
                    <IconButton
                        onClick={handleProfileClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={profileOpen ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={profileOpen ? 'true' : undefined}
                    >
                        <Avatar
                            alt={user?.name}
                            src={Apiconfig.url + user?.profilePath}
                            sx={{ mr: 2 }}
                        />
                    </IconButton>
                    <Menu
                        anchorEl={profileAnchorEl}
                        id="account-menu"
                        open={profileOpen}
                        onClose={handleProfileClose}
                        onClick={handleProfileClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 35,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0
                                }
                            }
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top'
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom'
                        }}
                    >
                        <Link to="/dashboard/view-profile">
                            <MenuItem sx={{ color: 'text.primary' }}>
                                <PersonIcon sx={{ mr: 1 }} /> View Profile
                            </MenuItem>
                        </Link>
                        <Divider />
                        <Box>
                            <MenuItem
                                sx={{ color: 'text.primary' }}
                                onClick={handleClickOpen}
                            >
                                <FormatPaintIcon sx={{ mr: 1 }} /> Theme
                            </MenuItem>
                        </Box>

                        <Divider />
                        <MenuItem onClick={logout}>
                            <Logout sx={{ mr: 1 }} />
                            Logout
                        </MenuItem>
                    </Menu>
                    <Typography
                        variant="body1"
                        sx={{
                            [theme.breakpoints.down('sm')]: { display: 'none' }
                        }}
                    >
                        {user?.name}
                    </Typography>
                    {/* </Container> */}
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                    display: 'none'
                }}
                aria-label="mailbox folders"
            >
                <Drawer
                    // container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: {
                            xs: 'block',
                            md: 'none',
                            sm: 'block',
                            lg: 'none'
                        },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                sx={{
                    fontSize: '17px',
                    backgroundColor: 'primary.light',
                    // boxShadow: 10,
                    [theme.breakpoints.down('md')]: {
                        display: 'none'
                    },

                    [theme.breakpoints.down('sm')]: { px: 4, display: 'none' },
                    [theme.breakpoints.up('md')]: { px: 7 },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '15px !important'
                    }
                }}
            >
                <Box
                    maxwidth="xxl"
                    height="62px"
                    mx={5}
                    sx={{
                        display: 'flex',

                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        className="navlink-wrapper"
                        sx={{
                            color: 'primary.contrastText',
                            width: '100%',
                            gap: 3
                        }}
                    >
                        <Link
                            to="/dashboard"
                            name="dashboard"
                            style={{ marginRight: 12 }}
                            // onClick={activeHandler}
                            className={highlighter('/dashboard')}
                        >
                            <Typography color="secondary.navColorText">
                                Dashboard
                            </Typography>
                        </Link>
                        <Link
                            to={
                                user?.role === 'instructor'
                                    ? '/dashboard/courses/my-courses'
                                    : '/dashboard/courses/all-courses'
                            }
                            name="myCourses"
                            // style={{ marginLeft: 32 }}
                            style={{ marginRight: 12 }}
                            // onClick={activeHandler}
                            className={
                                highlighter('/dashboard/courses')
                                // user?.role === 'instructor'
                                //     ? highlighter('/dashboard/courses')
                                //     : highlighter('/dashboard/all-courses')
                            }
                        >
                            <Typography color="secondary.navColorText">
                                Courses
                            </Typography>
                        </Link>
                        {user?.role === 'instructor' && (
                            <Link
                                to="/dashboard/chat-Box"
                                name="askDoubt"
                                style={{ marginRight: 12 }}
                                // sx={{ mx: 2 }}
                                className={highlighter('/dashboard/chat-Box')}
                            >
                                <NotificationBadge
                                    count={msgNotifications?.length}
                                    effect={[
                                        null,
                                        null,
                                        { top: '0px' },
                                        { right: '-20px' }
                                    ]}
                                />
                                <Typography color="secondary.navColorText">
                                    Resolve Doubts
                                </Typography>
                            </Link>
                        )}
                        {user?.role === 'instructor' && (
                            <Link
                                to="/dashboard/liveclasses"
                                style={{
                                    marginRight: 12,
                                    color: 'text.primary'
                                }}
                                // sx={{ mx: 2 }}
                                name="live"
                                className={highlighter(
                                    '/dashboard/liveclasses'
                                )}
                            >
                                <Typography color="secondary.navColorText">
                                    Schedule Live
                                </Typography>
                            </Link>
                        )}

                        {/* {user?.role === 'student' && ( */}

                        {/* )} */}

                        {user?.role === 'student' && (
                            <Typography
                                to="/dashboard/chat-Box"
                                name="askDoubt"
                                // onClick={activeHandler}
                                className={highlighter('/dashboard/chat-Box')}
                                sx={{ cursor: 'pointer' }}
                                onClick={() =>
                                    // setMsgNotifications(
                                    //     msgNotifications.filter(
                                    //         (n) => n !== item
                                    //     )
                                    // )
                                    navigate('/dashboard/chat-Box', {
                                        replace: true
                                    })
                                }
                            >
                                <NotificationBadge
                                    count={msgNotifications?.length}
                                    effect={[
                                        null,
                                        null,
                                        { top: '0px' },
                                        { right: '-20px' }
                                    ]}
                                />
                                <Typography color="secondary.navColorText">
                                    Ask Doubt
                                </Typography>
                            </Typography>
                        )}

                        <Typography
                            to="/dashboard/learning-path"
                            name="learningPath"
                            // onClick={activeHandler}
                            className={highlighter('/dashboard/learning-path')}
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                                // setMsgNotifications(
                                //     msgNotifications.filter(
                                //         (n) => n !== item
                                //     )
                                // )
                                navigate('/dashboard/learning-path', {
                                    replace: true
                                })
                            }
                        >
                            <Typography color="secondary.navColorText">
                                Learning Paths
                            </Typography>
                        </Typography>

                        {user?.role === 'instructor' && (
                            <Link
                                to="/whiteboard"
                                name="whiteBoard"
                                // onClick={activeHandler}
                                className={highlighter('/whiteboard')}
                            >
                                <Typography color="secondary.navColorText">
                                    Whiteboard
                                </Typography>
                            </Link>
                        )}
                    </Box>
                    <Box
                        sx={{
                            width: '35%',
                            textAlign: 'right'
                        }}
                        id="search_field"
                    >
                        <TextField
                            size="small"
                            variant="filled"
                            placeholder="Search"
                            onChange={(e) => {
                                debounceOnChange(e);
                            }}
                            sx={{
                                width: '100%',

                                ...customStyle,

                                [theme.breakpoints.down('md')]: {
                                    '&:hover': {
                                        width: '100% !important'
                                    }
                                }
                            }}
                            InputProps={{
                                style: {
                                    background: '#fff',
                                    width: '100%',
                                    height: '45px',
                                    borderRadius: 4
                                },
                                inputProps: {
                                    style: {
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        color: '#474747'
                                    },
                                    className: 'custom-placeholder'
                                }

                                // endAdornment: (
                                //     <InputAdornment position="end">
                                //         <Search
                                //             className="searchIcon"
                                //             color="primary"
                                //             onClick={handleSubmit}
                                //         />
                                //     </InputAdornment>
                                // )
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            {/*                     
                </Grid>
               
                <Grid item> */}
            <Box
                sx={{
                    width: { lg: '100%', md: '100%', sm: '100%', xs: '100%' },
                    margin: 'auto'
                    // pb: '72px'
                    // p:"2%"
                }}
            >
                {/* <Box pt={{ xs: 2, md: 4 }}> */}
                <Outlet />
            </Box>
            <Box
                className="footer"
                textAlign="center"
                sx={{ backgroundColor: 'primary.main', p: 2, color: '#fff' }}
            >
                <Typography variant="body1">
                    Copyright © BhumiiTech 2021-2022
                </Typography>
            </Box>
        </Box>
    );
};

// DashboardLayout.propTypes = {
//     theme: PropTypes.objectOf(PropTypes.object).isRequired
// };

DashboardLayout.propTypes = {
    window: PropTypes.func
};

export default DashboardLayout;
