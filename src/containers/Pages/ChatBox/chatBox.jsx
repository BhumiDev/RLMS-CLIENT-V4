// import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Box,
    Grid,
    TextField,
    Card,
    CardContent,
    InputAdornment,
    IconButton,
    Tab,
    Typography,
    Stack
} from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import { io } from 'socket.io-client';
// import { Whiteboard } from 'react-fabricjs-whiteboard';
import jwt_decode from 'jwt-decode';
// import { AuthContext } from "../../context/AuthContext";
import Message from './Message';
import Apiconfig from '../../../config/ApiConfig';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Board from './Board'
// import { socket as currSocket&&currSocket } from '../studentDashboard/index';
import { useCurrentChatContext } from './ChatContext';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { DiscussionForum } from './Forum';
import {
    getAlreadyInConversationChat,
    getConversation,
    getGroup,
    getMessage,
    postConversations,
    postMessage,
    userSearch
} from '../../../API/Chat';

const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [groups, setGroups] = useState([]);
    // const [currentChat, setCurrentChat] = useState(null);
    const { currentChat, setCurrentChat, socket } = useCurrentChatContext();
    const currSocket = socket;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [media, setMedia] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [disableSendIcon, setDisableSendIcon] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    // const [usersList,setUsersList]=useState([])
    // const socket = useRef();
    // const user = jwt_decode(token);
    // const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const user = jwt_decode(token);
    console.log('localUser fetched', user);
    console.log('online users', onlineUsers);
    const scrollRef = useRef();
    const [searchedUser, setSearchedUser] = useState([]);
    const [fake, setFake] = useState(false);
    const [value, setValue] = useState('1');

    const handleMessageBox = (e) => {
        const trimmedValue = e.target.value.replace(/^\s+/, '');
        setNewMessage(trimmedValue);
    };

    useEffect(() => {
        // console.log("call getmessege and 10.1.76.54 socket")
        // currSocket&&currSocket = io('ws://localhost:8900');
        // console.log(currSocket&&currSocket);
        currSocket &&
            currSocket.on('getMessage', (data) => {
                // if sendId present in current chat then you can add messege otherwise not
                // console.log("if gropu user present",currentChat?.members.includes(data.senderId))
                // console.log("current chat",currentChat)
                // if(currentChat?.members.includes(data.senderId)){
                //   setArrivalMessage({
                //     sender: data.senderId,
                //     text: data.text,
                //     createdAt: Date.now(),
                //   });
                // }

                console.log('hereeeeee');
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    media: data.media,
                    mediaFormat: data.mediaFormat,
                    createdAt: Date.now(),
                    chatId: data.conversationId
                });
            });

        return () => {
            setCurrentChat(null);
        };
    }, []);

    useEffect(() => {
        console.log('arrivalMsg', arrivalMessage);
        console.log(
            'current chat members',
            currentChat?.members.includes(arrivalMessage?.sender),
            currentChat,
            arrivalMessage?.sender
        );
        console.log('messages', messages);
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            arrivalMessage.chatId === currentChat._id &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    // we need to this useeffect coz use should be check to get socket id to whom i have to send message
    useEffect(() => {
        // currSocket && currSocket.emit('addUser', user._id, user.userName);
        currSocket &&
            currSocket.on('getUsers', (users) => {
                console.log('Socket users found', users);
                setOnlineUsers(
                    // users,
                    users.filter((f) => f.userId !== user._id)
                );
                console.log('Groups', groups);
            });
    }, [user._id, user.userName, groups]);

    useEffect(() => {
        const getConversations = async () => {
            // try {
            //     const res = await axios.get(
            //         'http://10.1.76.126:5000/conversations/' + user._id
            //     );
            //     console.log('conversation', res.data);
            //     setConversations(res.data);
            // } catch (err) {
            //     console.log(err);
            // }
            const res = await getConversation(user?._id);
            setConversations(res.data);
        };
        getConversations();
    }, [user._id, fake]);

    useEffect(() => {
        const getGroups = async () => {
            // try {
            //     const res = await axios.get(
            //         'http://10.1.76.126:5000/groups/' + user._id
            //     );
            //     console.log('groups', res);
            //     setGroups(res.data);
            // } catch (err) {
            //     console.log(err);
            // }
            const res = await getGroup(user?._id);
            setGroups(res.data);
        };
        getGroups();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            console.log('messages chat id', currentChat);
            //     try {
            //         const res = await axios.get(
            //             `http://10.1.76.126:5000/messages/${currentChat?._id}`
            //         );

            //     setMessages(res.data);
            //     console.log('get msg', res.data);
            // } catch (err) {
            //     console.log(err);
            // }
            const res = await getMessage(currentChat?._id);
            console.log('res in getmessages', res);
            setMessages(res.data);
        };
        getMessages();
    }, [currentChat]);

    //  inside handleClickSendNotification
    // const handleNotify = async (e,receiverId,text) => {
    //   e.preventDefault();
    //         currSocket&&currSocket.emit("sendNotify", {
    //         senderId: user._id,
    //         receiverId,
    //         text,
    //         });

    //   };

    // for attachment
    const handleVideo = async () => {
        const data = new FormData();
        console.log('video', media);
        data.append('file', media);
        data.append('upload_preset', 'instaClone');
        data.append('cloud_name', 'aditya-foundation');
        const res = await axios.post(
            'https://api.cloudinary.com/v1_1/aditya-foundation/image/upload',
            data
        );
        // .then(response => {
        //    console.log ("response",response)
        //    setMedia(response.url)
        //    return response.url
        // }
        // )
        // .catch(err=>{
        //     console.log(err)
        // })
        console.log('response', res.data.url);
        console.log('response', res.data);
        setMedia('');
        return res.data;
    };

    const handleSubmit = async (e) => {
        setDisableSendIcon(true);
        e.preventDefault();
        let mediaData = '';
        console.log('newMessage', newMessage);
        const curr_msg = newMessage;
        console.log('media data', media);
        console.log('msg data', curr_msg);
        // for attachment
        if (media !== '') {
            mediaData = await handleVideo();
        }

        // const resource_type = mediaData.resource_type
        // const url = mediaData.url

        console.log('Submitted media data', mediaData);
        // if (!newMessage) {
        //     // curr_msg = media
        //     curr_msg = url;
        // }
        const message = {
            sender: user?._id,
            // text: newMessage,
            text: curr_msg,
            media: mediaData?.url,
            mediaFormat: mediaData?.resource_type,
            conversationId: currentChat?._id
        };

        console.log('messagessd', message);

        // const receiverId = currentChat.members.find(
        //   (member) => member !== user._id
        // );
        const receiverId = currentChat?.members?.filter(
            (member) =>
                member !== user?._id &&
                typeof member !== 'object' &&
                member != null
        );
        console.log('reciever id', receiverId, user?._id);
        // const receiverId = currentChat.members
        /// when group chat so you have to send id of every person in group in reciever id
        currSocket &&
            currSocket.emit('sendMessage', {
                senderId: user?._id,
                receiverId,
                text: newMessage,
                media: mediaData?.url,
                mediaFormat: mediaData?.resource_type,
                conversationId: currentChat._id
            });

        try {
            if (curr_msg !== '' || mediaData !== '') {
                // const res = await axios.post(
                //     'http://10.1.76.126:5000/messages',
                //     message
                // );
                const res = await postMessage(message);
                setMessages([...messages, res?.data]);
            }
            setNewMessage('');
            setMedia('');
            setDisableSendIcon(false);
        } catch (err) {
            console.log(err);
        }
    };

    // Add an event listener to the document
    document?.addEventListener('keydown', (e) => {
        if (e?.ctrlKey && e?.key === 'Enter') {
            // Call the handleSubmit function when Control + Enter is pressed
            handleSubmit(e);
        }
    });

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const handleSearch = async (e) => {
        if (e.target.value !== '') {
            // const response = await axios.get(
            //     `http://10.1.76.126:5000/user/search/${e.target.value}`
            // );
            const response = await userSearch(e.target.value);
            console.log(response.data.data);

            if (response.data.data.length > 0) {
                let searched_users = response.data.data.filter(
                    (x) => x._id !== user._id
                );
                console.log(searched_users);
                setSearchedUser(searched_users);
            }
        } else {
            setSearchedUser([]);
        }
    };

    const debounceOnChange = useCallback(debounce(handleSearch), []);

    const CreateChat = async (sender, receiver) => {
        console.log('searched user', searchedUser);
        console.log('given create chat data', sender, receiver);
        const senderId = sender.id;
        const receiverId = receiver.id;
        // const alreadyConv = await axios.get(
        //     `http://10.1.76.126:5000/conversations/find/${sender.id}/${receiver.id}`
        // );
        const alreadyConv = await getAlreadyInConversationChat(
            senderId,
            receiverId
        );
        console.log('already if chat present', alreadyConv);

        if (!alreadyConv.data) {
            // const res = await axios.post(
            //     'http://10.1.76.126:5000/conversations',
            //     {
            //         sender,
            //         receiver,
            //         senderId,
            //         receiverId
            //     }
            // );
            const res = await postConversations(
                sender,
                receiver,
                senderId,
                receiverId
            );
            console.log('conversations... response', res);
            setFake(!fake);
        }
    };

    useEffect(() => {
        // scrollRef.current?.scrollIntoView({ behavious: 'smooth' });
        scrollRef.current?.scrollIntoView({ block: 'end' });
        let container = document.getElementById('chatContainer');
        container.scrollTop = container?.scrollHeight;
    }, [messages]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            className="primary-box"
            sx={{
                // backgroundColor: 'secondary.light',
                minHeight: 'calc(100vh - 217px)'
            }}
        >
            <Box px={{ md: 9, sm: 2, xs: 2 }} mt={4}>
                <TabContext value={value}>
                    <Box>
                        <TabList
                            onChange={handleTabChange}
                            textColor="primary.light"
                            TabIndicatorProps={{
                                sx: { backgroundColor: 'secondary.main' }
                            }}
                        >
                            <Tab label="Chat" value="1" />
                            <Tab label="Discussion Forum" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Grid container display="flex" gap={4}>
                            <Grid item md={3} sm={12} xs={12}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <TextField
                                        placeholder="Search for friends"
                                        className="chatMenuInput"
                                        size="large"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => debounceOnChange(e)}
                                        sx={{ border: 'none' }}
                                        InputProps={{
                                            // it is used to provide props to TextField basically same as above props
                                            style: {
                                                padding: 8,
                                                borderRadius: 12,
                                                color: 'text.primary'
                                            }
                                        }}
                                    />
                                    <Stack
                                        sx={{
                                            flexDirection: 'column',
                                            alignItems: 'start',
                                            maxHeight:"16rem",
                                            overflow:"scroll",
                                            overflowX:"hidden"
                                        }}
                                    >
                                        {searchedUser.map((data, i) => (
                                            <Button
                                                key={i}
                                                onClick={() =>
                                                    CreateChat(
                                                        {
                                                            id: user._id,
                                                            name: user.userName
                                                        },
                                                        {
                                                            id: data._id,
                                                            name: data.name
                                                        }
                                                    )
                                                }
                                            >
                                                {data.name}
                                            </Button>
                                        ))}
                                    </Stack>
                                    <Card
                                        sx={{
                                            backgroundColor:
                                                'background.default',
                                            mt: 4,
                                            height: '65vh',
                                            overflow: 'auto'
                                        }}
                                    >
                                        {' '}
                                        {conversations.map((c) => (
                                            <CardContent>
                                                <Button
                                                    onClick={() =>
                                                        setCurrentChat(c)
                                                    }
                                                    color="secondary"
                                                >
                                                    {/* {onlineUsers.filter((obj) => {
                                    console.log('Dom userId', obj.userId);
                                    obj.userId === c.members[1];
                                    return obj.userName && obj.userName;
                                })} */}
                                                    {c.members[0].id ===
                                                        user._id && (
                                                        <p>
                                                            {c.members[1].name}
                                                        </p>
                                                    )}
                                                    {c.members[0].id !==
                                                        user._id && (
                                                        <p>
                                                            {c.members[0].name}
                                                        </p>
                                                    )}
                                                    {/* <Conversation
                                    // conversation={c}
                                    // currentUser={user}
                                /> */}
                                                </Button>
                                            </CardContent>
                                        ))}
                                    </Card>

                                    {/* <div> */}
                                    {/* {groups.map((c) => ( 
                                <Button onClick={() => setCurrentChat(c)}>
                                    {c?.groupName}
                                    group
                                     <Conversation
                                        conversation={c}
                                        currentUser={user}
                                    /> 
                                </Button> 
                            ))} */}
                                    {/* </div> */}
                                    {/* <div>
                            <h3>Online Users available</h3>
                            {onlineUsers.map((onlineUser) => (
                                <Button
                                    onClick={() =>
                                        CreateChat(user._id, onlineUser.userId)
                                    }
                                >
                                    {onlineUser.userId}
                                </Button>
                            ))}
                        </div> */}
                                </Box>
                            </Grid>
                            {/* <Grid item className="chatBox" xl={8.2} lg={8} md={8.5} sm={12} xs={12}>
                    <Box> */}
                            <Grid
                                item
                                className="chatBox"
                                id="chatContainer"
                                md={8.6}
                                sm={12}
                                xs={12}
                                //  height='65vh' overflow='auto'
                                borderRadius={2}
                            >
                                <Box>
                                    <Card
                                        className="chatBoxWrapper"
                                        sx={{
                                            backgroundColor:
                                                'background.default',
                                            borderRadius: 2,
                                            height: '100%',
                                            overflow: 'auto',
                                            boxShadow: 2
                                        }}
                                    >
                                        <CardContent>
                                            {currentChat ? (
                                                <>
                                                    <Stack
                                                        className="chatBoxTop"
                                                        height="65vh"
                                                        overflow="auto"
                                                    >
                                                        {messages.map((m) => (
                                                            <Box
                                                                className="map-container"
                                                                display="flex"
                                                                justifyContent={
                                                                    m?.sender ===
                                                                        user._id &&
                                                                    'end'
                                                                }
                                                                ref={scrollRef}
                                                            >
                                                                <Message
                                                                    message={m}
                                                                    own={
                                                                        m.sender ===
                                                                        user._id
                                                                    }
                                                                />
                                                            </Box>
                                                        ))}
                                                    </Stack>
                                                    <Box
                                                        display="flex"
                                                        justifyContent="center"
                                                    >
                                                        <Box
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            width="100%"
                                                        >
                                                            <TextField
                                                                multiline
                                                                className="chatMessagesInput"
                                                                placeholder="Write something..."
                                                                variant="filled"
                                                                sx={{
                                                                    width: '100%',
                                                                    '& textarea':
                                                                        {
                                                                            // Limit the height to a maximum of 3 rows
                                                                            maxHeight:
                                                                                '5em', // You can adjust the height as needed
                                                                            // Allow scrolling within the textarea if content exceeds 3 rows
                                                                            overflowY:
                                                                                'auto'
                                                                        }
                                                                }}
                                                                onChange={(e) =>
                                                                    handleMessageBox(
                                                                        e
                                                                    )
                                                                }
                                                                value={
                                                                    newMessage
                                                                }
                                                                InputProps={{
                                                                    endAdornment:
                                                                        (
                                                                            <Box
                                                                                className="upload-btn-wrapper"
                                                                                style={{
                                                                                    marginTop:
                                                                                        '-15px',
                                                                                    display:
                                                                                        'flex',
                                                                                    alignItems:
                                                                                        'center',
                                                                                    gap: 10
                                                                                }}
                                                                            >
                                                                                <IconButton className="btn">
                                                                                    <AttachFile />
                                                                                    <input
                                                                                        type="file"
                                                                                        name="myfile"
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            const file =
                                                                                                e
                                                                                                    .target
                                                                                                    .files[0];
                                                                                            console.log(
                                                                                                'Media Attached',
                                                                                                file
                                                                                            );

                                                                                            const allowedMimeTypes =
                                                                                                [
                                                                                                    'image/jpeg',
                                                                                                    'image/jpg',
                                                                                                    'image/png',
                                                                                                    'image/gif',
                                                                                                    'image/bmp',
                                                                                                    'image/webp',
                                                                                                    'application/pdf',
                                                                                                    'application/msword',
                                                                                                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                                                                    'text/plain',
                                                                                                    'application/zip'
                                                                                                ];

                                                                                            if (
                                                                                                !(
                                                                                                    file &&
                                                                                                    allowedMimeTypes.includes(
                                                                                                        file.type
                                                                                                    )
                                                                                                )
                                                                                            ) {
                                                                                                // Show error toast
                                                                                                toast.error(
                                                                                                    'Videos cannot be uploaded. Please upload valid files or images.'
                                                                                                );
                                                                                            } else {
                                                                                                // Set media if the condition is satisfied
                                                                                                setMedia(file);
                                                                                            }
                                                                                        }}
                                                                                        required
                                                                                    />
                                                                                </IconButton>
                                                                                <Typography
                                                                                    style={{
                                                                                        width: 'min-content',
                                                                                        maxHeight:
                                                                                            '50px',
                                                                                        textOverflow:
                                                                                            'ellipsis',
                                                                                        overflow:
                                                                                            'hidden',
                                                                                        fontSize:
                                                                                            '12px'
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        media?.name
                                                                                    }
                                                                                </Typography>
                                                                            </Box>
                                                                        )
                                                                }}
                                                            />

                                                            <div>
                                                                {/* <span style={{ color: 'red' }}>
                                                    Upload Image
                                                </span>
                                                <input
                                                    type="file"
                                                    onChange={(e) =>
                                                        setMedia(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    required
                                                /> */}
                                                            </div>
                                                            <IconButton
                                                            disabled={disableSendIcon}
                                                                aria-label="toggle password visibility"
                                                                onClick={
                                                                    handleSubmit
                                                                }
                                                                // onClick={
                                                                //     handleClickShowPassword
                                                                // }
                                                                // color="primary"
                                                                sx={{
                                                                    backgroundColor:
                                                                        'secondary.light',
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    padding: 2,
                                                                    borderRadius:
                                                                        '50%',
                                                                    marginLeft: 3
                                                                }}
                                                            >
                                                                <Send />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </>
                                            ) : (
                                                <span className="noConversationText">
                                                    Open a conversation to start
                                                    a chat.
                                                </span>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                            {/* <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            // onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div> */}
                        </Grid>
                    </TabPanel>

                    <TabPanel value="2">
                        <DiscussionForum />
                    </TabPanel>
                </TabContext>
            </Box>
            {/* <Topbar /> */}
        </Box>
    );
};

export default Messenger;
