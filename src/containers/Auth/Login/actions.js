import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import authActions from './constants';
import ApiConfig from '../../../config/ApiConfig';
import { store } from '../../../store';
import { createAttendance } from '../../../API/Attendance';

export function startLogin() {
    return {
        type: authActions.LOGIN_START
    };
}
export function LoginSuccess(user, id) {
    console.log('success login user', user);
    console.log('attendanceId', id);
    return {
        type: authActions.LOGIN_SUCCESS,

        user,
        attendanceId: id
    };
}
export function LoginFailed(errorMessage) {
    return {
        type: authActions.LOGIN_FAILURE,
        error: errorMessage
    };
}

export const login = (
    values,
    setLoading,
    navigate,
    location,
    toast,
    handleLoginError
) => {
    console.log('calling api');
    console.log('values', values);
    return async () => {
        try {
            store.dispatch(startLogin());
            const response = await Axios.post(ApiConfig.auth.login, values);
            setLoading(false);
            console.log('login success', response);

            if (!response.data.success) {
                toast.error(response.data.error);
                handleLoginError(); // Call the new error handler
            }
            localStorage.setItem('token', response.data.data.token);
            const user =
                response?.data?.data.token &&
                jwt_decode(response?.data?.data.token);
            if (user?.role === 'student') {
                const attendanceResponse = await createAttendance(
                    response.data.data.token
                );
                console.log('res of attendance', attendanceResponse);
                localStorage.setItem('attendanceId', attendanceResponse?._id);
                store.dispatch(LoginSuccess(user, attendanceResponse?._id));
            } else {
                store.dispatch(LoginSuccess(user));
            }

            console.log('decoded user', user);

            if (location?.state?.from) {
                navigate(location?.state?.from);
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.log('error', error);
            setLoading(false);
            toast.error(error.response.data.errors[0].msg);
            handleLoginError(); // Call the new error handler
        }

        // console.log(response);
        // toast.error(response.data.message);
        // store.dispatch(LoginFailed(response.data.message));

        //   localStorage.setItem("token", response.data.data.token);
        <ToastContainer />;
    };
};
