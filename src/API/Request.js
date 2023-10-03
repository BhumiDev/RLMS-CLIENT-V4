import Axios from 'axios';

import ApiConfig from '../config/ApiConfig';

export const sendRequest = async (id) => {
    const token = localStorage.getItem('token');

    const response = await Axios.post(
        `${ApiConfig.request.send}/${id}`,
        {},
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('response of create request=', response);
};
export const findAllRequestOfInstructor = async () => {
    const token = localStorage.getItem('token');

    const response = await Axios.get(`${ApiConfig.request.findAllRequest}`, {
        headers: {
            Accept: '/',
            Authorization: `Bearer ${token}`
        }
    });
    console.log('response of getAll Instructor', response.data);
    return response.data.data;
};

export const acceptRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        `${ApiConfig.request.acceptRequest}/${requestId}`,
        {},
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('RESponse of accept Request', response);
};

export const declineRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        `${ApiConfig.request.declineRequest}/${requestId}`,
        {},
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const checkAlreadyRequested = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await Axios.post(
            `${ApiConfig.request.checkAlreadyRequested}/${id}`,
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
