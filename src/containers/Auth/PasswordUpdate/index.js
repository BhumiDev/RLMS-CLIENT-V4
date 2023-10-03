import { useState } from 'react';
import {
    Button,
    Typography,
    TextField,
    Box,
    IconButton,
    InputAdornment,
    Checkbox
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../Login/actions';
import { store } from '../../../store';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { resetPassword } from '../../../API/password';

const loginSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmNewPassword: Yup.string('confirm  new password')
        .min(8, 'Password should be of minimum 8 characters length')
        .oneOf([Yup.ref('newPassword'), null], "Passwords don't match!")
        .required('Password is required')
});

const PasswordUpdate = () => {
    const { resetPasswordToken } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [checked, setChecked] = useState(false);
    console.log('reset token', resetPasswordToken);
    const handleClickOpen = () => {
        // setOpen(true);
    };
    const [isDisabled, setIsdisabled] = useState(true);
    const navigate = useNavigate();
    const handleChecked = () => {
        setIsdisabled(!isDisabled);
        setChecked(!checked);
    };
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmNewPassword: ''
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log('values of password and confirm password', values);
            resetPassword(values, toast, resetPasswordToken, navigate);
        }
    });

    return (
        <Box
            display="flex"
            justifyContent="c
            enter"
            alignItems="center"
            flexDirection="column"
            width="50%"
            color="primary"
        >
            <Box>
                <Typography
                    component="h2"
                    variant="h2"
                    className="auth-heading"
                >
                    Change Password
                </Typography>
                <Box mt={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <Box mb={2}>
                            <Typography variant="body">
                                New Passsword
                            </Typography>
                            <TextField
                                name="newPassword"
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="secondary"
                                //  value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="enter new password"
                                error={
                                    formik.touched.newPassword &&
                                    Boolean(formik.errors.newPassword)
                                }
                                helperText={
                                    formik.touched.newPassword &&
                                    formik.errors.newPassword
                                }
                            />
                        </Box>
                        <Box mb={1}>
                            <Typography variant="body">
                                {' '}
                                Confirm New Password
                            </Typography>
                            <TextField
                                name="confirmNewPassword"
                                variant="outlined"
                                size="small"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                color="secondary"
                                //  value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="confirm new password"
                                error={
                                    formik.touched.confirmNewPassword &&
                                    Boolean(formik.errors.confirmNewPassword)
                                }
                                helperText={
                                    formik.touched.confirmNewPassword &&
                                    formik.errors.confirmNewPassword
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon className="visibility-icon" />
                                                ) : (
                                                    <VisibilityOffIcon className="visibility-icon" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />{' '}
                        </Box>

                        <Box textAlign="end" mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {isLoading && (
                                    <CircularProgress
                                        size={20}
                                        sx={{
                                            marginRight: '6px',
                                            color: '#ffff'
                                        }}
                                    />
                                )}{' '}
                                SUBMIT
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
};
// Login.propTypes = {
//     dispatch: PropTypes.func.isRequired
// };

export default PasswordUpdate;
