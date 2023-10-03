import ApiConfig from '../config/ApiConfig';
import { store } from '../store';
import Axios from 'axios';

const token = localStorage.getItem('token');

export const forgetPassword = async (values, toast) => {
    console.log('in forget password', values);

    const response = await Axios.post(
        `${ApiConfig.password.forgetPassword}`,
        values
    );
    console.log('response of forget password', response);
    if (response.data.success === true) {
        toast.success('email sent Successfully');
    }
};

export const resetPassword = async (
    values,
    toast,
    resetPasswordToken,
    navigate
) => {
    console.log(
        'resetpwdtoken and all',
        values,

        resetPasswordToken
    );
    let response = await Axios.post(
        `${ApiConfig.password.resetPassword}/${resetPasswordToken}`,
        values
    );

    console.log('response of reset  Password', response);
    if (response.data.success === true) {
        toast.success('password changed successsfully!');
        navigate('/');
    }
};
