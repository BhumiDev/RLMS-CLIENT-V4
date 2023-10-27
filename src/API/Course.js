// import Axios from 'axios';
// import ApiConfig from '../config/ApiConfig';
// import { store } from '../store';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {
//     CreateCourseId,
//     CreateLessonId
// } from '../containers/Pages/CreateCourse/actions';

// let token = localStorage.getItem('token');

// export const createCourse = async (formData, setNiku) => {
//     console.log('nik', setNiku);
//     token = localStorage.getItem('token');
//     console.log('Token', token);
//     const response = await Axios.post(ApiConfig.course.createCourse, formData, {
//         headers: {
//             Accept: '/',
//             Authorization: `Bearer ${token}`
//         }
//     });

//     console.log('course Created', response.data);
//     store.dispatch(CreateCourseId(response.data.data._id));
//     return response.data.data._id;
// };

// export const uploadThumbnail = async (thumbnail, navigate, courseId) => {
//     console.log('Course ID boom', courseId);
//     console.log('Thumbnail', thumbnail);

//     const data = new FormData();
//     data.append('thumbnail', thumbnail);
//     // console.log('new formdata', data);
//     // console.log('token=====', token);
//     // console.log('api', ApiConfig.course.uploadCourseContent);

//     const response = await Axios.put(
//         `${ApiConfig.course.uploadCourseContent}/${courseId}`,
//         data,
//         {
//             headers: {
//                 Accept: '*',
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     );
//     console.log('RESPONSE=', response);
//     if (response.data.success) {
//         navigate('/dashboard/ourses/create-lesson');
//     } else {
//         alert('cant create course');
//     }
// };

import Axios from 'axios';
import ApiConfig from '../config/ApiConfig';
import { store } from '../store';

import { getCurrentCourse } from '../containers/Pages/CreateCourse/Slices/currentCourse';
import {
    CreateCourseIdsetCurrentScreenLoading,
    setCurrentScreenLoading,
    setCurrentScreenName,
    setCurrentScreenState,
    setShowAddButtons
} from '../containers/Pages/CreateCourse/Slices/currentScreen';
// CreateLessonId
// } from '../containers/Pages/CreateCourse/actions';
import { set } from 'lodash';
import { setColumnsState } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils';
import Apiconfig from '../config/ApiConfig';

let token = localStorage.getItem('token');
export const getAllCourses = async () => {
    const token = localStorage.getItem('token');
    let user = token && jwtDecode(token);

    const response = await Axios.get(`${ApiConfig.course.getAllCourse}`, {
        headers: {
            Accept: '/',
            Authorization: `Bearer ${token}`
        }
    });

    // console.log('RESPONSE OF GET ALL COURSE', response);
    return response.data.data;
};

export const createCourse = async (
    formData,
    setCourseId,
    toggleUpdate,
    navigate,
    thumbnail
) => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    if (thumbnail === '' || thumbnail === null) {
        toast.error('cannot create course');
    } else {
        const response = await Axios.post(
            ApiConfig.course.createCourse,
            formData,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('course Created', response.data);
        await uploadThumbnail(
            thumbnail,
            store.dispatch,
            response.data.data._id
        );
        toast.success('Course overview created successfully!');
        localStorage.setItem('courseId', response.data.data._id);
        store.dispatch(getCurrentCourse(response.data.data));
        store.dispatch(setShowAddButtons(false));
        store.dispatch(setCurrentScreenName('manual'));
        store.dispatch(setCurrentScreenState(false));
        // setOverview(false);
        const id = response.data.data._id;
        // debugger;
        navigate(`/dashboard/courses/edit-course/${id}`);
        return response.data.data._id;
    }
};
export const editCourse = async (formData, courseId) => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    const response = await Axios.put(
        `${ApiConfig.course.editCourse}/${courseId}`,
        formData,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    store.dispatch(setCurrentScreenName('manual'));
    console.log('course Edited', response.data);
    // store.dispatch(CreateCourseId(response.data.data._id));
    return response.data.data._id;
};

