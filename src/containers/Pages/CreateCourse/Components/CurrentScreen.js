import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CourseOverView from '../Screens/CourseOverview';
import Lesson from '../Screens/Lesson';
import Manual from '../Screens/Manual';
import Exercise from '../Screens/Exercise2';
// import Exercise from '../Screens/Exercise';
import OverView from './Overview';

const renderScreen = (name) => {
    switch (name) {
        case 'overview':
            return <CourseOverView />;
            break;
        case 'manual':
            return <Manual />;
            break;
        case 'lesson':
            return <Lesson />;
            break;
        case 'exercise':
            return <Exercise />;
            break;

        default:
            break;
    }
};
const currentScreen = () => {
    const { name, id, isLoading } = useSelector(
        (state) => state?.currentScreen
    );
    useEffect(() => {}, [name, id, isLoading]);

    return <>{renderScreen(name)}</>;
};

export default currentScreen;
