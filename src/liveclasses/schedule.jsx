import * as React from 'react';
import { google, outlook, office365, yahoo, ics } from 'calendar-link';
import Axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import { Button, Grid, Typography } from '@mui/material';
import ApiConfig, { url } from '../config/ApiConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadExcelDialog from './uploadExcelDialog';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import moment from 'moment/moment';

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight:"12rem",
      },
    },
  };

const ScheduleLiveClasses = () => {
    const theme = useTheme();
    const [alpha, setAlpha] = React.useState();
    const [courses, setCourse] = React.useState('');
    const [data, setData] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [category, setcategory] = React.useState('');
    const [agendas, setAgenda] = React.useState('');
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [openDelete, setOpenDelete] = React.useState(false);
    const [cour, setCourses] = React.useState();
    const [scheduleLiveDIsable, setScheduleLiveDIsable] = React.useState(true);
    const token = localStorage.getItem('token');
    const [reload, setReload] = useState(true);
    let user = token && jwtDecode(token);

    useEffect(() => {
        console.log('reload', reload);
    }, [reload]);
    const handleChange = (event) => {
        console.log('handleChange', event.target.value);
        setCourse(event.target.value);
        for (let i = 0; i < cour.length; i++) {
            if (cour[i].courseName == event.target.value) {
                setcategory(cour[i].majorCategory);
            }
        }

        // const isEmptyPlaceholder = event.target.value === "";
        // setScheduleLiveDIsable(isEmptyPlaceholder || !event.target.value.trim())
    };

    const handleLive = async (id) => {
        console.log('hre');

        const response = await Axios.put(
            `${ApiConfig.liveClass.live}/${id}`,
            { live: 'true' },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );
        console.log('RESPONSE', response);
    };
    const getLiveData = async () => {
        try {
            const res = await Axios.get(
                `${ApiConfig.liveClass.getAllLiveClasses}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('response of get all live classes', res);
            setData(res.data.data);
            const res2 = await Axios.get(
                `${ApiConfig.course.myCoursesofInstructor}/${user?._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCourses(res2.data.data);

        } catch (err) {
            console.log(err);
        }
    };

    const deleteclass = async (id) => {
        setAlpha(!alpha);
        try {
            const res = await Axios.delete(
                `${url}/live/deleteLiveClasses/${id}`
            );
            setOpenDelete(false);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        getLiveData();
    }, [open, alpha, reload]);

    const handleChangeTitle = (event) => {
        setTitle(event.target.value.replace(/^\s+/, ''));
        const isEmptyPlaceholder = event.target.value === '';
        setScheduleLiveDIsable(
            isEmptyPlaceholder || !event.target.value.trim()
        );
    };

    const handleChangeInstructor = (event) => {
        setInstructor(event.target.value);
    };

    const handleChangeAgenda = (event) => {
        setAgenda(event.target.value.replace(/^\s+/, ''));
        // const isEmptyPlaceholder = event.target.value === "";
        // setScheduleLiveDIsable(isEmptyPlaceholder || !event.target.value.trim())
    };

    const handleChangeDate = (e) => {
        console.log("date", date);
        // console.log("date moment", moment(date).toISOString());
        setDate(e.target.value);
        // console.log("date1", moment(date).toISOString())
        // const isEmptyPlaceholder = e.target.value === "";
        // setScheduleLiveDIsable(isEmptyPlaceholder || !e.target.value.trim())
    };

    const handleChangeTime = (e) => {
        setTime(e.target.value);
        // const isEmptyPlaceholder = e.target.value === "";
        // setScheduleLiveDIsable(isEmptyPlaceholder || !e.target.value.trim())
    };

    const handleClickOpen = async () => {
        if (!title || !agendas || !date || !time || !courses) {
            // Display a toast or error message to inform the user to fill in all required fields.
            toast.error('Please! fill in all fields as they are required.', { autoClose: 3000 });
            return;
        }
        setOpen(true);
        console.log('arsh from live');
        const userId = token && jwtDecode(token);
        console.log(userId.userName);
        const num = Date.now() + Math.random();

        const murl = `https://rangemeet.bhumiitech.com/${num}`;

        const response = await Axios.post(
            `${ApiConfig.liveClass.createLiveClasses}`,
            {
                title,
                url: murl,
                instructor: userId.userName,
                setDate: moment(date).toISOString(),
                settime: time,
                course: courses,
                agenda: agendas,
                userId: userId,
                category: category,
                live: 'false'
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );
        console.log('RESPONSE', response);
        setReload(!reload);
        setTitle('');
        setDate('');
        setTime('');
        setCourse('');
        setAgenda('');
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (url) => {
        navigator.clipboard.writeText(url);
        toast.success('Url Copied', { autoClose: 1000 });
    };

    return (
        <Grid
            container
            p={4}
            justifyContent="space-between"
            sx={{ minHeight: 'calc(100vh - 185px)' }}
        >
            <Grid
                item
                md={7}
                mb={10}
                mt={1.5}
                lg={6}
                sm={12}
                ml={{ lg: 8, xl: 8, xs: 0, sm: 0, md: 8 }}
            >
                <div>
                    <TextField
                        label="Title"
                        id="outlined-size-small"
                        // columns={10}
                        value={title}
                        sx={{
                            m: 1,
                            width: { md: '100%', sm: '97%', xs: '90%' }
                        }}
                        onChange={handleChangeTitle}
                        
                        required // Add required attribute
                    />

                    <TextField
                        mt={2}
                        label="Meeting Agenda"
                        id="outlined-size-small"
                        // columns={10}
                        value={agendas}
                        sx={{
                            m: 1,
                            width: { md: '100%', sm: '97%', xs: '90%' }
                        }}
                        multiline
                        rows={8}
                        onChange={handleChangeAgenda}
                        
                        required // Add required attribute
                    />
                    <Stack direction="row" mt={2}>
                        {/*  <Stack component="form" noValidate spacing={3} direction="row" mr={4}> */}

                        <Stack
                            component="form"
                            ml={1}
                            noValidate
                            spacing={3}
                            direction={{ md: 'row', sm: 'row', xs: 'column' }}
                            mr={4}
                        >
                            <TextField
                                mt={2}
                                id="date"
                                label="Date"
                                type="date"
                                value={date}
                                defaultValue={Date.now()}
                                sx={{
                                    width: { md: 220, sm: '97%', xs: '100%' }
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={handleChangeDate}
                                
                        required // Add required attribute
                            />
                            <TextField
                                mt={2}
                                id="time"
                                label="Time"
                                type="time"
                                value={time}
                                // defaultValue="hh:mm"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    step: 300 // 5 min
                                }}
                                sx={{
                                    width: { md: 150, sm: '97%', xs: '100%' }
                                }}
                                onChange={handleChangeTime}
                                
                        required // Add required attribute
                            />
                        </Stack>
                    </Stack>
                    <Box
                        sx={{ width: { md: '100%', sm: '97%', xs: '90%' } }}
                        ml={1}
                        my={2}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Select course(s)
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courses}
                                label="Select course(s)"
                                // sx={{ width: '100%'}}
                                defaultValue="Select course(s)"
                                onChange={handleChange}
                                MenuProps={MenuProps}
                        required // Add required attribute
                            >
                                {cour?.map((item) => (
                                    <MenuItem
                                        value={item.courseName}
                                        name={item.majorCategory}
                                    >
                                        {item.courseName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        row
                    >
                        <FormControlLabel value="recurring" control={<Radio />} label="recurring" />
                        <FormControlLabel value="non-recurring" control={<Radio />} label="non-recurring" />

                    </RadioGroup> */}
                    <div>
                        {/* dialog box */}
                        {/* <Button onClick={handleClickOpen} variant="contained" sx={{backgroundColor:"secondary.main"}}> */}
                        <Box display="flex" gap={2}>
                            <Button
                                onClick={handleClickOpen}
                                size="small"
                                variant="contained"
                                color="secondary"
                                sx={{ marginLeft: '8px' }}
                                disabled={scheduleLiveDIsable}
                            >
                                SCHEDULE LIVE
                            </Button>
                            <UploadExcelDialog
                                setReload={setReload}
                                reload={reload}
                            />
                        </Box>
                        <Typography
                            variant="caption"
                            sx={{ ml: '5px', fontSize:"10px" }}
                            // style={{ color: 'red' }}
                        >
                            *Please fill all the fields. Otherwise, the
                            class will not be scheduled.
                        </Typography>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                SCHEDULE
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    YOUR CLASS HAS BEEN SCHEDULE
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </Grid>
            <Grid
                item
                p={2}
                md={4}
                lg={3.1}
                sm={12}
                height="72vh"
                overflow="auto"
            >
                {data
                    ?.map((item) => (
                        <Stack
                            boxShadow={14}
                            marginBottom={5}
                            spacing={2}
                            width="100%"
                            p={4}
                            key={item.id}
                            borderRadius="8px"
                        >
                            <Typography variant="h4">{item.title}</Typography>
                            <Typography variant="body2">
                                {item.course}
                            </Typography>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                <Typography variant="subtitle2">
                                    date:{moment(item.setDate).format('YYYY-MM-DD')}
                                </Typography>
                                <Typography variant="subtitle2">
                                    time:{moment(item.setDate).format('h:mm a')}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                gap={3}
                            >
                                <Button
                                    onClick={() => {
                                        handleLive(item._id);
                                    }}
                                    href={item.url}
                                    target="_blank"
                                    boxShadow={8}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ padding: '6px 24px !important' }}
                                >
                                    start
                                </Button>
                                <Button
                                    boxShadow={8}
                                    width="30%"
                                    align="center"
                                    height="30px"
                                    variant="contained"
                                    onClick={handleClickOpenDelete}
                                    color="secondary"
                                >
                                    <DeleteIcon />
                                </Button>
                                <Dialog
                                    open={openDelete}
                                    onClose={handleCloseDelete}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to delete this
                                            scheduled class ?
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button
                                            onClick={handleCloseDelete}
                                            autoFocus
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deleteclass(item._id);
                                            }}
                                            autoFocus
                                            variant="contained"
                                            color="error"
                                            size="small"
                                        >
                                            Delete
                                            <DeleteIcon />
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Stack>
                            <Stack direction="row" justifyContent="center">
                                <Button
                                    onClick={() => handleClick(item.url)}
                                    width="10%"
                                    variant="text"
                                    color="secondary"
                                    startIcon={<ContentCopyIcon />}
                                >
                                    Copy Rangemeet URL
                                </Button>
                            </Stack>

                            <Box sx={{ minWidth: 120 }}>
                                {/* <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        calendar sync
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="calendar sync"
                                        defaultValue="calendar sync"
                                    >
                                        <MenuItem value={10}>
                                            <Button
                                                href={google(item)}
                                                target="_blank"
                                            >
                                                google sync
                                            </Button>
                                        </MenuItem>
                                        <MenuItem value={20}>
                                            <Button
                                                href={outlook(item)}
                                                target="_blank"
                                            >
                                                outlook sync
                                            </Button>
                                        </MenuItem>
                                        <MenuItem value={30}>
                                            <Button
                                                href={yahoo(item)}
                                                target="_blank"
                                            >
                                                yahoo sync
                                            </Button>
                                        </MenuItem>
                                    </Select>
                                </FormControl> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        calendar sync
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="calendar sync"
                                        defaultValue={10} // Set the default value to one of the available values
                                    >
                                        {/* <MenuItem
                                            value={5}
                                            // onClick={() =>
                                            //     window.open(
                                            //         google(item),
                                            //         '_blank'
                                            //     )
                                            // }
                                        >
                                           <Typography sx={{color:theme.palette.text.disabled}}>Select a Calender</Typography>
                                        </MenuItem> */}
                                        <MenuItem
                                            value={10}
                                            onClick={() =>
                                                window.open(
                                                    google(item),
                                                    '_blank'
                                                )
                                            }
                                        >
                                            Google Sync
                                        </MenuItem>
                                        <MenuItem
                                            value={20}
                                            onClick={() =>
                                                window.open(
                                                    outlook(item),
                                                    '_blank'
                                                )
                                            }
                                        >
                                            Outlook Sync
                                        </MenuItem>
                                        <MenuItem
                                            value={30}
                                            onClick={() =>
                                                window.open(
                                                    yahoo(item),
                                                    '_blank'
                                                )
                                            }
                                        >
                                            Yahoo Sync
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>
                    ))
                    .reverse()}
            </Grid>
            <ToastContainer />
        </Grid>
    );
};

export default ScheduleLiveClasses;
