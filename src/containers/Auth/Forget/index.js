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
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../Login/actions';
import { store } from '../../../store';
import { valuesIn } from 'lodash';
import { forgetPassword } from '../../../API/password';

const loginSchema = Yup.object().shape({
    // password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required')
});

// const handleSubmit=()=>{
//     console.log("arshh reset pa")

// }

const ForgotPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const [isDisabled, setIsdisabled] = useState(true);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log('hiiiiiiiii', values.email);
            forgetPassword(values, toast);
            console.log('forget passss');
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
                    Forgot Password
                </Typography>
                <Box mt={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <Box mb={2}>
                            <Typography variant="body">Email</Typography>
                            <TextField
                                name="email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="secondary"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                                placeholder="enter your registered email"
                            />
                        </Box>

                        <Box textAlign="end" mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                // onClick={handleSubmit}
                            >
                                {isLoading && (
                                    <CircularProgress
                                        size={20}
                                        sx={{
                                            marginRight: '6px',
                                            color: '#ffff'
                                        }}
                                    />
                                )}
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

export default ForgotPage;
