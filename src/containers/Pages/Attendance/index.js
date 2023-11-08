import {
    Box,
    InputAdornment,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { attendanceBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { getAttendances, getOverAllAttendance } from '../../../API/Attendance';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CallMadeIcon from '@mui/icons-material/CallMade';
import jwtDecode from 'jwt-decode';

//function to convert milliseconds to days,hours,minutes,seconds format
export const formatDurationWithDay = (ms) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
    return (
        days +
        'd ' +
        ': ' +
        hours +
        'h ' +
        ': ' +
        minutes +
        'm ' +
        ': ' +
        sec +
        's '
    );
};

export const Attendance = () => {
    const [allAttendance, setAllAttendance] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectValue, setSelectValue] = useState('all');

    const handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    };

    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);

    const getAllAttendances = async () => {
        const res = await getOverAllAttendance();
        console.log('res of all atttendance', res);
        setAllAttendance(
            res.sort((a, b) => new Date(b._id.date) - new Date(a._id.date))
        );
    };

    const getAttendance = async () => {
        const res = await getAttendances();
        console.log('res of atttendance', res);
        setAllAttendance(
            res?.filter((item) => item?.userId?._id === user?._id).reverse() //filtering data according to student logged in
        );
    };

    //get attendance API called according to user role
    useEffect(() => {
        if (user?.role === 'instructor') {
            getAllAttendances();
        } else {
            getAttendance();
        }
    }, []);

    const handleChange = (e) => {
        setSearchValue(e.target.value.replace(/^\s+/, '').toLowerCase());
    };

    useEffect(() => {
        if (selectValue) {
            const today = new Date();
            let filtered;

            switch (selectValue) {
                //to filter attendance for present day
                case 'today':
                    const startOfToday = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                    );
                    const endOfToday = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() + 1
                    );
                    if (user?.role === 'instructor') {
                        filtered = allAttendance?.filter((item) => {
                            const itemDate = new Date(item?._id?.date);
                            console.log(
                                'qwertyuio',
                                itemDate,
                                startOfToday,
                                endOfToday
                            );
                            return (
                                itemDate >= startOfToday &&
                                itemDate < endOfToday
                            );
                        });
                    } else {
                        filtered = allAttendance?.filter((item) => {
                            const itemDate = new Date(item?.loginTime);
                            return (
                                itemDate >= startOfToday &&
                                itemDate < endOfToday
                            );
                        });
                    }

                    setFilteredData(filtered);
                    break;

                //to filter attendance for yesterday
                case 'yesterday':
                    const startOfYesterday = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - 1
                    );
                    const endOfYesterday = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                    );

                    if (user?.role === 'instructor') {
                        filtered = allAttendance?.filter((item) => {
                            const itemDate = new Date(item?._id?.date);
                            return (
                                itemDate >= startOfYesterday &&
                                itemDate < endOfYesterday
                            );
                        });
                    } else {
                        filtered = allAttendance?.filter((item) => {
                            const itemDate = new Date(item?.loginTime);
                            return (
                                itemDate >= startOfYesterday &&
                                itemDate < endOfYesterday
                            );
                        });
                    }
                    setFilteredData(filtered);
                    break;

                //to filter attendance for last week
                case 'lastWeek':
                    const startOfLastWeek = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - 7
                    );
                    const endOfLastWeek = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                    );

                    if (user?.role === 'instructor') {
                        filtered = allAttendance?.filter((item) => {
                            const itemDate = new Date(item?._id?.date);
                            return (
                                itemDate >= startOfLastWeek &&
                                itemDate < endOfLastWeek
                            );
                        });
                    } else {
                        filtered = allAttendance?.filter((item) => {
                            const itemDate = new Date(item.loginTime);
                            return (
                                itemDate >= startOfLastWeek &&
                                itemDate < endOfLastWeek
                            );
                        });
                    }

                    setFilteredData(filtered);
                    break;

                //show all the attendance
                case 'all':
                    setFilteredData(allAttendance);
                    break;

                default:
                    setFilteredData(allAttendance);
                    break;
            }
        } else {
            setFilteredData(allAttendance);
        }
    }, [selectValue, allAttendance]);

    return (
        <>
            <Box
                px={{ md: 12, sm: 2, xs: 3 }}
                sx={{ minHeight: '78.2vh' }}
                mb={5}
            >
                <Box mt={3}>
                    <BreadCrumb breadItems={attendanceBreadcrumb} />
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    width="100%"
                    justifyContent="center"
                >
                    <Typography
                        variant="h3"
                        color="text.primary"
                        sx={{
                            fontWeight: 600
                        }}
                        display="flex"
                        alignItems="center"
                        width="100%"
                        justifyContent="center"
                        gap={1}
                    >
                        <GroupsIcon sx={{ fontSize: '40px' }} /> Attendance
                    </Typography>
                </Box>

                {/* Search user textfield and filter by time dropdown */}

                <Box
                    display="flex"
                    gap={2}
                    justifyContent="flex-end"
                    mt={3}
                    flexDirection={{ md: 'row', sm: 'row', xs: 'column' }}
                >
                    {user?.role === 'instructor' && (
                        <TextField
                            label="Search By UserID/Name"
                            value={searchValue}
                            onChange={(e) => handleChange(e)}
                            // InputProps={{
                            //     endAdornment: (
                            //         <InputAdornment>
                            //             <SearchIcon />
                            //         </InputAdornment>
                            //     )
                            // }}
                        />
                    )}
                    <Box sx={{ minWidth: 270 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Filter By Time
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectValue}
                                label="Filter By Time"
                                onChange={(e) => handleSelectChange(e)}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="yesterday">Yesterday</MenuItem>
                                <MenuItem value="lastWeek">Last Week</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* table starts */}
                <Box my={5}>
                    {filteredData?.filter((item) => {
                        //filtering the whole data according to value in search input
                        if (!searchValue) return true;
                        if (
                            item.data[0].studentId
                                .toLowerCase()
                                .includes(searchValue) ||
                            item.data[0].studentId
                                .toUpperCase()
                                .includes(searchValue) ||
                            item.data[0].userName
                                .toLowerCase()
                                .includes(searchValue) ||
                            item.data[0].userName
                                .toUpperCase()
                                .includes(searchValue)
                        )
                            return true;
                    }).length > 0 ? (
                        // {filteredData.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            Date
                                        </TableCell>
                                        <TableCell align="center">
                                            UserId
                                        </TableCell>
                                        <TableCell align="center">
                                            Name
                                        </TableCell>

                                        {/* column for student only */}
                                        {user?.role === 'student' && (
                                            <>
                                                <TableCell align="center">
                                                    Login Time
                                                </TableCell>
                                                <TableCell align="center">
                                                    Logout Time
                                                </TableCell>
                                            </>
                                        )}

                                        <TableCell align="center">
                                            {' '}
                                            Active Time
                                        </TableCell>

                                        {/* column for instructor only */}
                                        {user?.role === 'instructor' && (
                                            <>
                                                <TableCell align="center">
                                                    Status
                                                </TableCell>
                                                <TableCell align="center">
                                                    Detailed View
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData
                                        ?.filter((item) => {
                                            //filtering the whole data according to value in search input
                                            if (!searchValue) return true;
                                            if (
                                                item.data[0].studentId
                                                    .toLowerCase()
                                                    .includes(searchValue) ||
                                                item.data[0].studentId
                                                    .toUpperCase()
                                                    .includes(searchValue) ||
                                                item.data[0].userName
                                                    .toLowerCase()
                                                    .includes(searchValue) ||
                                                item.data[0].userName
                                                    .toUpperCase()
                                                    .includes(searchValue)
                                            )
                                                return true;
                                        })
                                        .map((row, i) => (
                                            <TableRow
                                                key={i}
                                                sx={{
                                                    '& td': {
                                                        border: 0
                                                    },
                                                    border: 2,
                                                    color: 'primary.main',
                                                    '.css-kpq8dj-MuiTableCell-root':
                                                        {
                                                            borderBottom: 0
                                                        }
                                                }}
                                            >
                                                {user?.role ===
                                                    'instructor' && (
                                                    <>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {row?._id?.date}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {
                                                                row?.data[0]
                                                                    ?.studentId
                                                            }
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {
                                                                row?.data[0]
                                                                    ?.userName
                                                            }
                                                        </TableCell>
                                                    </>
                                                )}

                                                {/* custom columns for student */}
                                                {user?.role === 'student' && (
                                                    <>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {new Date(
                                                                row?.loginDate
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {
                                                                row?.userId
                                                                    ?.userId
                                                            }
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {
                                                                row?.userId
                                                                    ?.userName
                                                            }
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {new Date(
                                                                row?.loginTime
                                                            ).toLocaleString()}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {row?.logoutTime &&
                                                                new Date(
                                                                    row?.logoutTime
                                                                ).toLocaleString()}
                                                        </TableCell>
                                                    </>
                                                )}

                                                {/* custom columns for instructor */}
                                                {user?.role === 'instructor' ? (
                                                    <>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {row?.totalActiveTive &&
                                                                formatDurationWithDay(
                                                                    row?.totalActiveTive
                                                                )}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    color:
                                                                        Math.abs(
                                                                            //function to calculate hours from milliseconds
                                                                            row?.totalActiveTive
                                                                        ) /
                                                                            36e5 >=
                                                                        1
                                                                            ? 'success.main'
                                                                            : 'error.main'
                                                                }}
                                                            >
                                                                {Math.abs(
                                                                    //function to calculate hours from milliseconds
                                                                    row?.totalActiveTive
                                                                ) /
                                                                    36e5 >=
                                                                1
                                                                    ? 'Present'
                                                                    : 'Absent'}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            <Link
                                                                to="/dashboard/student-attendance-details"
                                                                state={{
                                                                    data: row?.data
                                                                }}
                                                            >
                                                                <CallMadeIcon />
                                                            </Link>
                                                        </TableCell>
                                                    </>
                                                ) : (
                                                    <TableCell align="center">
                                                        {row?.activeTime &&
                                                            formatDurationWithDay(
                                                                row?.activeTime
                                                            )}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Box display="flex" justifyContent="center">
                            <Typography>No results found</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};
