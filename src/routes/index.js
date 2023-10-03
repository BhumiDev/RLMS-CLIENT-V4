import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import LoginLayout from '../common/layout/Auth';
import DashboardLayout from '../common/layout/Dashboard';
import Login from '../containers/Auth/Login';
import ForgotPage from '../containers/Auth/Forget';
import Mycourses from '../containers/Pages/MyCourses';
import ChatBox from '../containers/Pages/ChatBox/chatBox';
import LiveClasses from '../liveclasses';
import ScheduleLiveClasses from '../liveclasses/schedule';
import { Test } from '../containers/Pages/edit/index';

import AllCourses from '../containers/Pages/AllCourses';
import { RecentlyDeletedCourses } from '../containers/Pages/recentlydeleted';
// import CreateCourse from '../containers/Pages/CreateCourse/CreateCourse';
import CreateCourse from '../containers/Pages/CreateCourse';
import ViewCourse from '../containers/Pages/ViewCourse';
import ViewModule from '../containers/Pages/ViewModule';
// import CreateLesson from '../containers/Pages/CreateCourse/CreateLesson';
import NotFound from '../containers/Page404';
import StudentDashboard from '../containers/Pages/studentDashboard';
import Board from '../containers/Pages/ChatBox/Board';
// import LiveSession from '../containers/Pages/Dashboard/liveSession';
import PendingRequest from '../containers/Pages/pendingRequest';
import Main from '../containers/Pages/AdminDashboard/Main';
import McqDashbooad from '../containers/Pages/mcq';
import Certificate from '../containers/Pages/AdminDashboard/Certificates';
import PasswordUpdate from '../containers/Auth/PasswordUpdate';
import { Search } from '../containers/Pages/Search/Index';
import { Box } from '@mui/material';
import { ViewStudent } from '../containers/Pages/AdminDashboard/ViewStudent';
import VirtualLab from '../containers/Pages/VirtualLab';
import { ViewProfile } from '../containers/Pages/Profile/ViewProfile';
import { EditProfile } from '../containers/Pages/Profile/EditProfile';
import { MandatoryCourses } from '../containers/Pages/MandatoryCourses';
import { Circular } from '../containers/Pages/Circular';
import LearningPath from '../containers/Pages/CreateCourse/learningPath';
import { LearningPathsPage } from '../containers/Pages/LearningPaths';
import { LeaderBoard } from '../containers/Pages/LeaderBoard';
import { Polls } from '../containers/Pages/Polls';
import { QuestionBank } from '../containers/Pages/QuestionBank';
import { AddAssessmentQuestions } from '../containers/Pages/QuestionBank/AddQuestions';
import { Attendance } from '../containers/Pages/Attendance';
import { AttendanceDetails } from '../containers/Pages/Attendance/AttendanceDetails';

const Router = () => {
    const isLoggedIn = localStorage.getItem('token');
    const user = isLoggedIn && jwt_decode(isLoggedIn);
    const userRole = user?.role;
    console.log('userRole', userRole);
    const location = useLocation();

    return useRoutes([
        {
            path: '/',

            element: !isLoggedIn ? (
                <LoginLayout />
            ) : (
                <Navigate to="/dashboard" />
            ),
            children: [
                { path: '', element: <Login /> },
                { path: 'forgot-password', element: <ForgotPage /> },
                {
                    path: 'change-password/:resetPasswordToken',
                    element: <PasswordUpdate />
                },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        {
            path: '/dashboard',
            element: !isLoggedIn ? (
                <Navigate to="/" replace state={{ from: location }} />
            ) : (
                <DashboardLayout />
            ),
            children: [
                {
                    path: '',
                    element:
                        userRole === 'instructor' ? (
                            <StudentDashboard />
                        ) : (
                            <StudentDashboard />
                        )
                },

                { path: 'circular', element: <Circular /> },
                { path: 'courses/my-courses', element: <Mycourses /> },
                { path: 'lab', element: <VirtualLab /> },
                {
                    path: 'courses/track-progress',
                    element: <Main />
                },

                // {
                //     path: 'courses/create-lesson',
                //     element:
                //         userRole === 'instructor' ? (
                //             <CreateLesson />
                //         ) : (
                //             <Navigate to="/" />
                //         )
                // },
                {
                    path: 'courses/create-course',
                    element:
                        userRole === 'instructor' ? (
                            <CreateCourse />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                },
                {
                    path: 'learning-path/create-learning-path',
                    element:
                        userRole === 'instructor' ? (
                            <LearningPath />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                },
                { path: 'leaderboard', element: <LeaderBoard /> },
                { path: 'attendance', element: <Attendance /> },
                {
                    path: 'student-attendance-details',
                    element: <AttendanceDetails />
                },
                { path: 'learning-path', element: <LearningPathsPage /> },
                { path: 'courses/all-courses', element: <AllCourses /> },
                { path: 'courses/question-bank', element: <QuestionBank /> },
                {
                    path: 'courses/add-assessment-question',
                    element: <AddAssessmentQuestions />
                },
                {
                    path: 'courses/view-course/:courseId',
                    element: <ViewCourse />
                },
                {
                    path: 'courses/mandatory-courses',
                    element: <MandatoryCourses />
                },
                {
                    path: 'courses/edit-course/:courseId',
                    element: <CreateCourse />
                },
                {
                    path: 'courses/view-student/:userId',
                    element: <ViewStudent />
                },
                { path: 'courses/view-module', element: <ViewModule /> },
                {
                    path: 'courses/recently-deleted',
                    element: <RecentlyDeletedCourses />
                },

                { path: 'chat-Box', element: <ChatBox /> },
                { path: 'search', element: <Search /> },

                // { path: 'live', element: <LiveSession/> },
                { path: 'request', element: <PendingRequest /> },
                // { path: 'whiteboard', element: <Board /> },

                // { path: 'create-course', element: <AllCourses /> },
                { path: 'request', element: <PendingRequest /> },
                { path: 'mcq', element: <McqDashbooad /> },
                { path: '404', element: <NotFound /> },
                { path: 'liveclasses', element: <LiveClasses /> },
                {
                    path: 'liveclasses/schedule',
                    element: <ScheduleLiveClasses />
                },
                { path: 'view-profile', element: <ViewProfile /> },
                { path: 'test', element: <Test /> },

                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        {
            path: 'whiteboard',
            element: <Board />
        },
        {
            path: 'certificate',
            element: <Certificate />
        },

        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
};

export default Router;
