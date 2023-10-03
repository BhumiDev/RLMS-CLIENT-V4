import * as yup from 'yup';

export const validationSchema = yup.object({
    courseName: yup
        .string('Enter valid course name')
        .required('Course Name is required'),
    thumbnail: yup.string('Enter valid file'),
    majorCategory: yup
        .string('Enter valid category')
        .required('Course Category is required'),
    subCategory: yup
        .string('Enter valid category')
        .required('Sub Category is required'),
    description: yup
        .string('Enter valid category')
        .required('Course Description is required'),
    courseCode: yup
        .string('Enter valid category')
        .required('Course Code is required')
});

export const initialValues = {
    courseName: '',
    thumbnail: '',
    majorCategory: '',
    subCategory: '',
    description: '',
    courseCode: ''
};
