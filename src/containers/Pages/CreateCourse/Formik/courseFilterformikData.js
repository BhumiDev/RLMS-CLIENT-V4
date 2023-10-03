import * as yup from 'yup';

export const validationSchema = yup.object({
    majorCategory: yup.string('Enter valid category'),
    subCategory: yup.string('Enter valid category')
});

export const initialValues = {
    majorCategory: '',
    subCategory: ''
};
