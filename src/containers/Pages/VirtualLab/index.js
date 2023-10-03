import { Container, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { deleteMachine } from '../../../API/OpenStack';
import SecondaryHeader from '../../../common/components/SecondaryHeader';

const VirtualLab = () => {
    const location = useLocation();
    const [seconds, setSeconds] = useState(600);
    const { url, id } = location?.state;
    console.log('state in link', location.state);
    let minutes = parseInt(seconds / 60);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });
    seconds === 0 && deleteMachine(id);

    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Box textAlign="end" my={2}>
                <Typography variant="h5">
                    {minutes > 0 ? (
                        <>
                            <span style={{ fontWeight: 'bold' }}>
                                {minutes}
                            </span>
                            'Minutes'
                        </>
                    ) : (
                        `${seconds} seconds`
                    )}{' '}
                    left
                </Typography>
            </Box>

            <SecondaryHeader title="Virtual Lab" />

            {/* {seconds === 0 && <Typography variant='body1'>DOne</Typography>}
             */}
            <iframe
                src={url}
                title="Lab"
                width="100%"
                height="100%"
                style={{ minHeight: '600px' }}
            ></iframe>
        </Container>
    );
};

export default VirtualLab;
