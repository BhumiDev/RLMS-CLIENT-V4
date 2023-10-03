import { Box, Container, Button, Typography } from '@mui/material';
import React from 'react';
import './certificate.css';
import { useLocation } from 'react-router-dom';
import Pdf from 'react-to-pdf';
import { useReactToPrint } from 'react-to-print';
import DownloadIcon from '@mui/icons-material/Download';
import certificateBackground from '../../../../../assets/images/coding.jpg';

const ref = React.createRef();

// const certificateBackground =
//     'https://images.unsplash.com/photo-1682790651510-1e06b631f567?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=412&q=80';
const rangestorm =
    'https://dl.dropboxusercontent.com/s/yxdl23unu9lzldx/rangestorm.png?dl=0';
const bhumiLogo =
    'https://dl.dropboxusercontent.com/s/5zyszcl219v6w2y/Bhumiitech_Logo.svg?dl=0';

const email = 'mzuhaib@bhumiitech.com';
const name = 'Mohd Zuhaib';
const courseName = 'Cyber Security';
const certificateId = '567899';
const achievementDate = '21/12/22';
const percentage = '3';
const pageStyle = '@page {size: 900px 78.9vh; margin: 0; }';

const Variant3 = () => {
    const { state } = useLocation();
    console.log('STATAE OF LOCATION', state);
    const { name, email, courseName, passingPercentage } = state;

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: `${courseName.toUpperCase()} CERTIFICATE`
    });

    return (
        <Box
            display="flex"
            py={2}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
            sx={{ color: '#a7d1ff' }}
        >
            <Box
                ref={ref}
                p={12}
                py={5}
                display="flex"
                justifyContent="center"
                alignItems="center"
                // width="900px"
                sx={{
                    backgroundImage: `url(${certificateBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <style>{pageStyle}</style>
                <Box width="700px" backgroundColor="#52618e57" py={3} px={2}>
                    {/* --------Certificate header------- */}
                    <Box
                        className="certificate-header"
                        display="flex"
                        justifyContent="space-between"
                        p={1}
                    >
                        <Box
                            component="img"
                            src={rangestorm}
                            width="220px"
                            height="36px"
                        />
                        <Box component="img" src={bhumiLogo} width="150px" />
                    </Box>

                    {/* ----------Certificate Body-------- */}
                    <Box textAlign="center">
                        <Typography
                            variant="h4"
                            className="merriweather-3"
                            sx={{ fontSize: 16 }}
                        >
                            Online Certification Training
                        </Typography>
                        <Typography
                            variant="h4"
                            className="caveat achievement"
                            sx={{ fontSize: 61 }}
                        >
                            Certificate of Achievement
                        </Typography>
                        <Typography variant="h6" className="certify">
                            This is to certify that
                        </Typography>
                        <Typography variant="h6" id="name3">
                            {name.toUpperCase()}
                        </Typography>
                        <Typography variant="h6" className="certify email">
                            Email: {email}
                        </Typography>
                        <Typography variant="h6" className="certify">
                            Successfully completed and received a passing grade
                            in
                        </Typography>
                        <Typography variant="h6" className="course-name">
                            {courseName.toUpperCase()}
                        </Typography>
                        <Typography variant="h6" className="certificate-id">
                            Certificate ID {certificateId}
                        </Typography>
                        <Typography
                            variant="body1"
                            className="achievement-date"
                        >
                            Date Of Achievement {achievementDate}
                        </Typography>
                        <Typography variant="h6" className="pass-percentage">
                            Passing Percentage {passingPercentage}%
                        </Typography>
                    </Box>
                    <Container maxWidth="md">
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mt={5}
                        >
                            <Box textAlign="center">
                                <Box
                                    height="5px"
                                    width
                                    sx={{ borderBottom: '1px solid #000000' }}
                                    mb={1}
                                />
                                <Typography
                                    variant="body1"
                                    className="signature-body"
                                >
                                    Head of Administration
                                </Typography>
                            </Box>
                            <Box>
                                <Box
                                    height="5px"
                                    width
                                    sx={{ borderBottom: '1px solid #000000' }}
                                    mb={1}
                                />
                                <Typography
                                    variant="body1"
                                    className="signature-body"
                                >
                                    Location Administration
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" mr={2}>
                <Button
                    sx={{ backgroundColor: 'secondary.main' }}
                    variant="contained"
                    onClick={handlePrint}
                    endIcon={<DownloadIcon />}
                    size="small"
                >
                    Download
                </Button>
                {/* <Pdf targetRef={ref} filename={`${courseName}-certificate.pdf`}>
                    {({ toPdf }) => (
                        <Button variant="contained" onClick={toPdf}>
                            Download
                        </Button>
                    )} */}
                {/* </Pdf> */}
            </Box>
        </Box>
    );
};

export default Variant3;
