import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import ApiConfig from '../config/ApiConfig';
import { store } from '../store';

const token = localStorage.getItem('token');

export const getConversation = async (id) => {
    try {
        const res = await Axios.get(`${ApiConfig.chat.getConversation}/${id}`, {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getGroup = async (id) => {
    try {
        const res = await Axios.get(`${ApiConfig.chat.getGroups}/${id}`, {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getMessage = async (id) => {
    try {
        const res = await Axios.get(`${ApiConfig.chat.getMessages}/${id}`, {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const postMessage = async (message) => {
    try {
        const res = await Axios.post(
            `${ApiConfig.chat.postMessages}`,
            message,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res;
    } catch (err) {
        console.log('err', err);
        // toast.error("")
    }
};

export const userSearch = async (value) => {
    try {
        const res = await Axios.get(`${ApiConfig.chat.searchUser}/${value}`, {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (err) {
        console.log('err', err);
    }
};

export const getAlreadyInConversationChat = async (senderId, receiverId) => {
    console.log('sender receiver', senderId, receiverId);
    try {
        const res = await Axios.get(
            `${ApiConfig.chat.alreadyConvo}/${senderId}/${receiverId}`,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res;
    } catch (err) {
        console.log('err', err);
    }
};

export const postConversations = async (
    sender,
    receiver,
    senderId,
    receiverId
) => {
    try {
        const response = await Axios.post(
            `${ApiConfig.chat.postConversations}`,
            {
                sender,
                receiver,
                senderId,
                receiverId
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};
