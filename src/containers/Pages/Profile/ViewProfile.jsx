import jwtDecode from "jwt-decode";
import {
    Box,
    Typography,
    Toolbar,
    TextField,
    Avatar,
    Button,
    useTheme,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Modal
} from '@mui/material';
import { useState } from "react";
import { editProfilephoto, getCurrentUser } from "../../../API/Course";
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Apiconfig from "../../../config/ApiConfig";
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ViewProfile = () => {

    const [user, setUser] = useState();
    const [image, setImage] = useState("");
    const [fake, setFake] = useState(false);

    const [userName, setUserName] = useState("");

    const [open, setOpen] = useState(false);
    const [disableSave, setDisableSave] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{
        setImage('');
        setUserName('');
         setOpen(false)};

    const getUser = async () => {
        const res = await getCurrentUser();
        setUser(res?.data?.data)
    }

    const handleFileChange = (e) => {
        if (
            !(
                e.target.files[0] &&
                (e.target.files[0].type ===
                    'image/jpeg' ||
                    e.target.files[0].type ===
                        'image/jpg' ||
                    e.target.files[0].type ===
                        'image/png')
            )
        ) {
            // Show error toast
            toast.error(
                'Please! upload images only.'
            );
        } else {
            // Set media if the condition is satisfied
            console.log("name", e.target.files[0])
            setImage(e.target.files[0])
            const isEmptyPlaceholder = e.target.files[0] === "";
            setDisableSave(isEmptyPlaceholder || !e.target.files[0])
            // setImage('');
        }
    }

    const handleNameChange = (e) => {
       
        setUserName(e.target.value)
        const isEmptyPlaceholder = e.target.value === "";
        setDisableSave(isEmptyPlaceholder || !e.target.value.trim())
    }

    const formData = new FormData();
    formData.append("excelfile", image);
    formData.append("userName", userName);

    const editPhoto = async (e) => {
        e.preventDefault();
        const res = await editProfilephoto(image, userName);
        console.log("res", res)
        setImage('');
        setUserName('');
        setFake(!fake);
        setOpen(false)
    }

    useEffect(() => {
        getUser();
    }, [fake])

    console.log("user", user)

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
        '& .css-1ykji91-MuiTableCell-root, .css-kj35q1-MuiTableCell-root, .css-1pccs7r-MuiTableCell-root, .css-1yaqje6-MuiTableCell-root': {
            borderBottom: 0
        },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '8px'
    }));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
        elevation: 2,
    };

    console.log("userName", userName)

    return (
        <Box display="flex" flexDirection={{ md: 'row', sm: 'column', xs: 'column' }} minHeight={{ md: '80.7vh', sm: '86vh' }}>
            <Grid container md={3} sm={12} xs={12} p={{ md: 3, sm: 4, xs: 4 }} display="flex" flexDirection='column' gap={2} alignItems='center' justifyContent='center'
                sx={{ backgroundColor: 'secondary.main', }}>
                <Avatar
                    src={Apiconfig.url + user?.profilePath}
                    sx={{
                        width: 200,
                        height: 200,
                    }} />
                <Typography fontWeight='bold'>
                    {user?.userName}
                </Typography>
                <Button variant="contained" endIcon={<EditIcon />} onClick={handleOpen}>
                    Update
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Grid item display='flex' gap={2} flexDirection='column'>
                            <Typography>
                                Update Profile
                            </Typography>
                            <TextField
                                fullWidth
                                label="Update Profile Photo"
                                type='file'
                                InputLabelProps={{ shrink: true }}
                                onChange={handleFileChange}
                                helperText="Image should be in .jpeg, .jpg or .png"
                            />
                            <TextField
                                value={userName}
                                onChange={handleNameChange}
                                fullWidth
                                label="Update Username"
                            />
                        </Grid>
                        <Grid display="flex" justifyContent='flex-end' mt={2} gap={2}>
                            <Button variant="outlined" color='error'onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" sx={{ backgroundColor: 'secondary.main' }} disabled={disableSave} onClick={editPhoto}>
                                Save
                            </Button>
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
            <Grid container md={9} sm={12} xs={12} p={{ md: 6, sm: 4, xs: 2 }} pb={{ xs: '85px', sm: 0 }}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <Grid display="flex" flexDirection="row" justifyContent='space-between' width="50%">
                                <TableCell>Name</TableCell>
                                <TableCell>:</TableCell>
                            </Grid>
                            <TableCell sx={{ fontWeight: 'bold' }}>{user?.name}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <Grid display="flex" flexDirection="row" justifyContent='space-between' width="50%">
                                <TableCell>Username</TableCell>
                                <TableCell>:</TableCell>
                            </Grid>
                            <TableCell sx={{ fontWeight: 'bold' }}>{user?.userName}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <Grid display="flex" flexDirection="row" justifyContent='space-between' width="50%">
                                <TableCell>Email</TableCell>
                                <TableCell>:</TableCell>
                            </Grid>
                            <TableCell sx={{ fontWeight: 'bold' }}>{user?.email}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <Grid display="flex" flexDirection="row" justifyContent='space-between' width="50%">
                                <TableCell>Role</TableCell>
                                <TableCell>:</TableCell>
                            </Grid>
                            <TableCell sx={{ fontWeight: 'bold' }}>{user?.role}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <Grid display="flex" flexDirection="row" justifyContent='space-between' width="50%">
                                <TableCell>Major Category</TableCell>
                                <TableCell>:</TableCell>
                            </Grid>
                            <TableCell sx={{ fontWeight: 'bold' }}>{user?.majorCategory}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <Grid display="flex" flexDirection="row" justifyContent='space-between' width="50%">
                                <TableCell>Sub Category</TableCell>
                                <TableCell>:</TableCell>
                            </Grid>
                            <TableCell sx={{ fontWeight: 'bold' }}>{user?.subCategory}</TableCell>
                        </StyledTableRow>
                        {user?.role === 'student' ?
                            <StyledTableRow>
                                <Grid display="flex" flexDirection="row" justifyContent='space-between' width="50%">
                                    <TableCell>Enrolled Courses</TableCell>
                                    <TableCell>:</TableCell>
                                </Grid>
                                <TableCell sx={{ fontWeight: 'bold' }}>{user?.enrolledCourses?.length}</TableCell>
                            </StyledTableRow>
                            : ''}
                    </TableBody>
                </Table>
            </Grid>
        </Box>

    )
}