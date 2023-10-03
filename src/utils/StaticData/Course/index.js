import Axios from 'axios';
import Apiconfig from '../../../config/ApiConfig';

let token = localStorage.getItem('token');

export const createSubCategory = async (formData, majorId, setOpen) => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    const response = await Axios.post(
        `${Apiconfig.subCategory.createCategory}/${majorId}`,
        formData,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('Sub category Created', response.data);
    setOpen(false);
    return response.data.data;
};

export const getSubCategoriesById = async (majorId) => {
    const response = await Axios.get(
        `${Apiconfig.subCategory.getSubCategoriesById}/${majorId}`
    );
    console.log('Subcats Fetched', response.data);
    return response.data.data;
};
export const getAllCategories = async () => {
    const response = await Axios.get(Apiconfig.category.getAllCategories);
    console.log('response', response.data.data);
    return response.data.data;
};

export const getCourseByMajorCategory = async (majorCategory) => {
    console.log('major cat in front end', majorCategory);
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        Apiconfig.course.getCourseByMajorCategory,
        { majorCategory },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('getCourseByMajorCategory response', response.data.data);
    return response.data.data;
};

export const getCourseBySubCategory = async () => {
    const token = localStorage.getItem('token');
    const response = await Axios.get(Apiconfig.course.getCourseBySubCategory, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log('getCourseBySubCategory response', response);
    return response;
};
