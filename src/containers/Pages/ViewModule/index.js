import React, { useEffect, useCallback, useState } from 'react';
import {
    Box,
    Card,
    Checkbox,
    CircularProgress,
    Grid,
    InputLabel,
    Stack,
    TextField,
    Typography,
    useTheme,
    Avatar,
    Tabs,
    Tab,
    DialogTitle,
    Divider
} from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import { ReactVideo } from "reactjs-media";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
// import { Typography } from '@mui/material';

import Select from '@mui/material/Select';
import Apiconfig from '../../../config/ApiConfig';
import SecondaryHeader from '../../../common/components/SecondaryHeader';
import LessonName from './LessonName';
import '../../../index.css';
import {
    createNotes,
    editNotes,
    getAnswer,
    getNotes,
    getSimilarCoursesWhileWatching,
    updateCourseProgress,
    updateScreenTime
} from '../../../API/Course';
import { ToastContainer, toast } from 'react-toastify';
import congo from '../../../assets/images/cg.gif';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import jwtDecode from 'jwt-decode';
import Slide from '@mui/material/Slide';
import './viewModule.css';
import parse from 'html-react-parser';
import {
    createComment,
    createReply,
    editComment,
    editReply,
    getAllComments,
    getIndividualLectureCompletionStatus,
    getLikes,
    getReactionCount,
    likeLecture
} from '../../../API/Lesson';
// import LessonName from '../../../assets/Videos/';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import EdiText from 'react-editext';
import CommentIcon from '@mui/icons-material/Comment';
import ClearIcon from '@mui/icons-material/Clear';
import EmojiPicker from 'emoji-picker-react';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { CommentsDisabledOutlined } from '@mui/icons-material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useDispatch, useSelector } from 'react-redux';
import { createMachine } from '../../../API/OpenStack';
import { setCurrentScreenLoading } from '../CreateCourse/Slices/currentScreen';
import { deleteMachine } from '../../../API/Machine';
import { deleteMachine as deleteActiveMachine } from '../../../API/OpenStack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { difference } from 'lodash';
import { useTimer } from 'use-timer';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import GridView from '../../../common/components/GridView';
import Backdrop from '@mui/material/Backdrop';
import { Reactions } from './Reaction';
import { VideoAssessment } from './VideoAssessment';
import Emoji from 'react-emojis';

