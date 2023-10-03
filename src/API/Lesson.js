import Axios from 'axios';
import ApiConfig from '../config/ApiConfig';
// import { useSelector } from 'react-redux';

// import { store } from '../store';

// import { CreateLessonId } from '../containers/Pages/CreateCourseObsolete/actions';
import { setCurrentSectionId } from '../containers/Pages/CreateCourse/Slices/currentCourse';
import {
    setCurrentScreenId,
    setCurrentScreenLoading,
    setCurrentScreenName,
    setCurrentScreenState
} from '../containers/Pages/CreateCourse/Slices/currentScreen';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../store';
// import axios from 'axios';
// import axios from 'axios';

export const createManual = async (courseId, title, dispatch) => {
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        `${ApiConfig.section.createSection}/${courseId}`,
        {
            title
        },
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    );
    dispatch(setCurrentSectionId(response.data.data._id));
    dispatch(setCurrentScreenName('lesson'));
    dispatch(setCurrentScreenId(''));
    console.log('Manual created', response.data);

    return response.data.data._id;
};

export const deleteManual = async (sectionId, dispatch) => {
    dispatch(setCurrentScreenLoading(true));
    const token = localStorage.getItem('token');
    await Axios.delete(`${ApiConfig.section.delete}/${sectionId}`, {
        headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`
        }
    }).then((response) => response);
    dispatch(setCurrentScreenLoading(false));
};
export const deleteLesson = async (
    lectureId,
    sectionId,
    dispatch,
    setResourceToBeDeletedId
) => {
    const token = localStorage.getItem('token');
    dispatch(setCurrentScreenLoading(true));
    await Axios.delete(
        `${ApiConfig.lecture.delete}/${lectureId}/${sectionId}`,
        {
            headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`
            }
        }
    ).then((response) => response);
    dispatch(setCurrentScreenLoading(false));
    dispatch(setCurrentScreenName('manual'));
    setResourceToBeDeletedId([]);
};

