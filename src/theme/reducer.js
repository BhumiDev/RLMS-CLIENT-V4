import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    prevTheme: null
};
// function toggleTheme(state = initialState, action = {}) {
//     switch (action && action.type) {
//         case 'TOGGLE':
//             if (localMode) {
//                 localStorage.setItem('mode', !localMode);
//             }
//             localStorage.setItem('mode', !state.mode);
//             return {
//                 mode: !state.mode
//             };
//         default:
//             return state;
//     }
// }
// export default toggleTheme;

const toggleTheme = createSlice({
    name: 'toggleTheme',
    initialState,
    reducers: {
        settoggleTheme: (state, { payload }) => {
            console.log('toggle theme called', payload);
            state.mode = payload;
        },
        storePrevThemes: (state) => {
            state.prevTheme = state.mode;
        }
    }
});

export const { settoggleTheme, storePrevThemes } = toggleTheme.actions;
export default toggleTheme.reducer;
