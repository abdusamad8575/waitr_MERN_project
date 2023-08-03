
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: localStorage.getItem('userLoggedIn') === 'true' },
    reducers: {
        signin: (state, data) => {
            console.log();
            state.isLoggedIn = true;
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userId', data.payload._id);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.setItem('userLoggedIn', 'false');
            localStorage.setItem('userId', '');
        },
    }
});

export const { signin, logout } = userSlice.actions;
export default userSlice.reducer;
