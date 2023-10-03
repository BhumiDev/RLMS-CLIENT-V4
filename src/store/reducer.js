import authReducer from '../containers/Auth/Login/reducer';
import currentScreen from '../containers/Pages/CreateCourse/Slices/currentScreen';
import currentCourse from '../containers/Pages/CreateCourse/Slices/currentCourse';
import toggleTheme from '../theme/reducer';

const rootReducer = {
    auth: authReducer,
    currentScreen,
    currentCourse,
    theme: toggleTheme
};

export default rootReducer;
