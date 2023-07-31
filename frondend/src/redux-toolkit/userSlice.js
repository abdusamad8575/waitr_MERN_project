
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: sessionStorage.getItem('userLoggedIn') === 'true' },
    reducers: {
        signin: (state,data) => {
            console.log();
            state.isLoggedIn = true;
            state.userId = data.payload._id
            sessionStorage.setItem('userLoggedIn', 'true');
            // sessionStorage.setItem('userId',data.payload)

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