export const instructorRecentCourses = async () => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    const response = await Axios.get(ApiConfig.course.instructorRecentCourses, {
        headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`
        }
    });

    const recentCourses = response.data.data;
    return recentCourses;
};

export const instructorCourses = async () => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    const response = await Axios.get(ApiConfig.course.instructorCourses, {
        headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`
        }
    });

    const Courses = response.data.data;
    return Courses;
};

export const studentCategory = async () => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    const response = await Axios.get(ApiConfig.category.getAllCategories, {
        headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`
        }
    });

    const Courses = response.data.data;
    return Courses;
};

export const getStudentByCategory = async (category) => {
    console.log('category', category);
    token = localStorage.getItem('token');
    console.log('Token', token);
    const response = await Axios.post(
        ApiConfig.users.getUsersByCategory,
        { category },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );

    const Courses = response.data.data;
    return Courses;
};

export const uploadThumbnail = async (thumbnail, dispatch, courseId) => {
    console.log('Course ID boom', courseId);
    console.log('Thumbnail', thumbnail);

    const data = new FormData();
    data.append('thumbnail', thumbnail);
    console.log('new formdata', data);
    console.log('token=====', token);
    console.log('api', ApiConfig.course.uploadCourseContent);

    const response = await Axios.put(
        `${ApiConfig.course.uploadCourseContent}/${courseId}`,
        data,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('RESPONSE=', response);
    if (response.data.success === true) {
        console.log('toast1');
        toast.success(response.data.message);
    } else {
        alert('cant create course');
    }
};

export const myCoursesOfStudent = async (setData, setIsloading) => {
    const token = localStorage.getItem('token');
    console.log('inside my course of student');
    let user = token && jwtDecode(token);

    console.log('Token', token);
    const response = await Axios.get(`${ApiConfig.course.myCourses}`, {
        headers: {
            Accept: '/',
            Authorization: `Bearer ${token}`
        }
    });
    setIsloading(false);
    console.log('my couse api data of student', response.data);
    let arr = response.data.data;
    let filteredArray = arr.filter((item) => item.isDeleted === false);
    console.log('FILTERED ARRAY,', filteredArray);
    setData(filteredArray);
};

// export const myCourses = async (setData, setIsloading) => {
//     const token = localStorage.getItem('token');
//     let user = token && jwtDecode(token);

//     console.log('Token', token);
//     const response = await Axios.get(
//         `${ApiConfig.course.coursesWithFormat}/${user?._id}`,
//         {
//             headers: {
//                 Accept: '/',
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     );

//     setIsloading(false);
//     console.log('my couse api data of student with format', response);
//     let arr = response.data.studentEnrollCourses;

//     setData(arr);
// };

export const myCourses = async (setData, page, setCount, setIsloading) => {
    const token = localStorage.getItem('token');
    // console.log('inside my course of student');
    let user = token && jwtDecode(token);

    console.log('Token', token);
    const response = await Axios.get(
        `${ApiConfig.course.studentCoursePagination}?page=${page}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('my couse api data of student with format', response.data);
    // let arr = response.data.studentEnrollCourses;

    setData(response.data.data);
    setCount(response.data.total_pages);
    setIsloading(false);
};

export const myCoursesofInstructor = async (
    setData,
    page,
    setCount,
    setIsloading
) => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    let user = token && jwtDecode(token);
    console.log('User in local storage', user);
    const response = await Axios.get(
        `${ApiConfig.course.allCoursesofInstructor}/${user._id}?page=${page}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    setIsloading(false);
    console.log('my couse api data of instructor', response.data);
    let arr = response.data.data;
    let filteredArray = arr.filter((item) => item.isDeleted === false);
    console.log('FILTERED ARRAY,', filteredArray);
    setCount(response.data.total_pages);
    setData(filteredArray);
};

export const getRecentCourses = async () => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    const response = await Axios.get(ApiConfig.course.getRecentCourses, {
        headers: {
            Accept: '/',
            Authorization: `Bearer ${token}`
        }
    });
    console.log('response recently studiedCourse', response);
    return response;
};
export const addToRecent = async (courseId) => {
    console.log('courseId for add to recent', courseId);
    token = localStorage.getItem('token');
    // console.log('Token', token);
    const response = await Axios.get(
        `${ApiConfig.course.addToRecent}/${courseId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('response of add to recent', response);
};

export const createQuestion = async (formData, sectionId) => {
    store.dispatch(setCurrentScreenLoading(true));
    console.log('again', formData, sectionId);
    token = localStorage.getItem('token');
    console.log('Token', token);
    console.log('address', ApiConfig.section.createQuestion);
    const response = await Axios.post(
        `${ApiConfig.section.createQuestion}/${sectionId}`,
        formData,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    store.dispatch(setCurrentScreenLoading(false));
};
export const getAnswer = async (answer, questionId, courseId) => {
    token = localStorage.getItem('token');
    console.log('Token', token);
    const response = await Axios.post(
        `${ApiConfig.section.getAnswer}/${questionId}/${courseId}`,
        {
            ans: answer
        },
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('response of getAnswer', response);
    return response;
};

export const searchCourse = async (key) => {
    const token = localStorage.getItem('token');
    console.log('inside search course');

    console.log('Token', token);
    const response = await Axios.get(
        `${ApiConfig.course.searchCourse}/${key}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('response of search course', response);

    return response.data.data;
};

export const addToRecentlyDeleted = async (courseId, navigate, toast) => {
    const token = localStorage.getItem('token');
    let response = await Axios.post(
        `${ApiConfig.course.addToRecentlyDeleted}/${courseId}`,
        {},
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('response of recently deleted', response);
    if (response.data.success) {
        toast.success('course deleted successfully');
        setTimeout(() => {
            navigate('/dashboard/courses/my-courses');
        }, 5000);
    }
};

export const getRecentlyDeletedCourses = async () => {
    const token = localStorage.getItem('token');
    let response = await Axios.get(ApiConfig.course.getRecentlyDeletedCourses, {
        headers: {
            Accept: '/',
            Authorization: `Bearer ${token}`
        }
    });

    console.log('REsponse', response);
    return response;
};

export const recoverCourse = async (courseId, navigate, toast) => {
    console.log('COURSEid', courseId);
    const token = localStorage.getItem('token');

    let response = await Axios.get(
        `${ApiConfig.course.recoverCourse}/${courseId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('REsponse', response);
    if (response.data.success) {
        toast.success('course recovered successfully');
        setTimeout(() => {
            navigate('/dashboard/courses/my-courses');
        }, 5000);
    }
};

export const getIndividualCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    console.log('Token', token);
    const response = await Axios.get(
        `${ApiConfig.course.getCourse}/${courseId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('response of Get individual course api', response.data.data);
    return response.data.data;
};

export const deleteCourse = async (courseId, navigate, toast) => {
    const token = localStorage.getItem('token');
    console.log('inside delete course');

    console.log('Token', token);
    const response = await Axios.delete(
        `${ApiConfig.course.deleteCourse}/${courseId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('response of delete course api', response.data.success);
    if (response.data.success) {
        toast.success('course deleted successfully');
        setTimeout(() => {
            navigate('/dashboard/courses/my-courses');
        }, 5000);
    }
};
export const test = async (name, video) => {
    console.log('FORM KA DATA', name, video);
    const data = new FormData();
    data.append('thumbnail', video);
    data.append('name', name);
    const token = localStorage.getItem('token');
    let courseId = 123;

    let response = await Axios.put(
        `${ApiConfig.course.uploadCourseContent}/${courseId}`,
        data,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('RESPONSE', response);
};

export const updateCourseProgress = async (courseId, lectureId, authorId) => {
    console.log('courseid', courseId, lectureId, authorId);
    const token = localStorage.getItem('token');

    let response = await Axios.put(
        `${ApiConfig.course.updateCourse}/${courseId}/${lectureId}/${authorId}`,
        {},

        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('response of update progress', response);
};

export const getCourseProgress = async (
    courseId,
    studentId,
    setCount,
    setTotalEnrolled,
    setCourseInProgress,
    setCompletionRate
) => {
    console.log('studentId and courseId', courseId, studentId);

    const token = localStorage.getItem('token');

    let response = await Axios.get(
        `${ApiConfig.course.getCourseProgress}/${courseId}/${studentId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('Response of course Progresss', response.data);
    if (response.data.success) {
        console.log('in success');
        setCount(response.data.count);
        setTotalEnrolled(response.data.totalEnrolledCourse);
        setCourseInProgress(response.data.coursesInProgress);
        setCompletionRate(response.data.averageCourseCompletionRate);
    }
};

export const studentDashboardData = async (
    studentId,
    setTotalEnrolled,
    setCourseInProgress,
    setCompletionRate
) => {
    console.log('studentId', studentId);

    const token = localStorage.getItem('token');

    let response = await Axios.get(
        `${ApiConfig.course.studentDashboardData}/${studentId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('Response of student dashboard data', response.data);
    if (response.data.success) {
        console.log('in success');
        setTotalEnrolled(response.data.totalEnrolledCourse);
        setCourseInProgress(response.data.coursesInProgress);
        setCompletionRate(response.data.averageCourseCompletionRate);
    }
};

export const getOverAllProgressOfInstructor = async (
    authorId,
    setStudentsEnrolled,
    setAllLiveCourses,
    setCoursesInBin
) => {
    console.log('authorId', authorId);

    const token = localStorage.getItem('token');

    let response = await Axios.get(
        `${ApiConfig.course.getOverAllProgressOfInstructor}/`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('Response of instructor dashboard data', response.data);
    if (response.data.success) {
        console.log('in success');
        setStudentsEnrolled(response.data.studentsEnrolled);
        setAllLiveCourses(response.data.allLiveCourses);
        setCoursesInBin(response.data.coursesInBin);
    }
};

export const totalAssignmentsOfParticularCourseOfInstructor = async (
    authorId,
    courseId,
    setTotalStudentsEnrolled,
    setTotalAssignments,
    setStudentsEnrolledInThisCourse
) => {
    console.log('authorId', authorId);

    const token = localStorage.getItem('token');

    let response = await Axios.post(
        `${ApiConfig.course.totalAssignmentsOfParticularCourseOfInstructor}/${courseId}`,
        {
            authorId: authorId
        },
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log(
        'Response of total Assignments in course of inst',
        response.data
    );
    if (response.data.success) {
        console.log('in success');
        setTotalStudentsEnrolled(response.data.data);
        setTotalAssignments(response.data.totalAssignments);
        setStudentsEnrolledInThisCourse(
            response.data.studentsEnrolledInThisCourse
        );
    }
};

export const getScoreOfCourseofParticularStudent = async (
    courseId,
    studentId
) => {
    let response = await Axios.get(
        `${ApiConfig.course.getScoreOfCourseofParticularStudent}/${courseId}/${studentId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('Response of score of student', response.data);
    if (response.data.success) {
        console.log('in success');
        return response.data.data;
    }
};

export const editQuestion = async (formData, questionId, dispatch) => {
    dispatch(setCurrentScreenLoading(true));
    token = localStorage.getItem('token');
    await Axios.put(
        `${ApiConfig.section.editQuestion}/${questionId}`,
        formData,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    dispatch(setCurrentScreenLoading(false));
};

export const getIndividualQuestion = async (questionId) => {
    token = localStorage.getItem('token');
    const response = Axios.get(
        `${ApiConfig.section.getIndividualQuestion}/${questionId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('Individual question response', response);
    return response;
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');

    let response = await Axios.get(`${ApiConfig.users.getCurrentUser}`, {
        headers: {
            Accept: '/',
            Authorization: `Bearer ${token}`
        }
    });
    return response;
};

// export const editProfilephoto = async (excelfile, userName) => {
//     const formData = new FormData();
//     console.log('excelfile', excelfile, userName);
//     if (excelfile) formData.append('excelfile', excelfile);
//     if (userName) {
//         formData.append('userName', userName);
//     }

//     console.log('data', formData);
//     const token = localStorage.getItem('token');
//     let response = await Axios.post(`${ApiConfig.users.editUser}`, formData, {
//         headers: {
//             Accept: '*',
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//         }
//     });
//     return response;
// };
export const editProfilephoto = async (excelfile, userName) => {
    const formData = new FormData();
    console.log('excelfile', excelfile, userName);
    if (excelfile) formData.append('excelfile', excelfile);
    if (userName) {
        formData.append('userName', userName);
    }

    console.log('data', formData);
    const token = localStorage.getItem('token');

    try {
        let response = await Axios.post(
            `${ApiConfig.users.editUser}`,
            formData,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        // Show success toast
        toast.success('Profile updated successfully');
        return response;
    } catch (error) {
        // Show error toast
        toast.error(
            'Error updating profile.Please! check your file extension.'
        );

        throw error; // Rethrow the error so that it can be handled by the caller if needed
    }
};

export const createReviews = async (data, courseId) => {
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        `${ApiConfig.reviews.createReview}/${courseId}`,
        data,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const getReviews = async (courseId) => {
    const token = localStorage.getItem('token');
    const response = await Axios.get(
        `${ApiConfig.reviews.getReview}/${courseId}`,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const editReview = async (data, reviewId, starsData) => {
    console.log('datata', data, reviewId);
    const token = localStorage.getItem('token');
    const response = await Axios.put(
        `${Apiconfig.reviews.editReviews}/${reviewId}`,
        { stars: starsData, review: data },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const allUnEnrollCourses = async () => {};

export const updateScreenTime = async (courseId, studentId, duration) => {
    const response = await Axios.post(
        `${ApiConfig.course.updateScreenTime}`,
        {
            courseId,
            studentId,
            duration
        },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const getScreenTimeOfCourseForStudent = async (courseId, studentId) => {
    const res = await Axios.post(
        `${ApiConfig.course.getScreenTimeOfCourseForStudent}`,
        {
            courseId,
            studentId
        }
    );

    return res.data.data;
};

export const getMandatoryCoursesForStudent = async (dispatch) => {
    dispatch(setCurrentScreenLoading(true));
    const res = await Axios.get(
        `${ApiConfig.users.getMandatoryCoursesForStudent}`,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    dispatch(setCurrentScreenLoading(false));
    return res.data.data;
};

export const getSuggestedCoursesForStudent = async () => {
    const res = await Axios.get(
        `${ApiConfig.users.getSuggestedCoursesForStudent}`,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data.data;
};

export const getSimilarCoursesWhileWatching = async (category) => {
    const res = await Axios.post(
        `${ApiConfig.users.getSimilarCoursesWhileWatching}`,
        { category },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data.data;
};

export const createNotes = async (
    description,
    lectureId,
    courseId,
    studentId
) => {
    const res = await Axios.post(
        `${ApiConfig.course.createNotes}`,
        {
            description,
            lectureId,
            courseId,
            studentId
        },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res;
};

export const getNotes = async (lectureId, courseId, studentId) => {
    const res = await Axios.post(
        `${ApiConfig.course.getNotes}`,
        {
            lectureId,
            courseId,
            studentId
        },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data.data;
};

export const editNotes = async (notesId, description) => {
    const res = await Axios.post(
        `${ApiConfig.course.editNotes}/${notesId}`,
        {
            description
        },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res;
};

export const smsReminder = async (description) => {
    const response = await Axios.post(
        `${ApiConfig.sms.sms}`,
        {
            description
        },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const whatsappReminder = async (description) => {
    const response = await Axios.post(
        `${ApiConfig.sms.whatsapp}`,
        {
            description
        },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const mailReminder = async (description, student) => {
    console.log('student', student);
    const response = await Axios.post(
        `${ApiConfig.sms.email}/${student._id}`,
        {
            description
        },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const getAllCircular = async () => {
    token = localStorage.getItem('token');
    try {
        const response = await Axios.get(`${ApiConfig.circular.getCirculars}`, {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const creatingLearningPath = async (obj) => {
    console.log('objjjj', obj);

    let response = await Axios.post(
        ApiConfig.learningPath.createLearningPath,
        obj,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log('RESPONSE', response);
};

export const getStudentLearningPaths = async (dispatch) => {
    dispatch(setCurrentScreenLoading(true));
    token = localStorage.getItem('token');
    const response = await Axios.get(
        `${ApiConfig.learningPath.getLearningPathsForStudent}`,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    dispatch(setCurrentScreenLoading(false));
    return response.data.data;
};
export const getInstructorLearningPaths = async (dispatch) => {
    dispatch(setCurrentScreenLoading(true));
    token = localStorage.getItem('token');
    const response = await Axios.get(
        `${ApiConfig.learningPath.getLearningPathsForInstructor}`,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    dispatch(setCurrentScreenLoading(false));
    return response.data.data;
};

export const getPoll = async () => {
    token = localStorage.getItem('token');
    try {
        const response = await Axios.get(`${ApiConfig.poll.getPolls}`, {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const submitPolls = async (option, userId, id) => {
    token = localStorage.getItem('token');
    try {
        const response = await Axios.post(
            `${ApiConfig.poll.submitPoll}/${id}`,
            {
                votes: {
                    option: parseInt(option),
                    user: userId
                }
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        toast.success('Response submitted successfully');
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const getVotes = async (id) => {
    try {
        token = localStorage.getItem('token');
        const response = await Axios.get(`${ApiConfig.poll.getVotes}/${id}`, {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const getSurvey = async () => {
    try {
        const response = await Axios.get(`${Apiconfig.survey.getSurvey}`, {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const submitSurvey = async (data, id) => {
    try {
        const response = await Axios.post(
            `${ApiConfig.survey.submitAnswer}/${id}`,
            {
                votes: data
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        toast.success('Response submitted successfully');
        return response;
    } catch (err) {
        toast.error("Response can't be submitted");
        console.log('err', err);
    }
};

export const createDiscussion = async (question) => {
    const user = token && jwtDecode(token);
    try {
        const response = await Axios.post(
            `${ApiConfig.discussionForum.createDiscussion}`,
            {
                userId: user?._id,
                question
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        toast.success('Question submitted successfully');
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const getDiscussionS = async () => {
    try {
        const response = await Axios.get(
            `${ApiConfig.discussionForum.getDiscussions}`,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const submitDiscussionReply = async (data, id) => {
    const user = token && jwtDecode(token);
    try {
        const response = await Axios.post(
            `${ApiConfig.discussionForum.submitAnswer}/${id}`,
            {
                userId: user?._id,
                description: data
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const submitDiscussionLikes = async (id) => {
    const user = token && jwtDecode(token);
    try {
        const response = await Axios.post(
            `${ApiConfig.discussionForum.submitLikes}/${id}`,
            {
                userId: user?._id,
                answerId: id
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const submitDiscussionAnswerReply = async (data, id) => {
    const user = token && jwtDecode(token);
    try {
        const response = await Axios.post(
            `${ApiConfig.discussionForum.submitReply}/${id}`,
            {
                userId: user?._id,
                description: data,
                answerId: id
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const getCurrentUserDiscussions = async () => {
    try {
        const response = await Axios.get(
            `${ApiConfig.discussionForum.getCurrentUserDiscussions}`,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const getCurrentUserDiscussionAnswer = async () => {
    try {
        const response = await Axios.get(
            `${ApiConfig.discussionForum.getCurrentUserDiscussionAnswers}`,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const getAssessmentQuestions = async () => {
    try {
        const response = await Axios.get(
            `${ApiConfig.preAssessment.getQuestions}`,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const addAssessmentQuestions = async (data) => {
    try {
        store.dispatch(setCurrentScreenLoading(true));
        const response = await Axios.post(
            `${ApiConfig.preAssessment.createQuesitons}`,
            {
                questions: data
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        store.dispatch(setCurrentScreenLoading(false));
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const submitAssessmentAnswer = async (data) => {
    const user = token && jwtDecode(token);
    try {
        const response = await Axios.post(
            `${ApiConfig.preAssessment.submitAnswer}/${user?._id}`,
            {
                solutions: data.solutions
            },
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        toast.success('Assessment submitted successfully');
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const checkAssessmentAvailabitlity = async () => {
    try {
        const response = await Axios.get(
            `${ApiConfig.preAssessment.checkAvailability}`,
            {
                headers: {
                    Accept: '*',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};
