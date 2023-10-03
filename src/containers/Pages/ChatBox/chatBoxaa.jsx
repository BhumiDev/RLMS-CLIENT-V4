import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    IconButton,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';

const sender = [
    {
        data: 'kya haal hai'
    },
    {
        data: 'kaha chal rha hai aaj wergqio[egqoieoiqmv4etu91v4toi[oq54oi1'
    }
];

const reciever = [
    {
        data: 'bahut he badiya'
    },
    {
        data: 'kapil sharma show '
    }
];

const ChatBox = () => (
    <Box p={1}>
        <Card sx={{ maxWidth: 535 }} p={1}>
            <CardHeader
                sx={{ backgroundColor: 'primary.light', color: 'white', p: '10px' }}
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and "
            />

            <CardContent p={1}>
                <Typography variant="body2" color="text.secondary">
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        {reciever.map((item) => (
                            <Grid item md={7} mb={2}>
                                <Stack direction="row">
                                    <>
                                        <Avatar />
                                        <Box
                                            backgroundColor="#secondary.light"
                                            borderRadius="10px"
                                            ml={1}
                                            p={1}
                                        >
                                            <Typography variant="body1">
                                                {item.data}
                                            </Typography>
                                        </Box>
                                    </>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        {sender.map((item) => (
                            <Grid item mb={2}>
                                <Box
                                    backgroundColor="secondary.light"
                                    borderRadius="10px"
                                    p={1}
                                >
                                    <Typography variant="body1">
                                        {item.data}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Typography>
            </CardContent>
            <CardActions spacing={2}>
                <Box component="form" noValidate autoComplete="off">
                    <FormControl sx={{ width: '44ch', height: '5ch' }}>
                        <OutlinedInput placeholder="Please enter text" />
                    </FormControl>
                </Box>
                <IconButton aria-label="settings">
                    <SendIcon />
                </IconButton>
            </CardActions>
        </Card>
    </Box>
);

export default ChatBox;