export const getSectionsOfCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    console.log('course Id', courseId);
    const response = await Axios.get(
        `${ApiConfig.section.getSectionOfCourse}/${courseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('get Sections response', response);
    const responseData = response;
    return responseData;
};

export const createLessons = async (
    formData,
    courseId,
    sectionId
    // toggleUpdate,
    // setResource
) => {
    const token = localStorage.getItem('token');

    console.log('formdata,courseId,sectionId', formData, courseId, sectionId);
    const response = await Axios.post(
        `${ApiConfig.lecture.createLecture}/${courseId}/${sectionId}`,
        {
            title: formData.title,
            description: formData.description,
            externalLink: formData.externalLink
        },
        {
            headers: {
                Accept: '*',
                authorization: `Bearer ${token}`
            }
        }
    );
    console.log('lesson create response', response);
    // toggleUpdate();
    // setResource({});
    return response.data.data._id;
};

export const editLesson = async (
    lectureId,
    video,
    lessonFormData,
    dispatch
) => {
    dispatch(setCurrentScreenLoading(true));
    const data = new FormData();
    console.log('Video needed to be uploaded', video);

    if (video) data.append('video', video);

    if (lessonFormData) {
        Object.keys(lessonFormData).map((item) =>
            data.append(item, lessonFormData[item])
        );
    }
    const token = localStorage.getItem('token');

    console.log('Edit Lesson Data', data);
    const response = await Axios.put(
        `${ApiConfig.lecture.editLecture}/${lectureId}`,

        data,

        {
            headers: {
                Accept: '*',
                authorization: `Bearer ${token}`
            }
        }
    );
    dispatch && dispatch(setCurrentScreenState(true));
    dispatch && dispatch(setCurrentScreenId(lectureId));
    dispatch(setCurrentScreenLoading(false));
    toast.success('lecture created Successfully');
};

export const getIndividualLectureCompletionStatus = async (
    instructorId,
    courseId
) => {
    const token = localStorage.getItem('token');
    const response = await Axios.get(
        `${ApiConfig.lecture.getCompletedLecturesOfCourse}/${instructorId}/${courseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log('lecture status', response.data);
    return response.data.data;
};

export const createResource = async (
    lectureId,
    courseId,
    resource,
    title
    // name
    // dispatch
) => {
    store.dispatch(setCurrentScreenLoading(true));
    console.log('Inside create resource ', resource);
    const token = localStorage.getItem('token');

    const response = await Axios.post(
        `${ApiConfig.resource.createResource}/${courseId}/${lectureId}`,
        {
            name: resource.name,
            resourceTitle: title
        },
        {
            headers: {
                Accept: '/',
                authorization: `Bearer ${token}`
            }
        }
    );
    const resourceId = response.data.data._id;
    store.dispatch(setCurrentScreenLoading(false));

    await editResource(resource, resourceId, store.dispatch); //To upload resource file in lecture
    return response.data.data._id;
};

export const editManualApi = async (sectionId, title, dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(setCurrentScreenLoading(true));
    const response = await Axios.put(
        `${ApiConfig.section.edit}/${sectionId}`,
        { title },
        {
            headers: {
                Accept: '*',
                authorization: `Bearer ${token}`
            }
        }
    );
    console.log('Edit manual response', response.data.data._id);
    dispatch(setCurrentScreenLoading(false));
    return response.data.data._id;
};

export const editResource = async (resource, resourceId) => {
    store.dispatch(setCurrentScreenLoading(true));
    console.log('resource in edit resource', resource);
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('resource', resource);
    console.log('Form data of resource file', data);
    const response = await Axios.put(
        `${ApiConfig.resource.editResource}/${resourceId}`,
        data,
        {
            headers: {
                Accept: '*',
                authorization: `Bearer ${token}`
            }
        }
    );
    store.dispatch(setCurrentScreenLoading(false));
    console.log('response of editResource', response);
};

export const deleteResources = async (ids, lectureId, dispatch) => {
    console.log('Delete api started');
    dispatch(setCurrentScreenLoading(true));
    const token = localStorage.getItem('token');
    const response = await Axios.delete(
        `${ApiConfig.resource.deleteResource}/${lectureId}`,
        {
            headers: {
                Accept: '*',
                authorization: `Bearer ${token}`
            },
            data: {
                resourcesId: ids
            }
        }
    );

    dispatch(setCurrentScreenLoading(false));
    return response.data.data;
};

export const getCurrentLecture = async (
    lectureId
    // lessonFormData,
    // setLessonFormData,
    // setResource,
    // setResourceId,
    // setShouldEditResource
) => {
    const token = localStorage.getItem('token');

    const response = await Axios.get(
        `${ApiConfig.lecture.getIndividualLecture}/${lectureId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    const video = response?.data?.data?.video;
    // const trimmedVideo = video?.slice(31, video?.length);
    // console.log('setLessonFormData',setLessonFormData)
    // setLessonFormData &&
    //     setLessonFormData({
    //         ...lessonFormData,
    //         title: response.data.data.title,
    //         description: response.data.data.description,
    //         resourceTitle: response.data.data.resourceTitle,
    //         videoPlace: trimmedVideo
    //     });

    // console.log('already have resource', response.data.data.resource[0]);
    // if (response.data.data.resource.length > 0) {
    //     console.log('already have resource', response.data.data.resource[0]);
    //     setResource && setResource(response.data.data.resource[0]);
    //     setResourceId && setResourceId(response.data.data.resource[0]._id);
    //     setShouldEditResource && setShouldEditResource(true);
    // }
    return response;
    // console.log('Lecture Fetched', response.data);
};
export const deleteSection = async (sectionId, toast) => {
    const token = localStorage.getItem('token');
    console.log('inside search course', sectionId);

    console.log('Token of delete section', token);
    const response = await Axios.delete(
        `${ApiConfig.section.deleteSection}/${sectionId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    response.data.success && toast.success('Test Toast Success');

    console.log('response of delete section api', response.data);
    return response;
};

export const likeLecture = async (lectureId) => {
    const token = localStorage.getItem('token');

    const response = await Axios.get(
        `${ApiConfig.likes.likeLecture}/${lectureId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    // console.log("response", response)
    return response;
};

export const getLikes = async (lectureId) => {
    const token = localStorage.getItem('token');
    console.log('lectureId in getLIkes', lectureId);
    const response = await Axios.get(
        `${ApiConfig.likes.getLikes}/${lectureId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    // console.log("response", response)
    return response;
};

export const createComment = async (comment, lectureId) => {
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        `${ApiConfig.comments.createComment}/${lectureId}`,
        {
            description: comment
        },
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const getAllComments = async (lectureId) => {
    const token = localStorage.getItem('token');
    const response = await Axios.get(
        `${ApiConfig.comments.getComments}/${lectureId}`,
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const editComment = async (commentId, data) => {
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        `${ApiConfig.comments.updateComment}/${commentId}`,
        { description: data },
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const createReply = async (commentId, lectureID, data) => {
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        `${ApiConfig.comments.replyToComment}/${commentId}/${lectureID}`,
        { description: data },
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const editReply = async (replyId, data) => {
    const token = localStorage.getItem('token');
    const response = await Axios.post(
        `${ApiConfig.comments.editReply}/${replyId}`,
        { description: data },
        {
            headers: {
                Accept: '/',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const createQuizAssessment = async (id, data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await Axios.post(
            `${ApiConfig.section.createLectureExcercise}/${id}`,
            {
                questions: data.questions
            },
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const getVideoQuiz = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await Axios.get(
            `${ApiConfig.section.getLectureExcercises}/${id}`,
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const submitLectureVideoQuiz = async (id, data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await Axios.post(
            `${ApiConfig.section.submitLectureQuizAnswers}/${id}`,
            {
                solutions: data
            },
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const getVideoQuizScore = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await Axios.get(
            `${ApiConfig.section.getVideoQuizScore}/${id}`,
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};

export const submitLectureReaction = async (id, reaction) => {
    const token = localStorage.getItem('token');
    try {
        const response = await Axios.post(
            `${ApiConfig.section.submitReaction}`,
            {
                lectureId: id,
                reactionType: reaction
            },
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (err) {
        console.log('err', err);
    }
};

export const getReactionCount = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await Axios.get(
            `${ApiConfig.section.getReactionCounts}/${id}`,
            {
                headers: {
                    Accept: '/',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.data;
    } catch (err) {
        console.log('err', err);
    }
};
