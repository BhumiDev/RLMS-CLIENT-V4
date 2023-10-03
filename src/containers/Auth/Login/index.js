import { useState } from 'react';
import {
    Button,
    Typography,
    TextField,
    Box,
    IconButton,
    InputAdornment,
    Card,
    CardContent
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useTheme from '@mui/material/styles/useTheme';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from './actions';
import { store } from '../../../store';
import { yearsToMonths } from 'date-fns';

const loginSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    userId: Yup.string().required('Required')
});

const Login = () => {
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const theme = useTheme();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userId: '',
            password: ''
        },
        validationSchema: loginSchema,
        // onSubmit: (values) => {
        //     console.log('boooooom haha', values);
        //     setLoading(true);
        //     if (response.success === 'true') {
        //         store.dispatch(login(values, setLoading, navigate, toast));
        //     } else {
        //         toast.error('Incorrect userId or password');
        //         setLoading(false);
        //     }
        // }
        onSubmit: (values) => {
            setLoading(true);
            store.dispatch(
                login(values, setLoading, navigate, location, toast)
            );
        }
    });

    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{
                [theme.breakpoints.up('md')]: {
                    width: '60%'
                }
            }}
            color="primary"
        >
            <Card sx={{ width: '100%' }}>
                {/* mx={{ xs: 4, md: 9 }} */}
                <Box px={{ xs: 2, md: 5 }}>
                    <CardContent sx={{ pt: 10 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                textAlign: 'center',
                                fontSize: '28px !important'
                            }}
                        >
                            Login Into Your R-PXP Account!
                        </Typography>
                        <Box mt={4}>
                            <form onSubmit={formik.handleSubmit}>
                                <Box mb={3}>
                                    <TextField
                                        name="userId"
                                        variant="outlined"
                                        label="User Id"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        value={formik.values.userId}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.userId &&
                                            Boolean(formik.errors.userId)
                                        }
                                        helperText={
                                            formik.touched.userId &&
                                            formik.errors.userId
                                        }
                                    />
                                </Box>

                                <Box mb={1}>
                                    <TextField
                                        name="password"
                                        label="Password"
                                        variant="outlined"
                                        size="small"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        fullWidth
                                        color="secondary"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.password &&
                                            Boolean(formik.errors.password)
                                        }
                                        helperText={
                                            formik.touched.password &&
                                            formik.errors.password
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
                                <Box textAlign="end">
                                    <Link to="/forgot-password">
                                        <Typography
                                            variant="body"
                                            color="secondary.main"
                                        >
                                            Forgot Password?
                                        </Typography>
                                    </Link>
                                </Box>

                                <Box textAlign="center" mt={15}>
                                    {' '}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        sx={{ width: '176px' }}
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
                                        Login
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
            <ToastContainer />
        </Box>
    );
};
// Login.propTypes = {
//     dispatch: PropTypes.func.isRequired
// };

export default Login;
