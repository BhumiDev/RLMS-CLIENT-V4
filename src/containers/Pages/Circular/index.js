import { useLocation } from 'react-router-dom';
import { circularBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { Box, Card, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { format } from 'timeago.js';
import Apiconfig from '../../../config/ApiConfig';

export const Circular = () => {
    const location = useLocation();

    const data = location?.state?.data;

    console.log('data', `${Apiconfig.url}${data.doc}`);

    return (
        <>
            <Box px={12} mt={2} sx={{ minHeight: '79.1vh' }}>
                <Box mb={5}>
                    <BreadCrumb breadItems={circularBreadcrumb} />
                </Box>

                <Box>
                    <Card sx={{ p: 2 }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Typography>Title : {data?.agenda}</Typography>
                            <Typography>{format(data?.createdAt)}</Typography>
                        </Box>
                        <Typography>{parse(`${data?.description}`)}</Typography>
                        <Typography display="flex" justifyContent="flex-end">
                            <a
                                target="_blank"
                                href={`${Apiconfig.url}${data.doc}`}
                            >
                                Download Document
                            </a>
                        </Typography>
                    </Card>
                </Box>
            </Box>
        </>
    );
};
