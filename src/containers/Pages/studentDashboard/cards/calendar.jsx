// import {
//     MonthlyBody,
//     MonthlyCalendar,
//     MonthlyNav,
//     DefaultMonthlyEventItem,
// } from '@zach.codes/react-calendar';
// import 'react-big-calendar/dist/calendar-tailwind.css';

const date1 = require('date-and-time')
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import Calendar from 'react-calendar';
import InfoIcon from '@mui/icons-material/Info';
import "react-calendar/dist/Calendar.css";
import './calender.css';

const TodaysField = ({ title, value }) => <Grid container sx={{ mt: 1 }}>
    <Grid item md={3}> <Typography variant='body2' fontWeight='bold'>{title} </Typography>
    </Grid>
    <Grid item md={1}> <Typography variant='body2'> :</Typography>
    </Grid>
    <Grid item md={8}>  <Typography variant='body2' ml={2}>{value}</Typography></Grid>
</Grid>
const CustomCalendar = ({ data }) => {
    // let [currentMonth, setCurrentMonth] = useState(
    //     new Date()
    // );
    const [currentEvent, setEvent] = useState();
    // const currentDay = Date.now()
    // const datesToAddContentTo = [currentDay];

    function tileContent({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            return data?.map((individualMeet) => {
                if (date1.isSameDay(new Date(individualMeet.setdate), date)) {
                    return 'highlight';
                    // return <>
                    //     <InfoIcon color='success' onClick={() => setEvent(individualMeet)} sx={{ mt: 0.5, ml: 0.5, width: 16, height: 16 }} />
                    // </>;
                }
            })

        }
    }
    const newDateToPublish = new Date();
    console.log('newDateToPublish', newDateToPublish)
    const [value, setValue] = useState(newDateToPublish);
    function onChange(nextValue) {
        setValue(nextValue);
    }
    // console.log('Current event',currentEvent)

    return (
        <>
            <Calendar
                onChange={onChange}
                onClickDay={() => {
                    setEvent(data)
                }}
                value={value}
                tileClassName={tileContent}
            // tileContent={tileContent}
            />
            {currentEvent?.filter((items) => {
                if (new Date(items.setdate).getDate() == value.getDate()) {
                    return true;
                }
            }).map((item) => {
                return (
                    <Card sx={{ boxShadow: 2, p: 2, my: 2 }}>
                        <TodaysField title='Agenda' value={item?.agenda} />
                        <TodaysField title='Course' value={item?.course} />
                        <TodaysField title='Instructor' value={item?.instructor} />
                        <TodaysField title='Timing' value={`${item?.setdate} ${item?.settime}`} />
                    </Card>
                )
            })}
            {/* {currentEvent  ?
                    <CardContent sx={{ textAlign: 'initial' }}>
                        <TodaysField title='Agenda' value={currentEvent?.agenda} />
                        <TodaysField title='Course' value={currentEvent?.course} />
                        <TodaysField title='Instructor' value={currentEvent?.instructor} />
                        <TodaysField title='Timing' value={`${currentEvent?.setdate} ${currentEvent?.settime}`} />
                        {/* <Typography variant='h4'>Agenda</Typography> */}

            {/* </CardContent> : <Box px={3} py={5}>
                        <Typography variant='body1'>No Events</Typography>
                    </Box>} */}
        </>
    );
};

export default CustomCalendar;