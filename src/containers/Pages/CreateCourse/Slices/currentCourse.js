import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Apiconfig from '../../../../config/ApiConfig';

const initialState = {
    isLoading: false,
    currentSectionId: '',
    data: ''
};

export const getIndividualCourse = createAsyncThunk(
    'currentCourse/getIndividualCourse',
    async (courseId, thunkAPI) => {
        console.log('Current course thunk called');
        // console.log(name) argument passed during  function call;
        console.log(thunkAPI.getState());
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${Apiconfig.course.getCourse}/${courseId}`,
                {
                    headers: {
                        Accept: '/',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('api from redux data', response);
            return response.data.data;
        } catch (err) {
            console.log('Error in api', err);
        }
    }
);

// whatever we are returning in the reducer it will replace the original state
const currentCourse = createSlice({
    name: 'currentCourse',
    initialState,
    reducers: {
        setCurrentSectionId: (state, { payload }) => {
            state.currentSectionId = payload;
        },
        getCurrentCourse: (state, { payload }) => {
            state.data = payload;
        }
    },
    extraReducers: {
        [getIndividualCourse.pending]: (state) => {
            state.isLoading = true;
        },
        [getIndividualCourse.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [getIndividualCourse.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

// console.log(cartSlice)
export const { getCurrentCourse, setCurrentSectionId } = currentCourse.actions;

export default currentCourse.reducer;
