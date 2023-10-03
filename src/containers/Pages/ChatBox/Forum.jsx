import React, { useRef } from "react";
import {
    Box,
    Button,
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Slide,
    InputAdornment,
    Avatar
} from "@mui/material"
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useState } from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { createDiscussion, getCurrentUserDiscussionAnswer, getCurrentUserDiscussions, getDiscussionS, submitDiscussionAnswerReply, submitDiscussionLikes, submitDiscussionReply } from "../../../API/Course";
import { useEffect } from "react";
import { format } from 'timeago.js';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Apiconfig from "../../../config/ApiConfig";
import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded';
import { ForumComponent } from "./ForumHome";
import ReactQuill from "react-quill";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DiscussionForum = () => {

    const [selected, setSelected] = useState('home');
    const [question, setQuestion] = useState("");
    const [open, setOpen] = useState(false);
    const [allDiscussions, setAllDiscussions] = useState([]);
    const [userDiscussions, setUserDiscussions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [fake, setFake] = useState(false);

    useEffect(() => {
        getAllDiscussions();
        getUserDiscussions();
        getUserReplies();
    }, [fake]);


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const postQuestion = async () => {
        const res = await createDiscussion(question);
        setOpen(false);
        setFake(!fake);
    }

    const getAllDiscussions = async () => {
        const res = await getDiscussionS();
        setAllDiscussions(res);
    }

    const getUserDiscussions = async () => {
        const res = await getCurrentUserDiscussions();
        setUserDiscussions(res);
    }

    const getUserReplies = async () => {
        const res = await getCurrentUserDiscussionAnswer();
        setUserAnswers(res);
    }

    return (
        <>
            <Dialog open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>Start New Topic</DialogTitle>
                <DialogContent>
                    <ReactQuill
                        placeholder="Write Description..."
                        theme="snow"
                        name="question"
                        value={question}
                        onChange={setQuestion}
                    />
                </DialogContent>
                <DialogActions sx={{ mb: 1, mr: 1.5 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={postQuestion}
                    >
                        submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                <Button variant="contained" size="small" color="secondary" startIcon={<AddOutlinedIcon />} onClick={handleOpen}>
                    Start new topic
                </Button>
            </Box>
            <Grid container mt={3} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <Grid item md={2.5} sm={12} xs={12} display='flex' flexDirection='column' gap={2}>
                    <Grid item sx={{
                        boxShadow: 2,
                        py: 2,
                        borderRadius: 1,
                        cursor: 'pointer',
                        borderLeft: selected === "home" && '11px solid',
                        borderLeftColor: 'primary.light',
                        backgroundColor: selected === "home" && 'secondary.light'
                    }}
                        onClick={() => setSelected("home")}
                    >
                        <Typography sx={{
                            pl: 3,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            fontWeight: 600,
                            fontSize: '15px !important'
                        }}>
                            <OtherHousesOutlinedIcon sx={{ fontSize: '16px', color: 'text.primary' }} /> HOME
                        </Typography>
                    </Grid>

                    <Grid item sx={{
                        boxShadow: 2,
                        py: 2,
                        borderRadius: 1,
                        cursor: 'pointer',
                        borderLeft: selected === "topics" && '11px solid',
                        borderLeftColor: 'primary.light',
                        backgroundColor: selected === "topics" && 'secondary.light'
                    }}
                        onClick={() => setSelected("topics")}
                    >
                        <Typography sx={{
                            pl: 3,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            fontWeight: 600,
                            fontSize: '15px !important'
                        }}>
                            <HelpOutlineOutlinedIcon sx={{ fontSize: '16px', color: 'text.primary' }} /> MY TOPICS
                        </Typography>
                    </Grid>

                    <Grid item sx={{
                        boxShadow: 2,
                        py: 2,
                        borderRadius: 1,
                        cursor: 'pointer',
                        borderLeft: selected === "answers" && '11px solid',
                        borderLeftColor: 'primary.light',
                        backgroundColor: selected === "answers" && 'secondary.light'
                    }}
                        onClick={() => setSelected("answers")}
                    >
                        <Typography sx={{
                            pl: 3,
                            display: 'flex',
                            gap: 1, 
                            alignItems: 'center',
                            fontWeight: 600,
                            fontSize: '15px !important'
                        }}>
                            <ForumOutlinedIcon sx={{ fontSize: '16px', color: 'text.primary' }} /> MY ANSWERS
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item
                    md={8}
                    sm={12}
                    xs={12}
                    mr={{ md: 3, sm: 0, xs: 0 }}
                    ml={{ md: 6, sm: 0, xs: 0 }}
                    mt={{ md: 0, sm: 3, xs: 3 }}
                >

                    <ForumComponent
                        data={
                            selected === 'home' ?
                                allDiscussions : selected === 'topics' ?
                                    userDiscussions : userAnswers
                        }
                        fake={fake} setFake={setFake}
                    />

                </Grid>

                {/* <Grid item md={2.5} sm={12} xs={12} boxShadow={2} borderRadius={1}>

                </Grid> */}
            </Grid >

        </>
    )
}