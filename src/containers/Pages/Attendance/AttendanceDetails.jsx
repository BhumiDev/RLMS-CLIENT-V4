import { useLocation } from "react-router-dom"
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
import { attendanceDetailsBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { formatDurationWithDay } from ".";

export const AttendanceDetails = () => {

    //to be shown only in instructor module

    const location = useLocation();
    const data = location?.state?.data;
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <>
            <Box px={{ md: 12, sm: 2, xs: 3 }} sx={{ minHeight: '78.2vh' }} mb={5}>
                <Box mt={3}>
                    <BreadCrumb breadItems={attendanceDetailsBreadcrumb} />
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    width="100%"
                    justifyContent="center"
                >
                    <Typography
                        variant="h5"
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
                        <GroupsIcon /> Attendance Details
                    </Typography>
                </Box>

                {/* Search user textfield */}

                <Box display="flex" gap={2} justifyContent="flex-end" mt={3} flexDirection={{ md: 'row', sm: 'row', xs: 'column' }}>
                    <TextField
                        label="Search User"
                        value={searchValue}
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                {/* table starts */}
                <Box mt={5}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>UserId</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Login Time</TableCell>
                                    <TableCell>Logout Time</TableCell>
                                    <TableCell>Active Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.filter((item) => { //filtering the whole data according to value in search input
                                    if (!searchValue) return true;
                                    if (item.studentId.toLowerCase().includes(searchValue)
                                        || item.userName.toLowerCase().includes(searchValue)
                                        || item.studentId.toUpperCase().includes(searchValue)
                                        || item.userName.toUpperCase().includes(searchValue)) return true;
                                }).map((row, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{
                                            '& td': {
                                                border: 0,
                                            },
                                            border: 2,
                                            color: 'primary.main',
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.loginDate}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row?.studentId}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row?.userName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {new Date(
                                                row?.loginTime
                                            ).toLocaleString()}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row?.logoutTime &&
                                                new Date(
                                                    row?.logoutTime
                                                ).toLocaleString()}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row?.activeTime &&
                                                formatDurationWithDay(row?.activeTime)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}