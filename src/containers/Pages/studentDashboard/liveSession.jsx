import { Stack, Box, Typography } from '@mui/material';
import BreadCrumb from '../../../common/components/Breadcrumb';

import itemData from './Data/LiveCardData';
import LiveSessionCard from './LiveSessionCard';

const breadcrumb = [
    {
        id: '01',
        breadItem: 'dashboard'
    },
    {
        id: '02',
        breadItem: 'Scheduled live sessions'
    }
];

const LiveSession = () => (
    <Stack>
        <Box mb={1} mx={{ xs: 4, md: 9 }} color="primary.light" ml={6}>
            {' '}
            <BreadCrumb breadItems={breadcrumb} />
        </Box>

        <Typography ml={12}>Scheduled Live Sessions</Typography>
        {itemData.map((item) => (
            <Box key={item.id} px={2}>
                <LiveSessionCard item={item} />
            </Box>
        ))}
    </Stack>
);

export default LiveSession;
