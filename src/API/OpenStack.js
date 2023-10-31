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
export const getAllFlavours = async () => {
    console.log('Get all images called');
    const response = await Axios.get(ApiConfig.openStack.getAllFlavours);
    return response;
};

export const createMachine = async (data, dispatch) => {
    //   dispatch(setCurrentScreenLoading(true));
    console.log('data to create machine', data);

    const createGameResponse = await Axios.post(
        `${ApiConfig.openStack.createInstance}`,
        {
            instance_name: data?.name,
            instance_image_id: data?.imageId,
            instance_flavor_id: data?.flavourId,
            instance_network_id: data?.networkId
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    console.log('response of create game', createGameResponse);

    const gameId = createGameResponse?.data?.instance_id;
    const getConsoleUrl = await Axios.get(
        `${ApiConfig.openStack.getConsoleUrl}${gameId}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    console.log('response of get console url', getConsoleUrl);
    return getConsoleUrl?.data;
};

export const deleteMachine = async (id) => {
    const response = await Axios.delete(
        `${ApiConfig.openStack.deleteInstance}${id}`
    );
    console.log('del res', response);
    return response;
};
