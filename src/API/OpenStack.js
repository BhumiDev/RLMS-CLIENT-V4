import Axios from 'axios';
import ApiConfig from '../config/ApiConfig';
import { setCurrentScreenLoading } from '../containers/Pages/CreateCourse/Slices/currentScreen';

export const getAllNetworks = async () => {
    console.log('Get all networks called');
    const response = await Axios.get(ApiConfig.openStack.getAllNetworks);
    return response;
};
export const getAllImages = async () => {
    console.log('Get all images called');
    const response = await Axios.get(ApiConfig.openStack.getAllImages);
    return response;
};

export const createMachine = async (data, dispatch) => {
    dispatch(setCurrentScreenLoading(true));
    console.log('data to create machine', data);
    const response = await Axios.post(`${ApiConfig.openStack.createMachine}`, {
        name: data.name,
        image_id: data.imageId,
        flavor_id: data.flavourId,
        networks: data.networkId,
        password: data.password,
        time: data.time
    });
    console.log('Response of create lab in view course', response);

    const response2 = await Axios.get(
        `${ApiConfig.openStack.createMachine}${response.data.id}`
    );
    console.log('response of start', response2.data[0].id);
    const url = response2.data[0].console_url;
    const responseId = response2.data[0].id;
    // window.open(url, '_blank')
    dispatch(setCurrentScreenLoading(false));
    // navigate('/dashboard/lab', { state: { url, id: responseId } });
    console.log('Response 2 of create machine', response2);
    return response2;
};

export const deleteMachine = async (id) => {
    const response = await Axios.delete(
        `${ApiConfig.openStack.createMachine}${id}`
    );
    console.log('del res', response);
    return response;
};
