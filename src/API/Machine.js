import Axios from 'axios';
import ApiConfig from '../config/ApiConfig';

export const createMachine = async (courseId, data) => {
    const response = await Axios.post(
        `${ApiConfig.machine.createMachine}/${courseId}`,
        data
    );
    return response.data;
};

export const deleteMachine = async (machineId) => {
    const response = await Axios.delete(
        `${ApiConfig.machine.deleteMachine}/${machineId}`
    );
    return response.data;
};

export const getAllMachines = async () => {
    const response = await Axios.get(
        'http://124.123.17.12:7000/api/ctf/game/list/',
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    console.log('response of get all machines', response?.data);
    return response?.data;
};
