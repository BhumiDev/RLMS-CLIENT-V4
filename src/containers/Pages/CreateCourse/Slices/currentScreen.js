import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'overview',
    id: '',
    editable: false,
    isLoading: false,
    resetForm: false,
    showAddButtons: false
};
const currentScreen = createSlice({
    name: 'currentScreen',
    initialState,
    reducers: {
        setCurrentScreenName: (state, { payload }) => {
            console.log('Payload fetched', payload);
            state.name = payload;
        },
        setCurrentScreenId: (state, { payload }) => {
            state.id = payload;
        },
        setCurrentScreenState: (state, { payload }) => {
            state.editable = payload;
        },
        setCurrentScreenLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        resetCurrentScreenForm: (state, { payload }) => {
            state.resetForm = payload;
        },
        setShowAddButtons: (state, { payload }) => {
            state.showAddButtons = payload;
        }
    }
});

export const {
    setCurrentScreenName,
    setCurrentScreenId,
    setCurrentScreenState,
    setCurrentScreenLoading,
    resetCurrentScreenForm,
    setShowAddButtons
} = currentScreen.actions;

export default currentScreen.reducer;
