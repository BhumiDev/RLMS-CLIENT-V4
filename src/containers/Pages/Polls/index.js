import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, RadioGroup, TextField, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './index.css';
import { getPoll, getVotes, submitPolls } from '../../../API/Course';
import jwtDecode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Polls = ({ setShowSurvey }) => {
    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);

    const [open, setOpen] = useState(false);
    const [polls, setPolls] = useState([]);
    const [value, setValue] = useState('');
    const [votes, setVotes] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showClose, setShowClose] = useState(false);

    const handleChange = async (event, id) => {
        setValue(event.target.value);

        const res = await submitPolls(
            event.target.value?.substring(6),
            user?._id,
            id
        );
        console.log('res of submit poll', res);

        const resp = await getVotes(id);
        console.log('res of getVotes', resp);
        setVotes(resp);
        setShowResult(true);
        setShowClose(true);
    };

    console.log('val', value);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setShowSurvey(true);
    };

    useEffect(() => {
        getPolls();
    }, []);

    const getPolls = async () => {
        const res = await getPoll();
        setPolls(res);
        if (res.length > 0) {
            handleOpen();
        } else {
            setShowSurvey(true);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                // maxWidth="xs"
                fullWidth
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Poll</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <Box mb={2}>
                            <Typography sx={{ fontWeight: 'bold !important' }}>
                                {polls && polls[0]?.question}
                            </Typography>
                        </Box>
                        {!showResult ? (
                            <>
                                {Object.entries(
                                    (polls && polls[0]?.options[0]) || {}
                                ).map(([key, val, index]) => (
                                    <Box
                                        key={key}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group"
                                                value={value}
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        polls[0]._id
                                                    )
                                                }
                                            >
                                                <FormControlLabel
                                                    value={key}
                                                    control={
                                                        <Radio
                                                        // checked={checked}
                                                        // onClick={() => handleChecked(key, polls[0]?._id)}
                                                        />
                                                    }
                                                    label={val}
                                                />
                                            </RadioGroup>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'flex-start',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: 2
                                                }}
                                            >
                                                <Typography>0 %</Typography>
                                                <MoreHorizIcon />
                                            </Box>
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={0}
                                                sx={{
                                                    '& .MuiLinearProgress-bar':
                                                        {
                                                            borderRadius: 2
                                                        }
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </>
                        ) : (
                            <>
                                {votes.map((vote, i) => {
                                    return (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                width: '100%',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                    value={value}
                                                >
                                                    <FormControlLabel
                                                        value={value}
                                                        control={
                                                            <Radio
                                                                checked={
                                                                    value ===
                                                                    `option${
                                                                        i + 1
                                                                    }`
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            vote[
                                                                `option${i + 1}`
                                                            ]
                                                        }
                                                    />
                                                </RadioGroup>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'flex-start',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        gap: 2
                                                    }}
                                                >
                                                    <Typography>
                                                        {vote?.percentage} %
                                                    </Typography>
                                                    <MoreHorizIcon />
                                                </Box>
                                            </Box>
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={vote?.percentage}
                                                    sx={{
                                                        '& .MuiLinearProgress-bar':
                                                            {
                                                                borderRadius: 2
                                                            }
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                {showClose && (
                    <DialogActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            paddingBottom: 3
                        }}
                    >
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
            <ToastContainer />
        </>
    );
};
