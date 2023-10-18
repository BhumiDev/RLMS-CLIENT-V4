import React from 'react';
import Axios from 'axios';
import Link from '@mui/material/Link';
import { Grid, Box, Typography, Stack, Card } from '@mui/material';
import Calendar from './cards/calendar';
import Left from './left';
import Right from './right';
// import itemData from './Data/LiveCardData';
import BreadCrumb from '../../../common/components/Breadcrumb';
import breadcrumb from './StaticData';
import ApiConfig from '../../../config/ApiConfig';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { io } from 'socket.io-client';
import { useCurrentChatContext } from '../ChatBox/ChatContext';
import { useEffect } from 'react';
import Switch from '@mui/material/Switch';

// export const socket = io('ws://localhost:8900');

const Dashboard = () => {
    const { socket, setSocket } = useCurrentChatContext();

    const [itemData, setData] = React.useState();
    const [currUser, setCurrUser] = useState('');
    const [fake, setFake] = useState(false);
    const [show, setShow] = useState('true');

    const handleChange = () => {
        setShow(!show);
    };

    // console.log("user of dashboard",user);

    let token = localStorage.getItem('token');
    let user = token && jwtDecode(token);
    // console.log("user of dashboard",user);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    useEffect(() => {
        console.log('student dash socket ran');
        if (user) {
            let socket = io('ws://124.123.17.68:8900');
            // let socket = io('ws://localhost:8900');
            console.log(socket);

            setSocket(socket);

            socket.emit('addUser', user?._id, user?.userName);
        }
    }, []);

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
            console.log('response', res);

            setData(res.data.data.reverse());
        } catch (err) {
            console.log(err);
        }
    };

    const studentLiveMeetings = async () => {
        try {
            let token = localStorage.getItem('token');
            const res = await Axios.get(
                `${ApiConfig.liveClass.liveClassesForStudents}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('RESPONSE----', res);
            setData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        // let token = localStorage.getItem('token');
        // let user = token && jwtDecode(token);
        // console.log("user of dashboard",user);

        if (user.role === 'instructor') {
            console.log('in instructor dashboard');
            getLiveData();
        } else if (user.role === 'student') {
            console.log('in student dashboard');

            studentLiveMeetings();
        }
        setFake(!fake);
    }, []);

    return (
        <Box>
            <Grid
                container
                md={12}
                sm={12}
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Grid
                    item
                    mt={2.5}
                    md={9}
                    sm={12}
                    xs={12}
                    px={{ sm: 2, xs: 2 }}
                    height="100%"
                >
                    <Box ml={{ md: 11 }} mr={{ md: 3.5 }}>
                        <Box mb={2.5}>
                            {' '}
                            <BreadCrumb breadItems={breadcrumb} />
                        </Box>
                        {/* md={8.4}
                    sm={12}
                    xs={12}
                    px={{ sm: 2, xs: 2 }}
                    pl={{ md: 8.5 }}
                    mt={5}
                    ml={{ md: 3 }}
                >
                    <Box> */}
                        <Left fake={fake} setFake={setFake} />
                    </Box>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <Card
                        className="box-shadow2"
                        elevation={3}
                        sx={{
                            pt: 2,
                            p: 2,
                            borderRadius: 0,
                            height: '100%',
                            // height: '86.9vh'
                            // height: '100vh'
                            minHeight: 'calc(100vh - 126px)'
                        }}
                    >
                        <Box mb={3}>
                            {/* <Typography>Calender</Typography> */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    mb: 2
                                }}
                            >
                                <Typography>Show Calender</Typography>
                                <Switch
                                    {...label}
                                    onClick={handleChange}
                                    color="secondary"
                                />
                                {/* <Typography>Hide</Typography> */}
                            </Box>
                            {show ? ' ' : <Calendar data={itemData} />}
                        </Box>

                        <Stack
                            direction="row"
                            // spacing={8}
                            sx={{ mb: 3 }}
                            justifyContent="space-between"
                        >
                            <Typography
                                variant="body1"
                                fontWeight={1000}
                                // letter-spacing="0.5px"
                                // mt="5px"
                            >
                                Upcoming Live Sessions
                            </Typography>
                        </Stack>

                        {itemData?.map((item) => (
                            <Box
                                key={item.id}
                                width={{
                                    xl: '80%',
                                    lg: '80%',
                                    md: '100%',
                                    xs: '100%',
                                    sm: '100%'
                                }}
                            >
                                {/* <Box key={item.id} style={{ marginRight: '43px' }}> */}
                                {console.log('item', item)}
                                <Right item={item} />
                            </Box>
                        ))}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Dashboard;
