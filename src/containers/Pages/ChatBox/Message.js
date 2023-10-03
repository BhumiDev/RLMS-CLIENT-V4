import { Box, Card, CardContent, Typography } from '@mui/material';
import { format } from 'timeago.js';
import PropTypes from 'prop-types';

const Message = ({ message, own }) => {
    // console.log('own', own, message);
    return (
        <Card
            textalign={own ? 'end' : 'start'}
            color={own ? '#fff' : '#212b36'}
            mt={2}
            style={{ maxWidth: '50%', wordWrap: 'break-word' }}
            sx={
                own
                    ? {
                          borderBottomLeftRadius: '21px',
                          borderBottomRightRadius: '0px',
                          borderTopLeftRadius: '21px',
                          borderTopRightRadius: '21px',
                          my: 1
                      }
                    : {
                          borderBottomRightRadius: '21px',
                          borderTopLeftRadius: '21px',
                          borderTopRightRadius: '21px',
                          borderBottomLeftRadius: '0px',
                          my: 1
                      }
            }
            // borderRadius={3}
        >
            <CardContent
                sx={
                    own
                        ? {
                              color: '#fff',
                              textAlign: 'right',
                              backgroundColor: 'primary.main',
                              p: 1
                          }
                        : { backgroundColor: 'secondary.light', p: 1 }
                }
                // backgroundColor={own ? 'primary.main' : 'secondary.light'}
            >
                <div className="messageTop">
                    <Box
                        p={1}

                        // sx={
                        //     own
                        //         ? {
                        //               borderTopLeftRadius: '21px',
                        //               borderTopRightRadius: '21px'
                        //               //   borderBottomLeftRadius: '21px'
                        //           }
                        //         : {
                        //               borderTopRightRadius: '21px',
                        //               borderBottomRightRadius: '21px',
                        //               borderBottomLeftRadius: '21px'
                        //           }
                        // }
                    >
                        {message.media && (
                            <img
                                src={message.media}
                                alt="myimage"
                                // height="250px"
                                width="300px"
                                style={{ borderRadius: '13px' }}
                            />
                        )}
                    </Box>

                    {/* <p className="messageText">{message.media}</p> */}
                    <Box
                        // backgroundColor={
                        //     own ? 'primary.main' : 'secondary.light'
                        // }
                        px={1}
                    >
                        {' '}
                        <p
                            className="messageText"
                            style={{
                                fontSize: '14px',
                                margin: '0px',
                                padding: '0px'
                            }}
                        >
                            {message.text}
                        </p>
                        <Typography
                            variant="body2"
                            sx={
                                own
                                    ? {
                                          color: 'text.secondary',
                                          fontSize: '10px'
                                      }
                                    : {
                                          color: 'text.secondary',
                                          fontSize: '10px'
                                      }
                            }
                        >
                            {format(message.createdAt)}
                        </Typography>
                    </Box>
                </div>
                {/* <div className="messageBottom"></div> */}
            </CardContent>
        </Card>
    );
};

Message.propTypes = {
    message: PropTypes.objectOf(PropTypes.any).isRequired,
    own: PropTypes.bool.isRequired
};

export default Message;
