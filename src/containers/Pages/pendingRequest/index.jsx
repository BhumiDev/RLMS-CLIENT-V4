import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { PinDropSharp } from '@mui/icons-material';
import { findAllRequestOfInstructor, acceptRequest, declineRequest } from '../../../API/Request';
import Avatar from '../../../assets/avatar.svg';
import EnrollStudentWithExcel from './enrollStudentWithExcel';








const PendingRequest = ({ fun, fake }) => {

    const [open, setOpen] = React.useState(false);
    const [pending, setPending] = React.useState([]);
    const [Data, UseData] = useState()
    const [disabled, setDisabled] = useState(false);
    const [reload,setReload] = useState(true)


    const handleClose = async () => {
        setDisabled(true);
        console.log("DAta on handle close", Data._id);
        await acceptRequest(Data._id);
        console.log("toast", toast.success)
        toast.success("request Accepted!");
        fun(!fake);
        setDisabled(false);
        setOpen(false);
    };
    const handleDeclineRequest = async () => {
        console.log("DAta on decline req", Data._id);
        setDisabled(true);
        await declineRequest(Data._id);
        toast.success("request declined successfully")

        fun(!fake);
        setDisabled(false);
        setOpen(false);


    }

    const handleDialog = (obj) => {
        console.log("obj of dialog", obj);
        setOpen(true);
        UseData(obj);

    }
    const takeInfo = async () => {
        const respo = await findAllRequestOfInstructor();
        console.log("respo", respo);
        //  setPending(respo.request);
        setPending(respo);

    }
    React.useEffect(() => {
        takeInfo();

    }, [fake]);

    return (
        // <Box sx={{ boxShadow: 18, borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} sm={12} mb={7} p={1} pt={3} height='100%'>
        <Box sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
            boxShadow={{ md: 8, sm: 0 }}
            sm={12}
            mb={7}
            p={{ md: 3, sm: 1, xs: 1 }}
            pt={{ sm: 0, xs: 0 }}
            minHeight='100%'
        >
            <div>

                <Dialog
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    <DialogTitle id="alert-dialog-title">
                        <Stack direction="row">
                            <img src={Avatar} width='32px' alt='avatar' />
                            <Typography sx={{ ml: 1 }} variant='h4'>
                                {Data?.studentId.name}
                            </Typography>
                        </Stack>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            From {Data?.courseId?.majorCategory} has requested to enroll in course name : <strong>{Data?.courseId.courseName}</strong>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ pb: 2 }}>
                        <Button onClick={handleClose} disabled={disabled} variant='outlined' color='secondary'>
                            Accept Request
                        </Button>
                        <Button onClick={handleDeclineRequest} color='secondary'>Decline </Button>

                    </DialogActions>
                </Dialog>
            </div>
            <EnrollStudentWithExcel/>
            <Stack direction="row" >
                
                <Typography variant="body1">Pending Requests</Typography>
                {pending?.request?.length > 0 && <Button color='secondary' size='small'>Accept all</Button>}

                {/* <Typography variant="button"></Typography> */}
            </Stack>



            {pending?.request?.length > 0 ?

                pending?.request?.map((item) => (

                    <Stack direction="row" alignItems='center' spacing={1} mb={2} mt={1} onClick={() => { handleDialog(item) }}>

                        <><img src={Avatar} width='32px' alt='avatar' />
                            <Typography
                                variant="body1"
                            >{item.studentId.name}</Typography>
                        </>

                    </Stack>
                )) : <Typography variant='body2' sx={{ mt: 1 }}>No Request pending</Typography>
            }
            <ToastContainer />




        </Box>
    )
};

PendingRequest.propTypes = {
    fun: PropTypes.func.isRequired,
    fake: PropTypes.bool.isRequired
};

export default PendingRequest;

