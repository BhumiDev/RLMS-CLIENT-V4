import { Box, Typography } from "@mui/material"
import './viewModule.css';
import { getVideoQuizScore, submitLectureReaction } from "../../../API/Lesson";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Emoji from 'react-emojis';

export const Reactions = ({ lectureId, setFeedback, totalMarks }) => {

    const [marks, setMarks] = useState(0);

    console.log("totalMarks", totalMarks)


    const getVideoAssessmentScore = async () => {
        const res = await getVideoQuizScore(lectureId && lectureId);
        console.log("res of video quiz score", res);
        setMarks(res && res?.marks * 10);
    }

    console.log("marks", marks);

    useEffect(() => {
        if (totalMarks > 0) {
            getVideoAssessmentScore();
        }
    }, [lectureId, totalMarks])

    const postReaction = async (reaction) => {
        const res = await submitLectureReaction(lectureId, reaction);
        console.log("res of submit reaction", res);
        toast.success(res.data.message);
        setFeedback(false);
    }

    return (
        <>
            {totalMarks > 0 &&
                <Typography variant="body1" mb={5}>
                    Score: {marks}/{totalMarks}
                </Typography>
            }
            <Typography variant="subtitle1" mb={4}>
                How was your experience?
            </Typography>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: { md: 3, sm: 1, xs: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer' }}
                    onClick={() => postReaction("angry")}>
                    <Emoji emoji="angry-face" size="40" />
                    <Typography>Angry</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer' }}
                    onClick={() => postReaction("sad")}>
                    <Emoji emoji="crying-face" size="40" />
                    <Typography>Sad</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer' }}
                    onClick={() => postReaction("neutral")}>
                    <Emoji emoji="expressionless-face" size="40" />
                    <Typography>Neutral</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer' }}
                    onClick={() => postReaction("happy")}>
                    <Emoji emoji="grinning-face-with-big-eyes" size="40" />
                    <Typography>Happy</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer' }}
                    onClick={() => postReaction("excited")}>
                    <Emoji emoji="smiling-face-with-heart-eyes" size="40" />
                    <Typography>Excited</Typography>
                </Box>
            </Box>
        </>
    )
}