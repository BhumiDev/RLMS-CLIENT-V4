import * as yup from 'yup';

export const validationSchema = yup.object({
    title: yup
        .string('Enter valid lesson name')
        .required('Lesson Name is required'),
    description: yup
        .string('Enter valid description')
        .required('Description  is required'),
    video: yup.string('Enter valid file'),
    resourceTitle: yup.string('Enter valid category'),
    externalLink: yup.string('Enter valid link')
    // .required('Resource title is required')
});

export const initialValues = {
    title: '',
    description: '',
    video: '',
    resourceTitle: '',
    externalLink: ''
};
