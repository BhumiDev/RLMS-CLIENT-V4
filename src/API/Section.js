import Axios from 'axios';
import ApiConfig from '../config/ApiConfig';

export const getIndividalSection = async (sectionId) => {
    const token = localStorage.getItem('token');
    const response = await Axios.get(
        `${ApiConfig.section.getIndividalSection}/${sectionId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('response of individualSection', response.data.data);
    return response.data.data.title;
};
