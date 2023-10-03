import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { createContext, useState, useContext } from 'react';
import { io } from 'socket.io-client';

const token = localStorage.getItem('token');
const user = token && jwtDecode(token);

export const currentChatContext = createContext({});

// if (user) {
//     export const socket = io('ws://localhost:8900');
// }

export const CurrentChatProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState(null);
    const [socket, setSocket] = useState();
    return (
        <currentChatContext.Provider
            value={{ currentChat, setCurrentChat, socket, setSocket }}
        >
            {children}
        </currentChatContext.Provider>
    );
};

export const useCurrentChatContext = () => {
    const { currentChat, setCurrentChat, socket, setSocket } =
        useContext(currentChatContext);
    return {
        currentChat,
        setCurrentChat,
        socket,
        setSocket
    };
};