var _ = require('lodash');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ViewModule = () => {
    const token = localStorage.getItem('token');
    let user = token && jwtDecode(token);
    const location = useLocation();
    console.log('location', location);
    const id = location?.state?.id;
    const category = location?.state?.courseCategory;
    const access = location?.state?.noAccess;
    const courseId = location?.state?.courseId;
    const authorId = location?.state?.authorId;
    const navigate = useNavigate();
    const theme = useTheme();
    const [sections, setSections] = useState(['']);
    const [questions, setQuestions] = useState();
    const [isLoading, setLoading] = useState();
    const [activeLesson, setActive] = useState(sections[0]);
    const [lectureNumber, setLectureNumber] = useState(0);
    const [highlight, setHighlight] = useState(0);
    const [count, setCount] = useState(0);
    const [completedLectures, setCompletedLectures] = useState([]);
    const [resources, setResources] = useState('');
    const [fake, setFake] = useState(false);
    const [isFake, setIsFake] = useState(false);
    const [shouldDisplay, setShouldDisplay] = useState();
    const [showMcq, setShowMcq] = useState('False');
    const [studentsEnrolledInThisCourse, setStudentsEnrolledInThisCourse] =
        useState(0);

    const [checked, setChecked] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    });

    const [radio, setRadio] = useState({
        r1: false,
        r2: false
    });
    const [answer, setAnswer] = useState('');
    const [trueFalse, setTrueFalse] = useState('');

    const [open, setOpen] = React.useState(false);
    const [read, setRead] = useState(false);
    const [check, setCheck] = useState(false);

    const [likes, setLikes] = useState();
    const [isUser, setIsUser] = useState(false);

    const [comments, setComment] = useState('');
    const [allComments, setAllComments] = useState();
    const [fakeComment, setFakeComment] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [showInput, setShowInput] = useState();
    const [reply, setReply] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [showReplyEmoji, setShowReplyEmoji] = useState(false);
    const [commentEditEmoji, setCommentEditEmoji] = useState(false);
    const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false);
    const [machines, setMachines] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const [similarCourses, setSimilarCourses] = useState([]);
    const [showNotesInput, setShowNotesInput] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const [totalScores, setTotalScore] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [testResult, setTestResult] = useState(0);

    const [reactionCount, setReactionCount] = useState([]);

    const [showFeedback, setShowFeedback] = useState(false);

    const [played, setPlayed] = useState(0);

    const dispatch = useDispatch();

    const handlePlayedVideo = () => {
        // console.log('played', played);
    };

    console.log('played', played);

    const handleClose = () => {
        setOpen(false);
    };

    // setInterval(() => {

    // }, 60000);
    // const [intervalId, setIntervalId] = useState(0);
    // const QuizTimer = setInterval(() => {
    //         const temp = [...time];

    //         time.map((item, index) => {
    //             if (temp[index].time > 0) {
    //                 temp[index].time -= 1;
    //             }
    //         });
    //         console.log('quiz time', temp);
    //         setTime(temp);
    //     }, 60000);

    // return () => {
    //     clearInterval(timer);
    // };

    // const [counter, setCounter] = useState(10);
    // const StartQuizHandler = () => {
    //     setShowMcq(!showMcq);
    //     // {running ? pause : start }
    //     if (counter === 0) {
    //         // Navigate to dashboard here
    //         console.log("navigated");
    //         handleSubmit(  questions[count]._id )
    //         setCounter(counter);
    //         navigate("/dashboard");
    //         return;
    //       }

    //     const timer =  () => { counter === 0 ? navigate('/dashboard') :
    //             setinterval( counter > 0 && setCounter(counter => ( counter - 1)), 1000) }
    //             return () => clearInterval(timer);
    //         };
    //         useEffect(() => {
    //             console.log('counter', counter);
    //         }, [counter]);

    //////////////////////////////////////////get totalt marks///////////////////

    const scoreOfStudent = async () => {
        const response = await getScoreOfCourseofParticularStudent(
            courseId,
            user._id
        );
        getTotalMarks(response);

        const testPercent = (totalScores / totalMarks) * 100;
        setTestResult(parseInt(testPercent) || 0);
    };

    const getTotalMarks = (value) => {
        let sum = 0;

        for (let total of value) {
            if (total.studentId === user._id) {
                console.log('test', total);
                for (let marks of total.totalScore) {
                    sum += marks.givenMarks;
                }
            }
        }

        setTotalScore(sum);
    };

    console.log('studentsEnrolled', studentsEnrolledInThisCourse);

    /////////////////////////////////////////////////////////////////////////////////

    const [counter, setCounter] = useState(5);
    const [counterActive, setCounterActive] = useState(false);
    const StartQuizHandler = () => {
        setShowMcq(!showMcq);
        setCounterActive(!counterActive);
        //    if (counter === 0) {
        //      console.log("navigated");
        //      handleSubmit(questions[count]._id);
        //      navigate("/dashboard");
        //      return;
    };

    ////////////////////////////////////////////////////////////////
    useEffect(() => {
        const timer = setInterval(() => {
            if (counterActive) {
                if (counter > 0) {
                    setCounter(counter - 1);
                } else {
                    questions[count]?.questionType === 'mcq'
                        ? handleSubmit(questions[count]._id)
                        : handleSubmitTrueFalse(questions[count]?._id);
                    navigate('/dashboard');
                    return clearInterval(timer);
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [counter, counterActive]);

    /////////////////////////////////////////////////////////////////////////////

    //    const timer = setInterval(() => {
    //      counter > 0 && setCounter(counter => (counter - 1));
    //    }, 1000);

    //    return () => clearInterval(timer);
    //  };

    //  useEffect(() => {
    //    console.log("counter", counter);
    //  }, [counter]);

    //////////////////////////////////////////////////////////////////////////////

    //         const interval = (delay = 0) => (
    //             callback
    //           ) =>
    //             useEffect(() => {
    //               const id = setInterval(callback, delay);

    //               return () => clearInterval(id);
    //             }, [callback]);

    //             const use1Second = interval(1e3);

    //             const useTimer = ({
    //                 seconds: initialSeconds = 60,
    //                 running: initiallyRunning = false
    //               } = {}) => {
    //                 const [seconds, setSeconds] = useState(initialSeconds);
    //                 const [running, setRunning] = useState(initiallyRunning);
    //                 const tick = useCallback(
    //                   () => (running ? setSeconds((seconds) => seconds - 1) : undefined),
    //                   [running]
    //                 );
    //                 const start = () => setRunning(true);
    //                 const pause = () => setRunning(false);
    //                 const reset = () => setSeconds(60);
    //                 const stop = () => {
    //                   pause();
    //                   reset();
    //                 };

    //                 use1Second(tick);

    //         return { pause, reset, running, seconds, start, stop };
    // };

    // const { pause, reset, running, seconds, start, stop } = useTimer();

    const handleChange = (event) => {
        setResources(event.target.value);
    };

    const getModule = useCallback(async () => {
        try {
            const res = await Axios.get(Apiconfig.course.getCourseModule + id, {
                headers: { authorization: `Bearer ${token}` }
            });

            console.log('res of section', res);
            setSections(res?.data.data);
            setQuestions(res?.data.questions.question);
            setActive(res?.data.data[0]);
            setMachines(res?.data.data[0]?.vm);
        } catch (err) {
            console.log(err);
        }
    }, [token, id]);

    console.log('user', isUser);
    console.log('machines', machines);

    const getLessonStatus = () => {
        getIndividualLectureCompletionStatus(authorId, courseId).then(
            (response) => {
                setLoading(false);
                setCompletedLectures(response);
            }
        );
    };

    const setActiveLesson = (section) => {
        const number = sections.indexOf(section);
        setLectureNumber(number);
        setHighlight(number);
        setActive(section);
        setMachines(section?.vm);
    };

    useEffect(() => {
        getModule();
        getLessonStatus();
    }, [check, getModule]);

    const handleChecked = async (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });

        let check = answer?.includes(e.target.value);
        if (!check) {
            let ans = answer.concat(e.target.value);

            setAnswer(ans);
            return;
        } else {
            let arr = answer.split('');
            let ind = answer.indexOf(e.target.value);

            arr.splice(ind, 1);

            let test = '';
            let final = '';
            for (let i = 0; i < arr.length; i++) {
                final = final + test.concat(arr[i]);
            }
            setAnswer(final);
        }
    };
    const handleSubmit = async (questionId) => {
        let arr = answer.split('');
        arr.sort();
        let test = '';
        let final = '';
        for (let i = 0; i < arr.length; i++) {
            final = final + test.concat(arr[i]);
        }
        setAnswer('');
        setChecked({
            a: false,
            b: false,
            c: false,
            d: false
        });
        // await setAnswer(final);

        let response = await getAnswer(final, questionId, courseId);
        if (response.data.success === true || response.data.success === false) {
            // toast.success('Great! Correct Answer');
            if (count < questions.length) {
                setCount(count + 1);
            } else {
                alert('no more questions');
                return;
            }
        }
        //  else {
        //     toast.error('Wrong Answer');
        // }
        scoreOfStudent();
    };
    const handleCheckTreuFalse = async (e) => {
        if (e.target.id === '1') {
            setRadio({
                r1: true,
                r2: false
            });
        } else if (e.target.id === '2') {
            setRadio({
                r1: false,
                r2: true
            });
        }
        setTrueFalse(e.target.value);
    };

    const handleSubmitTrueFalse = async (questionId) => {
        setTrueFalse('');
        setRadio({
            r1: false,
            r2: false
        });
        let response = await getAnswer(trueFalse, questionId, courseId);
        if (response.data.success === true) {
            toast.success('Great! Correct Answer');
            if (count < questions.length) {
                setCount(count + 1);
            } else {
                alert('no more questions');
            }
        } else {
            toast.error('Incorrect Answer');
        }
    };

    const handleMarked = async () => {
        setLoading(true);
        await updateCourseProgress(courseId, activeLesson._id, authorId);
        setRead(!read);
        setCheck(!check);

        {
            read
                ? toast.success('Marked as Completed!')
                : toast.success('You can restart your course!');
        }
    };

    useEffect(() => {
        console.log('lectureID in useeffect', activeLesson?._id);
        getLikesOfLecture();
        getAllComment();
        getSimilarCourses();
        getAllNotes();
        getLectureReactionCount();
    }, [activeLesson, fake, fakeComment, machines]);

    const handleLikes = async () => {
        const response = await likeLecture(activeLesson?._id);
        console.log('response of likeLecture', response.data);
        setFake(!fake);
    };

    const getLikesOfLecture = async () => {
        // console.log('lectureId in useEffect', activeLesson?._id);
        const response = await getLikes(activeLesson && activeLesson?._id);

        console.log('likes', response.data.data);

        response?.data?.data?.likes?.map((x) => {
            if (x.userId === user?._id) {
                console.log('userid in function', x.user);
                setIsUser(true);
            }
        });
        setLikes(response.data.data.likes.length);
    };

    const getAllComment = async () => {
        console.log('lectureId in getAllComments', activeLesson?._id);
        const response = await getAllComments(
            activeLesson && activeLesson?._id
        );
        console.log('response of getAllcomment', response);
        setAllComments(response.data.allComments);
    };
    const createComments = async () => {
        const response = await createComment(
            comments,
            activeLesson && activeLesson?._id
        );
        setFakeComment(!fakeComment);
        setComment('');
        setShowEmoji(false);
    };

    const editComments = async (commentId, data) => {
        console.log('commentID and value', commentId, data);
        const response = await editComment(commentId, data);
        console.log('response of editComment', response);
    };

    const handleShowInput = (e) => {
        setShowInput(e);
    };

    const handleShowReply = (e) => {
        if (showReply === e) {
            setShowReply(false);
        } else setShowReply(e);
    };

    console.log('showREply', showReply);

    const createReplies = async (commentId) => {
        console.log(reply);
        const response = await createReply(
            commentId,
            activeLesson && activeLesson._id,
            reply
        );
        setFakeComment(!fakeComment);
        setReply('');
    };

    const editReplies = async (replyId, data) => {
        console.log('replyId and value', replyId, data);
        const response = await editReply(replyId, data);
        console.log('response of editComment', response);
    };

    const handleEmojiClick = (obj) => {
        setComment(comments + obj.emoji);
    };

    const handleReplyEmojiClick = (obj) => {
        setReply(reply + obj.emoji);
    };

    const deleteLab = async (machineId) => {
        dispatch(setCurrentScreenLoading(true));
        let machineDetails = await deleteMachine(machineId, navigate, dispatch);
        setFake(!fake);
        handleCloseDelete();
        console.log('Machine-details', machineDetails);
    };

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const [value, setValue] = React.useState('1');

    const handleTabChange = (event, newValue) => {
        console.log('Tab event', event);
        setValue(newValue);
    };

    const [machineDetails, setMachineDetails] = useState([]);

    const [consoleUrl, setConsoleUrl] = useState([]);
    // const [consoleUrl2, setConsoleUrl2] = useState('');
    const [time, setTime] = useState([]);

    const loader = useSelector((state) => state?.currentScreen?.isLoading);
    console.log('loader', loader);

    const createLab = async (data) => {
        setIsRunning(true);

        console.log('setting time in create lab', time, '||', data);
        setTime([
            ...time,
            {
                time: data.time,
                id: data._id,
                name: data.name,
                isLoading: true,
                isDisabled: false
            }
        ]);
        setValue('2');

        let machineDetails = await createMachine(data, dispatch);
        console.log('Machine-details', machineDetails);
        setMachineDetails(machineDetails);

        setConsoleUrl([
            ...consoleUrl,
            {
                name: data.name,
                url: machineDetails?.url
            }
        ]);
        setTime([
            ...time,
            {
                time: data.time,
                id: data._id,
                name: data.name,
                isLoading: false,
                serverId: machineDetails?.server_id,
                isDisabled: false
            }
        ]);
    };

    console.log('isRuning', isRunning);

    useEffect(() => {
        const timer = setInterval(() => {
            const temp = [...time];

            time?.map((item, index) => {
                if (temp[index].time > 0) {
                    temp[index].time -= 1;
                } else {
                    console.log('api del called', item?.serverId);
                    deleteActiveMachine(item?.serverId);
                    temp[index].isDisabled = true;
                }
            });
            console.log('setting time', temp);
            setTime(temp);
        }, 60000);

        return () => {
            clearInterval(timer);
        };
    }, [time]);

    console.log('machine', machines);

    console.log('time', time);
    useEffect(() => {}, [consoleUrl]);

    const renderConditionally = (console1, machine) => (
        <div className="should-render">
            {console1?.name == machine.name && (
                <iframe
                    src={console1?.url}
                    width="100%"
                    height="500px"
                ></iframe>
            )}
        </div>
    );

    console.log('consoleUrl', consoleUrl);

    console.log('machinedetailsjjf', machineDetails);

    console.log('activeLesson', activeLesson);

    const [playbackSessions, setPlaybackSessions] = useState([]);
    const [totalTime, setTotalTime] = useState(0);
    const [totalEndTime, setTotalEndTime] = useState(0);

    console.log('playbacksessions', playbackSessions, totalTime, totalEndTime);

    const screenTimeUpdate = async (duration) => {
        const res = await updateScreenTime(courseId, user?._id, duration);
        console.log('res of screentime', res);
    };

    const getSimilarCourses = async () => {
        const res = await getSimilarCoursesWhileWatching(category);
        console.log('response of simila courses', res);
        setSimilarCourses(res);
    };

    const createNote = async () => {
        const response = await createNotes(
            notes,
            activeLesson && activeLesson?._id,
            courseId,
            user?._id
        );
        console.log('response of notes api', response);
        setFake(!fake);
        setNotes('');
        setShowNotesInput(false);
    };

    const getAllNotes = async () => {
        const response = await getNotes(
            activeLesson && activeLesson?._id,
            courseId,
            user?._id
        );
        console.log('response of getAllnOtes', response);
        setAllNotes(response);
    };

    const editNote = async (id, data) => {
        const response = await editNotes(id, data);
        console.log('response of editntes', response);
    };

    const [feedback, setFeedback] = useState(false);
    const handleFeedbackClose = () => {
        setFeedback(false);
    };
    const handleFeedbackOpen = () => {
        setFeedback(true);
    };

    const getLectureReactionCount = async () => {
        const temp = [0, 0, 0, 0, 0];
        const res = await getReactionCount(activeLesson && activeLesson?._id);
        res?.map((item) => {
            if (item?._id == 'happy') {
                temp.splice(3, 1, item?.count);
            } else if (item?._id == 'angry') {
                temp.splice(0, 1, item?.count);
            } else if (item?._id == 'sad') {
                temp.splice(1, 1, item?.count);
            } else if (item?._id == 'neutral') {
                temp.splice(2, 1, item?.count);
            } else if (item?._id == 'excited') {
                temp.splice(4, 1, item?.count);
            }
        });
        setReactionCount(temp);
    };

    return (
        <>
            <Stack
                sx={{ width: '100%', margin: 'auto', pb: 10 }}
                minHeight="80.8vh"
            >
                <Box
                    sx={{ margin: '15px 30px', marginBottom: '20px' }}
                    pl={{ md: 8 }}
                >
                    <Button
                        disableRipple
                        size="small"
                        startIcon={<KeyboardBackspaceIcon />}
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0px !important',
                            color: 'primary.light',
                            '&:hover': {
                                background: 'none'
                            }
                        }}
                        onClick={() => navigate(-1)}
                    >
                        View Modules
                    </Button>
                </Box>

                {}

                <Grid columnSpacing={5} container sx={{ mt: 1 }} pl={{ md: 8 }}>
                    {access && (
                        <Grid
                            item
                            xs={11}
                            sm={11.5}
                            md={3.5}
                            sx={{ marginBottom: '30px !important' }}
                        >
                            <Box ml={4}>
                                <Card style={{ marginBottom: '30px' }}>
                                    <SecondaryHeader
                                        title="Lessons"
                                        endText={`${lectureNumber + 1}/${
                                            sections?.length
                                        }`}
                                    />
                                    {sections?.map((section, index) => (
                                        <Box
                                            onClick={() => {
                                                setActiveLesson(section);
                                                setFeedback(false);
                                            }}
                                        >
                                            <LessonName
                                                name={section.title}
                                                id={section._id}
                                                lectureNumber={lectureNumber}
                                                index={index}
                                                questions={questions}
                                                completedLectures={
                                                    completedLectures
                                                }
                                                // activeLessonId={activeLesson?._id}
                                            />
                                        </Box>
                                    ))}
                                </Card>
                                {/* <Button
                                    onClick={StartQuizHandler}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ my: 2 }}
                                >
                                    {showMcq ? 'Start Quiz' : 'Stop Quiz'}
                                </Button> */}
                                {/* <Typography>Timer: {counter}</Typography> */}
                                {/* {showMcq ? (
                                    ''
                                ) : ( */}
                                <Box>
                                    {questions && (
                                        <>
                                            <p
                                                style={{
                                                    marginLeft: '10px'
                                                }}
                                            >
                                                {questions[count] && (
                                                    <span
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '1.2rem'
                                                        }}
                                                    >{`${count + 1}. `}</span>
                                                )}

                                                {questions[count]?.question}
                                            </p>
                                        </>
                                    )}
                                    {questions &&
                                    questions[count]?.questionType === 'mcq' ? (
                                        <>
                                            <div
                                                style={{
                                                    display: 'flex'
                                                }}
                                            >
                                                <div>
                                                    <Checkbox
                                                        value="a"
                                                        name="a"
                                                        checked={checked.a}
                                                        onChange={(e) =>
                                                            handleChecked(e)
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        marginTop: '8px'
                                                    }}
                                                >
                                                    <span>
                                                        A)
                                                        {
                                                            questions[count]
                                                                ?.options[0].a
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex'
                                                }}
                                            >
                                                <div>
                                                    <Checkbox
                                                        name="b"
                                                        checked={checked.b}
                                                        value="b"
                                                        onChange={(e) =>
                                                            handleChecked(e)
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        marginTop: '8px'
                                                    }}
                                                >
                                                    <span>
                                                        B)
                                                        {
                                                            questions[count]
                                                                ?.options[1].b
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex'
                                                }}
                                            >
                                                <div>
                                                    <Checkbox
                                                        checked={checked.c}
                                                        name="c"
                                                        value="c"
                                                        onChange={(e) =>
                                                            handleChecked(e)
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        marginTop: '8px'
                                                    }}
                                                >
                                                    <span>
                                                        C)
                                                        {
                                                            questions[count]
                                                                ?.options[2].c
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex'
                                                }}
                                            >
                                                <div>
                                                    <Checkbox
                                                        name="d"
                                                        checked={checked.d}
                                                        value="d"
                                                        onChange={(e) =>
                                                            handleChecked(e)
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        marginTop: '8px'
                                                    }}
                                                >
                                                    <span>
                                                        D)
                                                        {
                                                            questions[count]
                                                                ?.options[3].d
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                sx={{
                                                    mt: 2,
                                                    backgroundColor:
                                                        'secondary.main'
                                                }}
                                                variant="contained"
                                                onClick={() =>
                                                    handleSubmit(
                                                        questions[count]._id
                                                    )
                                                }
                                            >
                                                submit
                                            </Button>

                                            {/* <p>A) {ques.options[0].a}</p>
                                        <p>B) {ques.options[1].b}</p>
                                        <p>C) {ques.options[2].c}</p>
                                        <p>D) {ques.options[3].d}</p> */}

                                            {/* 
                                        <TextField placeholder='write options here'>

                                        </TextField> */}
                                        </>
                                    ) : (
                                        <>
                                            {count < questions?.length && (
                                                <>
                                                    <div>
                                                        <input
                                                            checked={radio.r1}
                                                            type="radio"
                                                            value="true"
                                                            name="radio1"
                                                            id="1"
                                                            onChange={(e) =>
                                                                handleCheckTreuFalse(
                                                                    e
                                                                )
                                                            }
                                                        />{' '}
                                                        True
                                                        <br />
                                                        <input
                                                            checked={radio.r2}
                                                            type="radio"
                                                            value="false"
                                                            name="radio1"
                                                            id="2"
                                                            onChange={(e) =>
                                                                handleCheckTreuFalse(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                        False
                                                    </div>
                                                    <Button
                                                        sx={{
                                                            mt: 2,
                                                            backgroundColor:
                                                                'secondary.main'
                                                        }}
                                                        variant="contained"
                                                        onClick={() =>
                                                            handleSubmitTrueFalse(
                                                                questions[count]
                                                                    ?._id
                                                            )
                                                        }
                                                    >
                                                        submit
                                                    </Button>
                                                </>
                                            )}
                                            {questions?.length > 0 &&
                                                count === questions?.length && (
                                                    <>
                                                        <img
                                                            src={congo}
                                                            style={{
                                                                height: '300px',
                                                                width: '100%'
                                                            }}
                                                        ></img>
                                                        {/* <Box>
                                                            <Typography>
                                                                Total Score:{' '}
                                                                {totalMarks}
                                                            </Typography>
                                                        </Box> */}
                                                    </>
                                                )}
                                        </>
                                    )}
                                </Box>
                                {/* )} */}
                            </Box>
                        </Grid>
                    )}
                    <Grid
                        item
                        md={8}
                        xs={11}
                        sm={11}
                        margin="auto"
                        pr={{ md: 8 }}
                    >
                        <TabContext value={value}>
                            {access && (
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: 'divider'
                                    }}
                                >
                                    <TabList
                                        onChange={handleTabChange}
                                        textColor="primary.light"
                                        TabIndicatorProps={{
                                            sx: {
                                                backgroundColor:
                                                    'secondary.main'
                                            }
                                        }}
                                    >
                                        <Tab label="Lecture" value="1" />
                                        {/* {machines.map((machine, index) => (
                                        <Tab
                                            value={`${index + 2}`}
                                            label={
                                                <>
                                                    {machine?.name}
                                                    <br />
                                                    {console.log('time', time)}
                                                    {time.length !== 0 && (
                                                        <span
                                                            style={{
                                                                color: 'red'
                                                            }}
                                                        >
                                                            {
                                                                time.filter(
                                                                    (timeObj) =>
                                                                        timeObj.name ===
                                                                        machine?.name
                                                                )[0]?.time
                                                            }
                                                            minutes
                                                        </span>
                                                    )}
                                                </>
                                            }
                                        />
                                    ))} */}
                                        {/* {isRunning && <Tab value="2" label="Machine" />} */}
                                        {consoleUrl?.map((machine, index) => (
                                            <Tab
                                                value={`${index + 2}`}
                                                label={
                                                    <>
                                                        {machine?.name}
                                                        <br />
                                                        {console.log(
                                                            'time',
                                                            time
                                                        )}
                                                        {time.length !== 0 && (
                                                            <span
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    time.filter(
                                                                        (
                                                                            timeObj
                                                                        ) =>
                                                                            timeObj?.name ===
                                                                            machine?.name
                                                                    )[0]?.time
                                                                }
                                                                minutes
                                                            </span>
                                                        )}
                                                    </>
                                                }
                                            />
                                        ))}
                                        {/* <Tab
                                        label={
                                            <>
                                                Machine 1<br />
                                                {time.length !== 0 && <span style={{ color: 'red' }}>
                                                    {time[0]} minutes
                                                </span>}
                                            </>
                                        }
                                        value="2"
                                    />
                                    <Tab
                                        label={
                                            <>
                                                Machine 2<br />
                                                {time.length > 1 && <span style={{ color: 'red' }}>
                                                    {time[1]} minutes
                                                </span>}
                                            </>
                                        }
                                        value="3"
                                    /> */}
                                    </TabList>
                                </Box>
                            )}
                            <TabPanel value="1">
                                {access ? (
                                    <>
                                        <Box style={{ position: 'relative' }}>
                                            <ReactPlayer
                                                config={{
                                                    file: {
                                                        attributes: {
                                                            controlsList:
                                                                'nodownload'
                                                        }
                                                    }
                                                }}
                                                className="react-player"
                                                width="100%"
                                                height="100%"
                                                url={
                                                    activeLesson?.video
                                                        ? `${Apiconfig.url}${activeLesson?.video}`
                                                        : activeLesson?.externalLink
                                                        ? activeLesson?.externalLink
                                                        : `${Apiconfig.url}`
                                                }
                                                type="video/mp4"
                                                controls
                                                onClick={handlePlayedVideo()}
                                                onProgress={(progress) =>
                                                    setPlayed(
                                                        Math.floor(
                                                            progress.playedSeconds
                                                        )
                                                    )
                                                }
                                                onPlay={() => {
                                                    // Add new playback session with start time
                                                    const newSession = {
                                                        startTime: Date.now()
                                                    };
                                                    setPlaybackSessions([
                                                        ...playbackSessions,
                                                        newSession
                                                    ]);
                                                }}
                                                onPause={() => {
                                                    // Update current playback session with pause time
                                                    const currentSession =
                                                        playbackSessions[
                                                            playbackSessions.length -
                                                                1
                                                        ];
                                                    currentSession.pauseTime =
                                                        Date.now();

                                                    const totalTime =
                                                        playbackSessions.reduce(
                                                            (
                                                                total,
                                                                session
                                                            ) => {
                                                                if (
                                                                    !session.pauseTime
                                                                ) {
                                                                    session.pauseTime =
                                                                        session.startTime;
                                                                }
                                                                const sessionTime =
                                                                    (session.endTime -
                                                                        session.startTime) /
                                                                        1000 ||
                                                                    0;
                                                                const pauseTime =
                                                                    (session.pauseTime -
                                                                        session.startTime) /
                                                                        1000 ||
                                                                    0;
                                                                console.log(
                                                                    'total',
                                                                    total,
                                                                    sessionTime,
                                                                    pauseTime
                                                                );
                                                                return (
                                                                    total +
                                                                    (pauseTime -
                                                                        sessionTime)
                                                                );
                                                            },
                                                            0
                                                        );

                                                    console.log(
                                                        'totalTime',
                                                        totalTime
                                                    );
                                                    setTotalTime(totalTime);

                                                    screenTimeUpdate(totalTime);
                                                }}
                                                onEnded={() => {
                                                    // Set end time for last playback session
                                                    const lastSessionIndex =
                                                        playbackSessions.length -
                                                        1;
                                                    const lastSession =
                                                        playbackSessions[
                                                            lastSessionIndex
                                                        ];
                                                    lastSession.endTime =
                                                        Date.now();

                                                    // Calculate total time spent watching the video
                                                    const totalTime =
                                                        playbackSessions.reduce(
                                                            (
                                                                total,
                                                                session
                                                            ) => {
                                                                if (
                                                                    !session.pauseTime
                                                                ) {
                                                                    session.pauseTime =
                                                                        session.startTime;
                                                                }
                                                                const sessionTime =
                                                                    (session.endTime -
                                                                        session.startTime) /
                                                                        1000 ||
                                                                    0;
                                                                const pauseTime =
                                                                    (session.pauseTime -
                                                                        session.startTime) /
                                                                        1000 ||
                                                                    0;
                                                                console.log(
                                                                    'total',
                                                                    total,
                                                                    sessionTime,
                                                                    pauseTime
                                                                );
                                                                return (
                                                                    total +
                                                                    (pauseTime -
                                                                        sessionTime)
                                                                );
                                                            },
                                                            0
                                                        );

                                                    console.log(
                                                        'totalTime',
                                                        totalTime
                                                    );
                                                    setTotalEndTime(totalTime);
                                                    setShowFeedback(true);
                                                    handleFeedbackOpen();
                                                }}
                                            />
                                            {setShowFeedback &&
                                                user?.role === 'student' && (
                                                    <Backdrop
                                                        sx={{
                                                            color: '#fff',
                                                            zIndex: (theme) =>
                                                                theme.zIndex
                                                                    .drawer + 2,
                                                            position:
                                                                'absolute',
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column'
                                                        }}
                                                        open={feedback}
                                                        // onClick={
                                                        //     handleFeedbackClose
                                                        // }
                                                    >
                                                        <VideoAssessment
                                                            lectureId={
                                                                activeLesson &&
                                                                activeLesson?._id
                                                            }
                                                            setFeedback={
                                                                setFeedback
                                                            }
                                                        />
                                                        {/* <Box mb={5}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    fontWeight:
                                                                        '500'
                                                                }}
                                                            >
                                                                Do you have some
                                                                feedback?
                                                            </Typography>
                                                        </Box> */}
                                                        {/* <Reactions /> */}
                                                    </Backdrop>
                                                )}
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Typography
                                            component="h3"
                                            fontWeight="bold"
                                            textAlign="center"
                                        >
                                            OOPS! Your are not Subscribed to
                                            View this Course
                                        </Typography>
                                    </>
                                )}
                            </TabPanel>
                            {/* <TabPanel value="2">
                <iframe
                  src="http://124.123.17.10:6080/vnc_auto.html?path=%3Ftoken%3Dee19541b-4923-4857-81c4-33f0ab843814&title=Windows10Pro_Snap(a4431615-6982-40bd-a458-3db745ddfb8b)"
                  width="100%"
                  height="500px"
                ></iframe>
              </TabPanel> */}
                            {machines?.map((machine, index) => {
                                return (
                                    <>
                                        {consoleUrl?.map((console1, index) => (
                                            <>
                                                {console.log(
                                                    'index',
                                                    index + 2,
                                                    value
                                                )}
                                                <TabPanel
                                                    value={`${index + 2}`}
                                                    index={index + 2}
                                                >
                                                    {renderConditionally(
                                                        console1,
                                                        machine,
                                                        index
                                                    )}
                                                </TabPanel>
                                            </>
                                        ))}
                                        {console.log(
                                            'Lodash',
                                            _.partition(consoleUrl, {
                                                name: machine.name
                                            })
                                        )}
                                        {/* {consoleUrl.length === 0 || consoleUrl} */}
                                    </>
                                );
                            })}
                        </TabContext>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            flex-direction={{
                                md: 'row',
                                sm: 'column',
                                xs: 'column'
                            }}
                            width="100%"
                        >
                            <Box>
                                {user?.role === 'instructor' && (
                                    <>
                                        <Grid
                                            item
                                            display="flex"
                                            px={2}
                                            gap={2}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor:
                                                        'primary.borderGrey',
                                                    borderRadius: '20px',
                                                    padding: 1
                                                }}
                                            >
                                                <Emoji
                                                    emoji="angry-face"
                                                    size="20"
                                                />{' '}
                                                {reactionCount[0]}
                                            </Box>
                                            <Box
                                                sx={{
                                                    backgroundColor:
                                                        'primary.borderGrey',
                                                    borderRadius: '20px',
                                                    padding: 1
                                                }}
                                            >
                                                <Emoji
                                                    emoji="crying-face"
                                                    size="20"
                                                />
                                                {reactionCount[1]}
                                            </Box>
                                            <Box
                                                sx={{
                                                    backgroundColor:
                                                        'primary.borderGrey',
                                                    borderRadius: '20px',
                                                    padding: 1
                                                }}
                                            >
                                                <Emoji
                                                    emoji="expressionless-face"
                                                    size="20"
                                                />
                                                {reactionCount[2]}
                                            </Box>
                                            <Box
                                                sx={{
                                                    backgroundColor:
                                                        'primary.borderGrey',
                                                    borderRadius: '20px',
                                                    padding: 1
                                                }}
                                            >
                                                <Emoji
                                                    emoji="grinning-face-with-big-eyes"
                                                    size="20"
                                                />
                                                {reactionCount[3]}
                                            </Box>
                                            <Box
                                                sx={{
                                                    backgroundColor:
                                                        'primary.borderGrey',
                                                    borderRadius: '20px',
                                                    padding: 1
                                                }}
                                            >
                                                <Emoji
                                                    emoji="smiling-face-with-heart-eyes"
                                                    size="20"
                                                />
                                                {reactionCount[4]}
                                            </Box>
                                        </Grid>
                                    </>
                                )}
                            </Box>
                            {access ? (
                                <Card
                                    style={{
                                        marginBottom: '30px',
                                        minWidth: '30%'
                                    }}
                                >
                                    <SecondaryHeader
                                        title="Machines"
                                        endText={machines?.length}
                                        // endText={`${lectureNumber + 1}/${
                                        //     sections?.length
                                        // }`}
                                    />
                                    {machines?.length !== 0 ? (
                                        machines?.map((machine) => {
                                            return (
                                                <>
                                                    <Box
                                                        display="flex"
                                                        pb={1}
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        px={2}
                                                    >
                                                        <Typography>
                                                            {machine?.name}
                                                        </Typography>
                                                        <Box
                                                            display="flex"
                                                            gap={2}
                                                        >
                                                            {isRunning &&
                                                            time?.find(
                                                                (item) =>
                                                                    item?.name ===
                                                                    machine?.name
                                                            ) ? (
                                                                <ClearIcon
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        color: 'error.main'
                                                                    }}
                                                                    onClick={() =>
                                                                        deleteActiveMachine(
                                                                            machine?._id
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <PlayCircleFilledIcon
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        color: 'secondary.main'
                                                                    }}
                                                                    onClick={() =>
                                                                        createLab(
                                                                            machine
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                            <div>
                                                                {user?.role ===
                                                                    'instructor' && (
                                                                    <DeleteIcon
                                                                        sx={{
                                                                            cursor: 'pointer',
                                                                            color: 'error.main'
                                                                        }}
                                                                        onClick={
                                                                            handleClickOpenDelete
                                                                        }
                                                                    />
                                                                )}
                                                                <Dialog
                                                                    open={
                                                                        openDelete
                                                                    }
                                                                    onClose={
                                                                        handleCloseDelete
                                                                    }
                                                                    aria-labelledby="alert-dialog-title"
                                                                    aria-describedby="alert-dialog-description"
                                                                >
                                                                    <DialogTitle id="alert-dialog-slide-title">
                                                                        Are you
                                                                        sure you
                                                                        want to
                                                                        delete
                                                                        this
                                                                        machine?
                                                                    </DialogTitle>
                                                                    <DialogActions>
                                                                        <Button
                                                                            onClick={
                                                                                handleCloseDelete
                                                                            }
                                                                            sx={{
                                                                                color: 'secondary.main'
                                                                            }}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="error"
                                                                            onClick={() =>
                                                                                deleteLab(
                                                                                    machine?._id
                                                                                )
                                                                            }
                                                                        >
                                                                            {isLoading && (
                                                                                <CircularProgress />
                                                                            )}
                                                                            Delete
                                                                        </Button>
                                                                    </DialogActions>
                                                                </Dialog>
                                                            </div>
                                                        </Box>
                                                    </Box>
                                                </>
                                            );
                                        })
                                    ) : (
                                        <Typography pl={2} pb={1}>
                                            No Machine Added
                                        </Typography>
                                    )}
                                </Card>
                            ) : null}
                        </Box>

                        <Box mt={3}>
                            <Grid
                                container
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                gap={1}
                            >
                                {access && (
                                    <>
                                        <Grid
                                            container
                                            display="flex"
                                            flexDirection="column"
                                            gap={1}
                                            width="99.7%"
                                        >
                                            <Grid
                                                item
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Grid item>
                                                    <Button
                                                        onClick={() =>
                                                            handleLikes(
                                                                activeLesson
                                                            )
                                                        }
                                                    >
                                                        {isUser ? (
                                                            <ThumbUpIcon
                                                                sx={{ mr: 1 }}
                                                            />
                                                        ) : (
                                                            <ThumbUpOffAltIcon
                                                                sx={{ mr: 1 }}
                                                            />
                                                        )}
                                                        {likes}
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            setShowComments(
                                                                !showComments
                                                            )
                                                        }
                                                    >
                                                        <CommentIcon
                                                            sx={{ mr: 1 }}
                                                        />{' '}
                                                        {allComments?.length}
                                                    </Button>
                                                </Grid>
                                                {activeLesson?.resource
                                                    ?.length > 0 ? (
                                                    <Box sx={{ width: 160 }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label demo-select-small">
                                                                Resources
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={
                                                                    resources
                                                                }
                                                                label="Resourses"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            >
                                                                {activeLesson?.resource?.map(
                                                                    (
                                                                        resourse
                                                                    ) => (
                                                                        <MenuItem
                                                                            id={
                                                                                resourse._id
                                                                            }
                                                                            value={
                                                                                10
                                                                            }
                                                                        >
                                                                            <a
                                                                                target="_blank"
                                                                                href={`${Apiconfig.url}${resourse.resourseFile}`}
                                                                            >
                                                                                {
                                                                                    resourse.name
                                                                                }
                                                                            </a>
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                ) : (
                                                    <Typography>
                                                        No additional resources
                                                        available
                                                    </Typography>
                                                )}
                                            </Grid>
                                            {user?.role === 'student' && (
                                                <Grid item my={2}>
                                                    <Box
                                                        display="flex"
                                                        justifyContent="flex-end"
                                                        gap={2}
                                                        mb={1}
                                                    >
                                                        <Button
                                                            color="secondary"
                                                            variant="text"
                                                            onClick={() =>
                                                                setShowNotes(
                                                                    !showNotes
                                                                )
                                                            }
                                                        >
                                                            Show notes
                                                        </Button>
                                                        <Button
                                                            color="secondary"
                                                            variant="contained"
                                                            onClick={() =>
                                                                setShowNotesInput(
                                                                    !showNotesInput
                                                                )
                                                            }
                                                        >
                                                            Take notes
                                                        </Button>
                                                    </Box>
                                                    {showNotesInput && (
                                                        <Box
                                                            display="flex"
                                                            gap={2}
                                                        >
                                                            <TextField
                                                                sx={{
                                                                    width: '83.7% !important'
                                                                }}
                                                                name="notes"
                                                                label="Notes"
                                                                value={notes}
                                                                onChange={(e) =>
                                                                    setNotes(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <Button
                                                                color="secondary"
                                                                variant="outlined"
                                                                onClick={
                                                                    createNote
                                                                }
                                                            >
                                                                Save notes
                                                            </Button>
                                                        </Box>
                                                    )}
                                                    {showNotes &&
                                                        allNotes?.map(
                                                            (note, i) => (
                                                                <>
                                                                    <EdiText
                                                                        // cancelOnUnfocus
                                                                        type="text"
                                                                        viewProps={{
                                                                            style: {
                                                                                fontSize:
                                                                                    '18px',
                                                                                padding: 0,
                                                                                marginTop:
                                                                                    '8px'
                                                                            }
                                                                        }}
                                                                        onCancel={(
                                                                            v
                                                                        ) =>
                                                                            console.log(
                                                                                'CANCELLED: ',
                                                                                v
                                                                            )
                                                                        }
                                                                        onSave={(
                                                                            v
                                                                        ) =>
                                                                            editNote(
                                                                                note._id,
                                                                                v
                                                                            )
                                                                        }
                                                                        value={
                                                                            note.description
                                                                        }
                                                                    />
                                                                    <Divider />
                                                                </>
                                                            )
                                                        )}
                                                </Grid>
                                            )}
                                            <Grid
                                                maxHeight="300px"
                                                minHeight={0}
                                                overflow="auto"
                                            >
                                                {showComments && (
                                                    <>
                                                        {allComments?.map(
                                                            (comment) => {
                                                                return (
                                                                    <>
                                                                        <Grid
                                                                            item
                                                                            display="flex"
                                                                            alignItems="center"
                                                                        >
                                                                            <Avatar
                                                                                alt={
                                                                                    comment
                                                                                        .userId
                                                                                        .userName
                                                                                }
                                                                                src={
                                                                                    Apiconfig.url +
                                                                                    comment
                                                                                        .userId
                                                                                        .profilePath
                                                                                }
                                                                                sx={{
                                                                                    mr: 1,
                                                                                    border: '1px solid lightgrey',
                                                                                    width: 30,
                                                                                    height: 30
                                                                                }}
                                                                            />
                                                                            <Typography fontWeight="bold">
                                                                                {
                                                                                    comment
                                                                                        .userId
                                                                                        .userName
                                                                                }
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            ml={
                                                                                5
                                                                            }
                                                                            pr={
                                                                                1
                                                                            }
                                                                        >
                                                                            {comment
                                                                                .userId
                                                                                ._id ===
                                                                            user?._id ? (
                                                                                <>
                                                                                    <Grid
                                                                                        display="flex"
                                                                                        alignItems="center"
                                                                                        onClick={() =>
                                                                                            setCommentEditEmoji(
                                                                                                !commentEditEmoji
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <EdiText
                                                                                            // cancelOnUnfocus
                                                                                            type="text"
                                                                                            viewProps={{
                                                                                                style: {
                                                                                                    fontSize:
                                                                                                        '14px',
                                                                                                    padding: 0
                                                                                                }
                                                                                            }}
                                                                                            onCancel={(
                                                                                                v
                                                                                            ) =>
                                                                                                console.log(
                                                                                                    'CANCELLED: ',
                                                                                                    v
                                                                                                )
                                                                                            }
                                                                                            onSave={(
                                                                                                v
                                                                                            ) =>
                                                                                                editComments(
                                                                                                    comment._id,
                                                                                                    v
                                                                                                )
                                                                                            }
                                                                                            value={
                                                                                                comment.description
                                                                                            }
                                                                                        />
                                                                                    </Grid>
                                                                                    {commentEditEmoji && (
                                                                                        <Button>
                                                                                            <TagFacesIcon />
                                                                                        </Button>
                                                                                    )}
                                                                                    {/* <Grid
                                                                                        item
                                                                                        display="flex"
                                                                                        justifyContent="flex-end"
                                                                                        width="100%"
                                                                                    >
                                                                                        {showCommentEmojiPicker ? (
                                                                                            <EmojiPicker
                                                                                                width="inherit"
                                                                                                height="300px"
                                                                                                onEmojiClick={
                                                                                                    handleCommentEmojiClick
                                                                                                }
                                                                                            />
                                                                                        ) : (
                                                                                            ''
                                                                                        )}
                                                                                    </Grid> */}
                                                                                </>
                                                                            ) : (
                                                                                <Typography
                                                                                    sx={{
                                                                                        textOverflow:
                                                                                            'ellipsis',
                                                                                        overflow:
                                                                                            'hidden',
                                                                                        fontSize:
                                                                                            '14px !important'
                                                                                    }}
                                                                                    textAlign="left"
                                                                                >
                                                                                    {
                                                                                        comment.description
                                                                                    }
                                                                                </Typography>
                                                                            )}

                                                                            {comment
                                                                                .reply
                                                                                .length >
                                                                            0 ? (
                                                                                <Typography
                                                                                    onClick={() =>
                                                                                        handleShowReply(
                                                                                            comment
                                                                                        )
                                                                                    }
                                                                                    fontSize="13px !important"
                                                                                    color="secondary.main"
                                                                                    sx={{
                                                                                        cursor: 'pointer'
                                                                                    }}
                                                                                >
                                                                                    {showReply ===
                                                                                    comment
                                                                                        ? 'Hide'
                                                                                        : 'View'}{' '}
                                                                                    {
                                                                                        comment
                                                                                            .reply
                                                                                            .length
                                                                                    }{' '}
                                                                                    {comment
                                                                                        .reply
                                                                                        .length ===
                                                                                    1
                                                                                        ? 'reply'
                                                                                        : 'replies'}
                                                                                </Typography>
                                                                            ) : (
                                                                                ''
                                                                            )}

                                                                            {showReply ===
                                                                                comment && (
                                                                                <>
                                                                                    {comment?.reply?.map(
                                                                                        (
                                                                                            item
                                                                                        ) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <Grid
                                                                                                        item
                                                                                                        display="flex"
                                                                                                    >
                                                                                                        <Avatar
                                                                                                            alt={
                                                                                                                item
                                                                                                                    .userId
                                                                                                                    .userName
                                                                                                            }
                                                                                                            src={
                                                                                                                Apiconfig.url +
                                                                                                                item
                                                                                                                    .userId
                                                                                                                    .profilePath
                                                                                                            }
                                                                                                            sx={{
                                                                                                                mr: 1,
                                                                                                                border: '1px solid lightgrey',
                                                                                                                width: 30,
                                                                                                                height: 30
                                                                                                            }}
                                                                                                        />
                                                                                                        <Typography fontWeight="bold">
                                                                                                            {
                                                                                                                item
                                                                                                                    .userId
                                                                                                                    .userName
                                                                                                            }
                                                                                                        </Typography>
                                                                                                    </Grid>
                                                                                                    <Grid
                                                                                                        item
                                                                                                        ml={
                                                                                                            5
                                                                                                        }
                                                                                                    >
                                                                                                        {item
                                                                                                            .userId
                                                                                                            ._id ===
                                                                                                        user?._id ? (
                                                                                                            <EdiText
                                                                                                                cancelOnUnfocus
                                                                                                                type="text"
                                                                                                                viewProps={{
                                                                                                                    style: {
                                                                                                                        fontSize:
                                                                                                                            '14px',
                                                                                                                        padding: 0
                                                                                                                    }
                                                                                                                }}
                                                                                                                onCancel={(
                                                                                                                    v
                                                                                                                ) =>
                                                                                                                    console.log(
                                                                                                                        'CANCELLED: ',
                                                                                                                        v
                                                                                                                    )
                                                                                                                }
                                                                                                                onSave={(
                                                                                                                    v
                                                                                                                ) =>
                                                                                                                    editReplies(
                                                                                                                        item._id,
                                                                                                                        v
                                                                                                                    )
                                                                                                                }
                                                                                                                value={
                                                                                                                    item.description
                                                                                                                }
                                                                                                            />
                                                                                                        ) : (
                                                                                                            <Typography
                                                                                                                sx={{
                                                                                                                    textOverflow:
                                                                                                                        'ellipsis',
                                                                                                                    overflow:
                                                                                                                        'hidden',
                                                                                                                    fontSize:
                                                                                                                        '14px !important'
                                                                                                                }}
                                                                                                                textAlign="left"
                                                                                                            >
                                                                                                                {
                                                                                                                    item.description
                                                                                                                }
                                                                                                            </Typography>
                                                                                                        )}
                                                                                                    </Grid>
                                                                                                </>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                </>
                                                                            )}

                                                                            <Typography
                                                                                onClick={() =>
                                                                                    handleShowInput(
                                                                                        comment
                                                                                    )
                                                                                }
                                                                                fontSize="11px !important"
                                                                                color="secondary.main"
                                                                                sx={{
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                            >
                                                                                Reply
                                                                            </Typography>
                                                                            {showInput ===
                                                                            comment ? (
                                                                                <>
                                                                                    <TextField
                                                                                        fullWidth
                                                                                        sx={{
                                                                                            mt: 1
                                                                                        }}
                                                                                        size="small"
                                                                                        value={
                                                                                            reply
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            setReply(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        }
                                                                                        InputProps={{
                                                                                            endAdornment:
                                                                                                (
                                                                                                    <>
                                                                                                        <Button
                                                                                                            onClick={() =>
                                                                                                                setShowReplyEmoji(
                                                                                                                    !showReplyEmoji
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            <TagFacesIcon />
                                                                                                        </Button>
                                                                                                        <Button
                                                                                                            onClick={() =>
                                                                                                                createReplies(
                                                                                                                    comment._id
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            <SendIcon />
                                                                                                        </Button>
                                                                                                        <Button
                                                                                                            size="small"
                                                                                                            onClick={() =>
                                                                                                                setShowInput(
                                                                                                                    ''
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            <ClearIcon />
                                                                                                        </Button>
                                                                                                    </>
                                                                                                )
                                                                                        }}
                                                                                    />
                                                                                    <Grid
                                                                                        item
                                                                                        display="flex"
                                                                                        justifyContent="flex-end"
                                                                                        width="100%"
                                                                                    >
                                                                                        {showReplyEmoji ? (
                                                                                            <EmojiPicker
                                                                                                width="inherit"
                                                                                                height="300px"
                                                                                                onEmojiClick={
                                                                                                    handleReplyEmojiClick
                                                                                                }
                                                                                            />
                                                                                        ) : (
                                                                                            ''
                                                                                        )}
                                                                                    </Grid>
                                                                                </>
                                                                            ) : (
                                                                                ''
                                                                            )}
                                                                        </Grid>
                                                                    </>
                                                                );
                                                            }
                                                        )}
                                                    </>
                                                )}
                                            </Grid>
                                            <TextField
                                                label="Leave a comment"
                                                value={comments}
                                                onChange={(e) => {
                                                    const trimmedValue =
                                                        e.target.value.replace(
                                                            /^\s+/,
                                                            ''
                                                        );
                                                    setComment(trimmedValue);
                                                }}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <>
                                                            <Button
                                                                onClick={() =>
                                                                    setShowEmoji(
                                                                        !showEmoji
                                                                    )
                                                                }
                                                            >
                                                                <TagFacesIcon />
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    createComments(
                                                                        activeLesson
                                                                    )
                                                                }
                                                            >
                                                                <SendIcon />
                                                            </Button>
                                                        </>
                                                    )
                                                }}
                                            />
                                            <Grid
                                                item
                                                display="flex"
                                                justifyContent="flex-end"
                                                width="100%"
                                            >
                                                {showEmoji ? (
                                                    <EmojiPicker
                                                        width="inherit"
                                                        height="300px"
                                                        onEmojiClick={
                                                            handleEmojiClick
                                                        }
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                            {access && (
                                <Grid item my={5}>
                                    <Typography variant="h4" mb={2}>
                                        <strong>Description</strong>
                                    </Typography>
                                    <Stack
                                        sx={{
                                            overflow: 'scroll',
                                            overflowX: 'hidden',
                                            maxHeight: '25rem'
                                        }}
                                    >
                                        <Typography
                                            color="text.primary"
                                            textAlign="justify"
                                        >
                                            {parse(
                                                `${activeLesson?.description}`
                                            )}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            )}
                            {access && user.role === 'student' && (
                                <Grid item>
                                    <Box>
                                        <Button
                                            color="secondary"
                                            onClick={() =>
                                                handleMarked(activeLesson)
                                            }
                                            variant={
                                                completedLectures?.includes(
                                                    activeLesson?._id
                                                )
                                                    ? 'outlined'
                                                    : 'contained'
                                            }
                                        >
                                            {isLoading && (
                                                <CircularProgress
                                                    size={24}
                                                    sx={
                                                        completedLectures?.includes(
                                                            activeLesson?._id
                                                        )
                                                            ? {
                                                                  mr: 1,
                                                                  color: 'secondary.main'
                                                              }
                                                            : {
                                                                  mr: 1,
                                                                  color: '#fff'
                                                              }
                                                    }
                                                />
                                            )}
                                            {/* {isLoading && <CircularProgress />} */}

                                            {completedLectures?.includes(
                                                activeLesson?._id
                                            )
                                                ? 'Restart'
                                                : 'Complete'}
                                        </Button>
                                    </Box>
                                </Grid>
                            )}
                        </Box>
                    </Grid>
                    {access && (
                        <>
                            {user?.role === 'student' && (
                                <Box
                                    width="100%"
                                    px={{ md: 8, sm: 9, xs: 8 }}
                                    mt={7}
                                >
                                    <SecondaryHeader title="Similar Courses" />
                                    <GridView data={similarCourses} />
                                </Box>
                            )}
                        </>
                    )}
                </Grid>
                <ToastContainer />
            </Stack>
        </>
    );
};

ViewModule.propTypes = {
    moduledata: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ViewModule;

{
    /* obj={
    courseid
    lecture type array

} */
}
