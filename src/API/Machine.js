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
