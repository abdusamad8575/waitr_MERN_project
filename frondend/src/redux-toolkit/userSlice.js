import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: sessionStorage.getItem('userLoggedIn') === 'true' },
    reducers: {
        signin: (state) => {
            state.isLoggedIn = true;
            sessionStorage.setItem('userLoggedIn', 'true');
        },
    }
})
export const{signin} =userSlice.actions;
export default userSlice.reducer;