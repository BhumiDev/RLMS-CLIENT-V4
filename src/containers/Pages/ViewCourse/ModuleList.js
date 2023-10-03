import {
    Box,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Typography,
    useTheme,
    Chip
} from '@mui/material';
import PropTypes from 'prop-types';
import { CheckCircle } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { formatDuration } from '../AdminDashboard/Main';

const Module = ({
    authorId,
    courseId,
    moduleData,
    fromMyCourse,
    serialNumber,
    handleSectionDelete,
    open2,
    setOpen2,
    id,
    courseCategory
}) => {
    let token = localStorage.getItem('token');
    let user = token && jwtDecode(token);

    const handleClickOpen = (id) => {
        setOpen2(id);
    };

    const handleClose = () => {
        setOpen2(null);
    };

    const theme = useTheme();

    const modulelength = moduleData.lectures.reduce(
        (length, m) => length + m.length,
        0
    );

    return (
        <Grid container sx={{ py: 2 }}>
            {!moduleData && (
                <Grid item xs={1}>
                    <CheckCircle />
                </Grid>
            )}

            <Grid item xs={11} md={9}>
                <Link
                    key={moduleData._id}
                    to={{
                        pathname: '/dashboard/courses/view-module',
                        data: moduleData
                    }}
                    state={
                        fromMyCourse === 'myCourse'
                            ? {
                                  id: moduleData._id,
                                  noAccess: true,
                                  courseId: courseId,
                                  authorId: authorId,
                                  courseCategory
                              }
                            : {
                                  id: moduleData._id,
                                  noAccess: false,
                                  courseId: courseId,
                                  authorId: authorId
                              }
                    }
                >
                    <Box display="flex" color="text.primary" gap={2}>
                        {serialNumber}.
                        <Typography
                            variant="body1"
                            sx={{
                                [theme.breakpoints.down('sm')]: {
                                    textAlign: 'end'
                                },
                                ml: 2
                            }}
                        >
                            {moduleData.title}
                        </Typography>
                        {modulelength &&
                        modulelength !== 0 &&
                        modulelength !== '0 Hours' ? (
                            <Chip label={formatDuration(modulelength)} />
                        ) : (
                            ''
                        )}
                    </Box>
                </Link>
            </Grid>
            {!moduleData ? (
                <>
                    {' '}
                    <Grid
                        item
                        sx={{
                            [theme.breakpoints.down('sm')]: {
                                textAlign: 'end'
                            }
                        }}
                        xs={12}
                        md={3}
                    >
                        12 out of 24
                    </Grid>
                    {moduleData && (
                        <Grid
                            item
                            md={2}
                            sx={{
                                [theme.breakpoints.down('sm')]: {
                                    display: 'none'
                                }
                            }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                // variant="contained"
                                // aria-label="outlined primary button group"
                            >
                                <Button variant="text" color="secondary">
                                    Restart
                                </Button>
                                <Button variant="outlined" color="secondary">
                                    Continue
                                </Button>
                            </Box>
                        </Grid>
                    )}
                </>
            ) : (
                <Grid item md={3}>
                    <Box display="flex" alignItems="center" gap={2} mr={0}>
                        <Typography variant="body1">
                            {moduleData?.lectures?.length} Lessons
                        </Typography>
                        {user?.role === 'instructor' && (
                            <>
                                <Box sx={{ marginLeft: '5px' }}>
                                    {user?.role === 'instructor' && (
                                        <Button
                                            onClick={() => handleClickOpen(id)}
                                        >
                                            <DeleteIcon color="secondary" />
                                        </Button>
                                    )}

                                    <Dialog
                                        open={open2 == id}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are You you want to delete this
                                                section?
                                            </DialogContentText>
                                        </DialogContent>

                                        <DialogActions>
                                            <Button onClick={handleClose}>
                                                cancel
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleSectionDelete(
                                                        moduleData?._id
                                                    )
                                                }
                                                autoFocus
                                            >
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                            </>
                        )}

                        {/* <Button
                            sx={{ marginLeft: '5px' }}
                            onClick={() => handleSectionDelete(moduleData?._id)}
                        >
                            <DeleteIcon />
                        </Button> */}
                    </Box>
                </Grid>
            )}
        </Grid>
    );
};

Module.propTypes = {
    fromMyCourse: PropTypes.bool.isRequired
    // id: PropTypes.string.isRequired
};

export default Module;
