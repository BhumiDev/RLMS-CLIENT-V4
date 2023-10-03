import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DateRangeIcon from '@mui/icons-material/DateRange';

const courseDetails = [
    {
        number: '12',
        courseStatus: 'course Completed',
        component: (
            <EmojiEventsIcon fontSize="large" sx={{ color: 'primary.light' }} />
        )
    },
    {
        number: '48',
        courseStatus: 'Courses in progress',
        component: (
            <AutoGraphIcon fontSize="large" sx={{ color: 'primary.light' }} />
        )
    },
    {
        number: '202',
        courseStatus: 'Assignment score',
        component: (
            <DateRangeIcon fontSize="large" sx={{ color: 'primary.light' }} />
        )
    }
];

export default courseDetails;
