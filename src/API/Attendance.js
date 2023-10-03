import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import ApiConfig from '../config/ApiConfig';
import { store } from '../store';

const token = localStorage.getItem('token');

export const createAttendance = async (token) => {
    try {
        const response = await Axios.post(
            `${ApiConfig.attendance.create}`,
            {},
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const updateAttendance = async (id) => {
    try {
        const response = await Axios.post(
            `${ApiConfig.attendance.update}/${id}`,
            {},
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const getAttendances = async () => {
    try {
        const response = await Axios.get(
            `${ApiConfig.attendance.getAttendance}`,
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const getOverAllAttendance = async () => {
    try {
        const response = await Axios.get(
            `${ApiConfig.attendance.getOverAllAttendance}`,
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};
