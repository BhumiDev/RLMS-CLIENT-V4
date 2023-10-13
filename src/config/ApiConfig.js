// export default Apiconfig;

// export const url = "http://10.1.76.100:5000";
// export const url = 'https://backendpxp.bhumiitech.com';

export const url = 'http://localhost:5000';

// export const OpenStackUrl = 'http://10.1.76.3:8000';
// export const OpenStackUrl = "http://124.123.17.12:7000";
export const OpenStackUrl = 'http://10.1.76.53:8000';

const Apiconfig = {
    auth: {
        login: `${url}/auth/login`,
        register: `${url}/auth/register`,
        multiRegister: `${url}/auth/multi/register`
    },
    course: {
        getAllCourse: `${url}/course/getAllCourses/`,
        getCourse: `${url}/course/getCourse`,
        editCourse: `${url}/course/editCourse`,
        getCourseModule: `${url}/lecture/allLecturesOfsection/`,
        getCourseByMajorCategory: `${url}/course/getCourseByMajorCategory`,
        getCourseBySubCategory: `${url}/course/getCourseBySubCategory`,
        createCourse: `${url}/course/createCourse`,
        getRecentCourses: `${url}/course/getRecentCourses`,
        uploadCourseContent: `${url}/course/editCourse`,
        instructorRecentCourses: `${url}/course/instructorRecentCourses`,
        instructorCourses: `${url}/course/instructorCourses`,
        addToRecentlyDeleted: `${url}/course/addToRecentlyDeleted`,
        getRecentlyDeletedCourses: `${url}/course/getRecentlyDeletedCourses`,
        coursesWithFormat: `${url}/course/get_course_data`,
        studentCoursePagination: `${url}/course/getAllEnrolledCourses`,
        paginatedAllCourses: `${url}/course/getAllCoursesNew`,
        myCourses: `${url}/course/coursesOfStudent`,
        myCoursesofInstructor: `${url}/course/coursesOfInstructor`,
        allCoursesofInstructor: `${url}/course/coursesOfInstructor`,
        addToRecent: `${url}/course/recentlyStudied`,
        searchCourse: `${url}/course/searchCourse`,
        deleteCourse: `${url}/course/deleteCourse`,
        recoverCourse: `${url}/course/recoverDeletedCourse`,
        updateCourse: `${url}/course/updateProgress`,
        getCourseProgress: `${url}/course/getCourseProgress`,
        studentDashboardData: `${url}/course/studentDashboardData`,
        getOverAllProgressOfInstructor: `${url}/course/getOverAllProgressOfInstructor`,
        totalAssignmentsOfParticularCourseOfInstructor: `${url}/course/totalAssignmentsOfParticularCourseOfInstructor`,
        getScoreOfCourseofParticularStudent: `${url}/course/courseScore`,
        getAllUnEnrolledCoursesForStudent: `${url}/course/getAllCoursesNew`,
        getEnrolledCoursesOfStudent: `${url}/course/getAllEnrolledCourses`,
        updateScreenTime: `${url}/screentime/updateScreenTime`,
        getScreenTimeOfCourseForStudent: `${url}/screentime/getScreeTimeForStudent`,
        createNotes: `${url}/notes/createNotes`,
        getNotes: `${url}/notes/getNotes`,
        editNotes: `${url}/notes/editNotes`,
        getLectureBySection: `${url}/lecture/lecturesBySection`
    },
    section: {
        createSection: `${url}/section/create`,
        edit: `${url}/section/edit`,
        getIndividalSection: `${url}/section`,
        getSectionOfCourse: `${url}/section/allSectionsOfCourse`,
        createQuestion: `${url}/section/createQuestion`,
        getIndividualQuestion: `${url}/section/getIndividualQuestion`,
        editQuestion: `${url}/section/editQuestion`,
        getAnswer: `${url}/section/getAnswer`,
        delete: `${url}/section/delete`,
        createLectureExcercise: `${url}/lecture/createLectureExcercise`,
        getLectureExcercises: `${url}/lecture/getLectureExcercise`,
        submitLectureQuizAnswers: `${url}/lecture/submitAnswersToExcercise`,
        getVideoQuizScore: `${url}/lecture/getScoreOfLectureForStudent`,
        submitReaction: `${url}/lecture/submitReaction`,
        getReactionCounts: `${url}/lecture/getFeebackReactions`
    },
    users: {
        getAllStudents: `${url}/user/getAllStudents`,
        getAllInstructors: `${url}/user/getAllInstructors`,
        getAllAdmins: `${url}/user/getAllAdmins`,
        getAllAssistants: `${url}/user/getAllAssistants`,
        getCurrentUser: `${url}/user/getCurrentuser`,
        editUser: `${url}/user/editUser`,
        getUsersByCategory: `${url}/user/getStudentsByCategory`,
        getMandatoryCoursesForStudent: `${url}/user/getMandatoryCoursesForStudent`,
        getSuggestedCoursesForStudent: `${url}/user/getSuggestedCoursesForStudent`,
        getSimilarCoursesWhileWatching: `${url}/user/getSimilarCoursesWhileWatching`
    },
    message: {
        sendMessage: `${url}/sms/msg`,
        get2Conversation: `${url}/conversation/find`
    },
    machine: {
        createMachine: `${url}/machine/create`,
        deleteMachine: `${url}/machine/delete`
    },
    lecture: {
        createLecture: `${url}/lecture/create`,
        editLecture: `${url}/lecture/edit`,
        delete: `${url}/lecture/delete`,
        getIndividualLecture: `${url}/lecture/getIndividualLecture`,
        getCompletedLecturesOfCourse: `${url}/lecture/getCompletedLecturesOfCourse`
    },
    likes: {
        likeLecture: `${url}/likes/create`,
        getLikes: `${url}/likes/getLikesofLecture`
    },
    comments: {
        createComment: `${url}/comment/create`,
        updateComment: `${url}/comment/update`,
        getComments: `${url}/comment/getAllComments`,
        replyToComment: `${url}/comment/reply`,
        editReply: `${url}/comment/editReply`
    },
    reviews: {
        createReview: `${url}/review/create-review`,
        getReview: `${url}/review/get-review`,
        editReviews: `${url}/review/edit-review`
    },
    category: {
        createCategory: `${url}/category/createCategory`,
        getAllCategories: `${url}/category/getAllCategories`
    },
    subCategory: {
        createCategory: `${url}/subCategory/createSubCategory`,
        getSubCategoriesById: `${url}/subCategory/getSubCategoriesById`
    },
    statistics: {
        getAdminDashStats: `${url}/statistics/getAdminDashStats`
    },
    request: {
        send: `${url}/request/create`,
        findAllRequest: `${url}/request/allRequestOfInstructor`,
        acceptRequest: `${url}/request/acceptRequest`,
        declineRequest: `${url}/request/declineRequest`,
        checkAlreadyRequested: `${url}/request/checkRequest`
    },

    resource: {
        createResource: `${url}/resourse/create`,
        editResource: `${url}/resourse/edit`,
        deleteResource: `${url}/resourse/delete`
    },
    password: {
        forgetPassword: `${url}/user/forgetPassword`,
        resetPassword: `${url}/user/resetPassword`
    },
    liveClass: {
        createLiveClasses: `${url}/live/createLiveClasses`,
        getAllLive: `${url}/live/getAllLiveClasses`,
        getAllLiveClasses: `${url}/live/getAllLiveClasses`,
        deleteliveclasses: `${url}/live/deleteLiveClasses/:id`,
        liveClassesForStudents: `${url}/live/studentLiveClasses`
    },
    openStack: {
        getAllNetworks: `${OpenStackUrl}/api/listnetworks/`,
        getAllImages: `${OpenStackUrl}/api/listimages/`,
        getAllFlavours: `${OpenStackUrl}/api/listflavors/`,
        createInstance: `${OpenStackUrl}/api/create_instance/`,
        getConsoleUrl: `${OpenStackUrl}/api/console_url/`,
        deleteInstance: `${OpenStackUrl}/api/deleteinstance/`
    },
    learningPath: {
        createLearningPath: `${url}/learningpath/create`,
        getLearningPathsForStudent: `${url}/learningpath/getLearningPathsForstudent`,
        getLearningPathsForInstructor: `${url}/learningpath/getLearningPathsForInstructor`
    },
    sms: {
        sms: `${url}/sms/msg`,
        whatsapp: `${url}/whatsapp/txt`,
        email: `${url}/reminder/sendReminder`
    },
    circular: {
        getCirculars: `${url}/circular/getCirculars`
    },
    poll: {
        getPolls: `${url}/poll/getPolls`,
        submitPoll: `${url}/poll/submitAnswer`,
        getVotes: `${url}/poll/getVotes`
    },
    survey: {
        getSurvey: `${url}/survey/getAllSurveys`,
        submitAnswer: `${url}/survey/submitResponse`
    },
    discussionForum: {
        createDiscussion: `${url}/discussion/create`,
        getDiscussions: `${url}/discussion/getDiscussions`,
        submitAnswer: `${url}/discussion/submitAnswer`,
        submitLikes: `${url}/discussion/answer/likes`,
        submitReply: `${url}/discussion/answer/reply`,
        getCurrentUserDiscussions: `${url}/discussion/discussions-of-currentUser`,
        getCurrentUserDiscussionAnswers: `${url}/discussion/discussion-answered-by-currentUser`
    },
    preAssessment: {
        getQuestions: `${url}/assessment/getAssesmentForStudent`,
        createQuesitons: `${url}/assessment/addQuestionToQuestionBank`,
        submitAnswer: `${url}/assessment/submitAnswerOfAssessment`,
        checkAvailability: `${url}/assessment/checkAvailablityofAssessment`
    },
    attendance: {
        create: `${url}/attendence/create`,
        update: `${url}/attendence/update`,
        getAttendance: `${url}/attendence/getAttendence`,
        getOverAllAttendance: `${url}/attendence/getOverAllAttendence`
    },
    chat: {
        getConversation: `${url}/conversations`,
        postConversations: `${url}/conversations`,
        getGroups: `${url}/groups`,
        getMessages: `${url}/messages`,
        postMessages: `${url}/messages`,
        searchUser: `${url}/user/search`,
        alreadyConvo: `${url}/conversations/find`
    },
    url
};

export default Apiconfig;
