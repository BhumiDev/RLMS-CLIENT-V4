
import { format } from 'timeago.js';
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
} from "@mui/material";
import Apiconfig from "../../../config/ApiConfig";


export const DiscussionCard = ({ data }) => {
    return (
        <>
            <Box >
                <Typography variant="h6" color='text.secondary' >
                    {data?.description}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }} my={1}>
                <Typography sx={{
                    fontSize: '10px !important',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <Avatar
                        sx={{ width: 20, height: 20 }}
                        src={Apiconfig.url + data?.userId.profilePath}
                    />
                    Answered by
                    <Typography variant="body2">
                        {data?.userId.name}
                    </Typography >
                </Typography>
                <Typography variant="body2" color='secondary.onDarkContrastText'>
                    {format(data?.createdAt)}
                </Typography>
            </Box>
        </>
    )
}