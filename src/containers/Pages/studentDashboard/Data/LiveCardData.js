import TimerIcon from '@mui/icons-material/Timer';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import EventIcon from '@mui/icons-material/Event';
import CircleIcon from '@mui/icons-material/Circle';

const itemData = [
    {
        id: 2,
        title: 'Docker for the Absolute Beginner - Hands On - DevOps',
        topic: 'IT & Software',
        numberOfStudent: '2000',
        instructorName: 'sanjeev chef',
        date: '16 sept',
        time: '16:00',
        componentWatch: <WatchLaterIcon />,
        componentCalendar: <EventIcon />,
        studentStatus: 'enrolled'
    },
    {
        id: 3,
        title: 'Docker for the Absolute Beginner - Hands On - DevOps',
        topic: 'IT & Software',
        numberOfStudent: '2000',
        instructorName: 'raghav juyal',
        date: '18 sept',
        time: '16:40',
        componentWatch: <WatchLaterIcon />,
        componentCalendar: <EventIcon />,
        studentStatus: 'enrolled'
    }
];

export default itemData;
