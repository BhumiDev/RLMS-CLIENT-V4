import React, { useRef } from 'react';
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
} from '@mui/material';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
    createDiscussion,
    getDiscussionS,
    submitDiscussionAnswerReply,
    submitDiscussionLikes,
    submitDiscussionReply
} from '../../../API/Course';
import { useEffect } from 'react';
import { format } from 'timeago.js';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Apiconfig from '../../../config/ApiConfig';
import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded';
import parse from 'html-react-parser';
import { DiscussionCard } from './DiscussionCard';

export const ForumComponent = ({ data, fake, setFake }) => {
    const [comment, setComment] = useState([]);
    const [needsMoreButton, setNeedsMoreButton] = useState(false);
    const [showMoreComments, setShowMoreComments] = useState(false);
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showViewBox, setShowViewBox] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [reply, setReply] = useState([]);

    useEffect(() => {
        getAllDiscussions();
    }, [fake]);

    const getAllDiscussions = async () => {
        await getDiscussionS();
    };

    // const handleChange = (index, e) => {
    //     const newInputValues = [...comment];
    //     newInputValues[index] = e.target.value;
    //     setComment(newInputValues);
    // }
    const handleChange = (index, e) => {
        const newInputValues = [...comment];
        const trimmedValue = e.target.value.replace(/^\s+/, '');
        newInputValues[index] = trimmedValue;
        setComment(newInputValues);
    };

    const submitAnswer = async (index, id) => {
        await submitDiscussionReply(comment[index], id);
        setFake(!fake);
        setComment([]);
    };

    const handleCommentKeyDown = (e, index, discussionId) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault(); // Prevent line break in the textarea
            if (comment[index]) {
                submitAnswer(index, discussionId);
            }
        }
    };

    const handleShowComments = (e) => {
        if (showMoreComments === e) {
            setShowMoreComments(false);
        } else setShowMoreComments(e);
    };

    const postLikes = async (id) => {
        await submitDiscussionLikes(id);
        setFake(!fake);
    };

    const handleShowReplyBox = (discussionIndex, answerIndex) => {
        setShowReplyBox({ discussionIndex, answerIndex });
    };
    // } else setShowReplyBox(e);

    const handleShowReply = (e) => {
        if (showReply === e) {
            setShowReply(false);
        } else setShowReply(e);
    };

    // const handleReplyChange = (discussionIndex, answerIndex, e) => {
    //     const { name, value } = e.target;
    //     if (answerIndex !== undefined) {
    //         const updatedReply = [...reply];
    //         updatedReply[`${discussionIndex}_${answerIndex}`] = value;
    //         setReply(updatedReply);
    //     } else {
    //         const updatedReply = [...reply];
    //         updatedReply[discussionIndex] = value;
    //         setReply(updatedReply);
    //     }
    // }
    const handleReplyChange = (discussionIndex, answerIndex, e) => {
        const { name, value } = e.target;
        const trimmedValue = value.replace(/^\s+/, '');
        const trimmedName = name.replace(/^\s+/, '');

        if (answerIndex !== undefined) {
            const updatedReply = [...reply];
            updatedReply[`${discussionIndex}_${answerIndex}`] = trimmedValue;
            setReply(updatedReply);
        } else {
            const updatedReply = [...reply];
            updatedReply[discussionIndex] = trimmedValue;
            setReply(updatedReply);
        }
    };

    const postCommentReply = async (value, id) => {
        await submitDiscussionAnswerReply(value, id);
        setFake(!fake);
        setReply([]);
    };
    const handleReplyKeyDown = (e, discussionIndex, answerIndex, id) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault(); // Prevent line break in the textarea
            if (reply[`${discussionIndex}_${answerIndex}`]) {
                postCommentReply(
                    reply[`${discussionIndex}_${answerIndex}`],
                    id
                );
            }
        }
    };

    return (
        <>
            {data?.length === 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="h5">No data found</Typography>
                </Box>
            ) : (
                <>
                    {data &&
                        Array.from(data)
                            .reverse()
                            .map((discussion, index) => {
                                return (
                                    <>
                                        <Grid
                                            item
                                            boxShadow={2}
                                            borderRadius={1}
                                            p={4}
                                            mb={3}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: 5,
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Avatar
                                                        src={
                                                            Apiconfig.url +
                                                            discussion.userId
                                                                ?.profilePath
                                                        }
                                                        alt=""
                                                        sx={{
                                                            width: 32,
                                                            height: 32
                                                        }}
                                                    />{' '}
                                                    Posted by
                                                    <Typography
                                                        variant="h6"
                                                        color="secondary.main"
                                                    >
                                                        {
                                                            discussion.userId
                                                                ?.name
                                                        }
                                                    </Typography>
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="secondary.onDarkContrastText"
                                                >
                                                    {format(
                                                        discussion?.createdAt
                                                    )}
                                                </Typography>
                                            </Box>

                                            <Typography variant="h4" my={1}>
                                                {parse(
                                                    `${discussion?.question}`
                                                )}
                                            </Typography>

                                            {showMoreComments !== discussion ? (
                                                <>
                                                    {discussion?.answers
                                                        .length > 0 ? (
                                                        <Box my={1}>
                                                            <DiscussionCard
                                                                data={
                                                                    discussion
                                                                        ?.answers[
                                                                        discussion
                                                                            ?.answers
                                                                            .length -
                                                                            1
                                                                    ]
                                                                }
                                                            />

                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    gap: 3,
                                                                    cursor: 'pointer'
                                                                }}
                                                                my={1}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    color="secondary"
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        gap: 1
                                                                    }}
                                                                    onClick={() =>
                                                                        postLikes(
                                                                            discussion
                                                                                ?.answers[
                                                                                discussion
                                                                                    ?.answers
                                                                                    .length -
                                                                                    1
                                                                            ]
                                                                                ._id
                                                                        )
                                                                    }
                                                                >
                                                                    <ArrowUpwardOutlinedIcon
                                                                        sx={{
                                                                            fontSize:
                                                                                '16px'
                                                                        }}
                                                                    />
                                                                    Upvotes
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontWeight:
                                                                                'bold'
                                                                        }}
                                                                    >
                                                                        {
                                                                            discussion
                                                                                ?.answers[
                                                                                discussion
                                                                                    ?.answers
                                                                                    .length -
                                                                                    1
                                                                            ]
                                                                                .likes
                                                                                .length
                                                                        }
                                                                    </Typography>
                                                                </Typography>

                                                                <Typography
                                                                    variant="body2"
                                                                    color="secondary.onDarkContrastText"
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        gap: 1
                                                                    }}
                                                                    onClick={() =>
                                                                        handleShowComments(
                                                                            discussion
                                                                        )
                                                                    }
                                                                >
                                                                    <ShortcutRoundedIcon />{' '}
                                                                    Replies
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontWeight:
                                                                                'bold'
                                                                        }}
                                                                    >
                                                                        {
                                                                            discussion
                                                                                ?.answers[
                                                                                discussion
                                                                                    ?.answers
                                                                                    .length -
                                                                                    1
                                                                            ]
                                                                                .reply
                                                                                .length
                                                                        }
                                                                    </Typography>
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    ) : (
                                                        'No replies yet'
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {Array.from(
                                                        discussion.answers
                                                    )
                                                        .reverse()
                                                        .map((item, idx) => {
                                                            const answerReplyValue =
                                                                reply[
                                                                    `${index}_${idx}`
                                                                ] || '';
                                                            return (
                                                                <Box
                                                                    mt={1}
                                                                    mb={3}
                                                                >
                                                                    <DiscussionCard
                                                                        data={
                                                                            item
                                                                        }
                                                                    />

                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                'flex',
                                                                            gap: 3,
                                                                            cursor: 'pointer'
                                                                        }}
                                                                        my={1}
                                                                    >
                                                                        <Typography
                                                                            color="secondary"
                                                                            variant="body2"
                                                                            sx={{
                                                                                display:
                                                                                    'flex',
                                                                                alignItems:
                                                                                    'center',
                                                                                gap: 1
                                                                            }}
                                                                            onClick={() =>
                                                                                postLikes(
                                                                                    item._id
                                                                                )
                                                                            }
                                                                        >
                                                                            <ArrowUpwardOutlinedIcon
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '16px'
                                                                                }}
                                                                            />{' '}
                                                                            Upvotes
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    fontWeight:
                                                                                        'bold'
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item
                                                                                        ?.likes
                                                                                        ?.length
                                                                                }
                                                                            </Typography>
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="secondary.onDarkContrastText"
                                                                            sx={{
                                                                                display:
                                                                                    'flex',
                                                                                alignItems:
                                                                                    'center',
                                                                                gap: 1
                                                                            }}
                                                                            onClick={() =>
                                                                                handleShowReply(
                                                                                    item
                                                                                )
                                                                            }
                                                                        >
                                                                            <ShortcutRoundedIcon />{' '}
                                                                            Replies
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    fontWeight:
                                                                                        'bold'
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item
                                                                                        ?.reply
                                                                                        .length
                                                                                }
                                                                            </Typography>
                                                                        </Typography>
                                                                        {/* <Typography variant="body2" color='secondary.main' sx={{
                                                                    display: 'flex', alignItems: 'center', gap: 1, textDecoration:"underline"
                                                                }}
                                                                    onClick={() => setShowReplyBox(!showReplyBox)}
                                                                >
                                                                    <ShortcutRoundedIcon /> Reply
                                                                </Typography> */}
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="secondary.main"
                                                                            sx={{
                                                                                display:
                                                                                    'flex',
                                                                                alignItems:
                                                                                    'center',
                                                                                gap: 1,
                                                                                textDecoration:
                                                                                    'underline'
                                                                            }}
                                                                            onClick={() =>
                                                                                handleShowReplyBox(
                                                                                    index,
                                                                                    idx
                                                                                )
                                                                            } // Pass the indices to the function
                                                                        >
                                                                            <ShortcutRoundedIcon />{' '}
                                                                            Reply
                                                                        </Typography>
                                                                    </Box>

                                                                    <Box
                                                                        sx={{
                                                                            borderLeft:
                                                                                '2px solid #DDDDDD'
                                                                        }}
                                                                    >
                                                                        <Box
                                                                            sx={{
                                                                                maxHeight:
                                                                                    '300px',
                                                                                overflow:
                                                                                    'auto'
                                                                            }}
                                                                        >
                                                                            {item?.reply.map(
                                                                                (
                                                                                    items
                                                                                ) => (
                                                                                    <Box
                                                                                        pl={
                                                                                            4
                                                                                        }
                                                                                    >
                                                                                        <Typography
                                                                                            variant="subtitle1"
                                                                                            sx={{
                                                                                                color: '#50698D'
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                items?.description
                                                                                            }
                                                                                        </Typography>
                                                                                        <Box
                                                                                            my={
                                                                                                1
                                                                                            }
                                                                                            sx={{
                                                                                                display:
                                                                                                    'flex',
                                                                                                gap: 3
                                                                                            }}
                                                                                        >
                                                                                            <Typography
                                                                                                sx={{
                                                                                                    fontSize:
                                                                                                        '10px !important',
                                                                                                    display:
                                                                                                        'flex',
                                                                                                    alignItems:
                                                                                                        'center',
                                                                                                    gap: 1
                                                                                                }}
                                                                                            >
                                                                                                <Avatar
                                                                                                    src={
                                                                                                        Apiconfig.url +
                                                                                                        items
                                                                                                            .userId
                                                                                                            .profilePath
                                                                                                    }
                                                                                                    sx={{
                                                                                                        width: 20,
                                                                                                        height: 20
                                                                                                    }}
                                                                                                />{' '}
                                                                                                Replied
                                                                                                By
                                                                                                <Typography variant="body2">
                                                                                                    {
                                                                                                        items
                                                                                                            ?.userId
                                                                                                            .name
                                                                                                    }
                                                                                                </Typography>
                                                                                            </Typography>
                                                                                            <Typography
                                                                                                variant="body2"
                                                                                                color="secondary.onDarkContrastText"
                                                                                            >
                                                                                                {format(
                                                                                                    items?.createdAt
                                                                                                )}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                    </Box>
                                                                                )
                                                                            )}
                                                                        </Box>
                                                                        {showReplyBox &&
                                                                            showReplyBox.discussionIndex ===
                                                                                index &&
                                                                            showReplyBox.answerIndex ===
                                                                                idx && (
                                                                                <Box
                                                                                    pl={
                                                                                        4
                                                                                    }
                                                                                    mt={
                                                                                        2
                                                                                    }
                                                                                >
                                                                                    <TextField
                                                                                        sx={{
                                                                                            input: {
                                                                                                backgroundColor:
                                                                                                    'secondary.light',
                                                                                                borderTopLeftRadius:
                                                                                                    '16px',
                                                                                                borderBottomLeftRadius:
                                                                                                    '16px'
                                                                                            },
                                                                                            '& .MuiOutlinedInput-root':
                                                                                                {
                                                                                                    paddingRight: 0,
                                                                                                    '& fieldset':
                                                                                                        {
                                                                                                            borderColor:
                                                                                                                'lightgrey',
                                                                                                            borderRadius: 2
                                                                                                        }
                                                                                                }
                                                                                        }}
                                                                                        fullWidth
                                                                                        label={
                                                                                            !answerReplyValue
                                                                                                ? 'Write your reply'
                                                                                                : ''
                                                                                        }
                                                                                        name={`reply${index}`}
                                                                                        value={
                                                                                            answerReplyValue
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleReplyChange(
                                                                                                index,
                                                                                                idx,
                                                                                                e
                                                                                            )
                                                                                        }
                                                                                        onKeyDown={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleReplyKeyDown(
                                                                                                e,
                                                                                                index,
                                                                                                idx,
                                                                                                item?._id
                                                                                            )
                                                                                        }
                                                                                        size="small"
                                                                                        InputProps={{
                                                                                            borderRadius: 2,
                                                                                            backgroundColor:
                                                                                                'secondary.light',
                                                                                            endAdornment:
                                                                                                answerReplyValue[
                                                                                                    index
                                                                                                ] ? (
                                                                                                    <InputAdornment>
                                                                                                        <SendOutlinedIcon
                                                                                                            sx={{
                                                                                                                backgroundColor:
                                                                                                                    'secondary.light',
                                                                                                                padding: 1,
                                                                                                                fontSize:
                                                                                                                    '40px',
                                                                                                                borderTopRightRadius:
                                                                                                                    '16px',
                                                                                                                borderBottomRightRadius:
                                                                                                                    '16px',
                                                                                                                cursor: 'pointer'
                                                                                                            }}
                                                                                                            onClick={() =>
                                                                                                                postCommentReply(
                                                                                                                    answerReplyValue,
                                                                                                                    item?._id
                                                                                                                )
                                                                                                            }
                                                                                                           
                                                                                                        />
                                                                                                    </InputAdornment>
                                                                                                ) : (
                                                                                                    // If comment is an empty string, disable the icon
                                                                                                    <InputAdornment>
                                                                                                        <SendOutlinedIcon
                                                                                                            sx={{
                                                                                                                backgroundColor:
                                                                                                                    'secondary.light',
                                                                                                                padding: 1,
                                                                                                                fontSize:
                                                                                                                    '40px',
                                                                                                                borderTopRightRadius:
                                                                                                                    '16px',
                                                                                                                borderBottomRightRadius:
                                                                                                                    '16px',
                                                                                                                cursor: 'not-allowed' // Change cursor to 'not-allowed' to disable
                                                                                                            }}
                                                                                                        />
                                                                                                    </InputAdornment>
                                                                                                )
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                            )}
                                                                    </Box>
                                                                </Box>
                                                            );
                                                        })}
                                                </>
                                            )}

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end'
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="primary.light"
                                                    sx={{
                                                        fontSize:
                                                            '13px !important',
                                                        fontWeight: 600,
                                                        textDecoration:
                                                            'underline',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() =>
                                                        handleShowComments(
                                                            discussion
                                                        )
                                                    }
                                                >
                                                    {showMoreComments !==
                                                    discussion
                                                        ? 'SEE MORE COMMENTS'
                                                        : 'SEE LESS COMMENTS'}
                                                </Typography>
                                            </Box>

                                            <Box mb={1} mt={2}>
                                                <TextField
                                                    sx={{
                                                        input: {
                                                            backgroundColor:
                                                                'secondary.light',
                                                            borderTopLeftRadius:
                                                                '16px',
                                                            borderBottomLeftRadius:
                                                                '16px'
                                                        },
                                                        '& .MuiOutlinedInput-root':
                                                            {
                                                                paddingRight: 0,
                                                                '& fieldset': {
                                                                    borderColor:
                                                                        'lightgrey',
                                                                    borderRadius: 2
                                                                }
                                                            }
                                                    }}
                                                    fullWidth
                                                    label={
                                                        comment?.length === 0
                                                            ? 'Write your views'
                                                            : ''
                                                    }
                                                    name={`reply${index}`}
                                                    value={comment[index] || ''}
                                                    onChange={(e) =>
                                                        handleChange(index, e)
                                                    }
                                                   
                                                    size="small"
                                                    InputLabelProps={{
                                                        shrink: false
                                                    }}
                                                    onKeyDown={(
                                                        e
                                                    ) =>
                                                        handleCommentKeyDown(
                                                            e,
                                                            index,
                                                            discussion._id
                                                        )
                                                    }
                                                    InputProps={{
                                                        borderRadius: 2,
                                                        backgroundColor:
                                                            'secondary.light',
                                                        endAdornment: comment[
                                                            index
                                                        ] ? (
                                                            <InputAdornment>
                                                                <SendOutlinedIcon
                                                                    sx={{
                                                                        backgroundColor:
                                                                            'secondary.light',
                                                                        padding: 1,
                                                                        fontSize:
                                                                            '40px',
                                                                        borderTopRightRadius:
                                                                            '16px',
                                                                        borderBottomRightRadius:
                                                                            '16px',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    onClick={() =>
                                                                        submitAnswer(
                                                                            index,
                                                                            discussion?._id
                                                                        )
                                                                    }
                                                                   
                                                                />
                                                            </InputAdornment>
                                                        ) : (
                                                            // If comment is an empty string, disable the icon
                                                            <InputAdornment>
                                                                <SendOutlinedIcon
                                                                    sx={{
                                                                        backgroundColor:
                                                                            'secondary.light',
                                                                        padding: 1,
                                                                        fontSize:
                                                                            '40px',
                                                                        borderTopRightRadius:
                                                                            '16px',
                                                                        borderBottomRightRadius:
                                                                            '16px',
                                                                        cursor: 'not-allowed' // Change cursor to 'not-allowed' to disable
                                                                    }}
                                                                />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    </>
                                );
                            })}
                </>
            )}
        </>
    );
};
