
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: sessionStorage.getItem('userLoggedIn') === 'true' },
    reducers: {
        signin: (state) => {
            state.isLoggedIn = true;
            sessionStorage.setItem('userLoggedIn', 'true');
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            sessionStorage.setItem('userLoggedIn','false');

            // sessionStorage.setItem('length',0) 
        },
    }
})
export const{signin,logout} =userSlice.actions;
export default userSlice.reducer;