
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: localStorage.getItem('userLoggedIn') === 'true',location:'',details:'',foods:[] },
    reducers: {
        signin: (state, data) => {
            const userDitails = JSON.stringify(data.payload)
            state.isLoggedIn = true;
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('user',userDitails)
            localStorage.setItem('userId', data.payload._id);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.setItem('userLoggedIn', 'false');
            localStorage.setItem('user','')
            localStorage.setItem('userId', '');
        },
        locations: (state,action) =>{
            state.location = action.payload
        },
        selectRestaurant: (state,action) =>{
            state.details = action.payload
            // console.log("555",state.details);
        },
        selectedFoods: (state, action) => {
            console.log("666:-", action.payload);
            state.foods = action.payload;
        }
        
    }
});

export const { signin, logout, locations, selectRestaurant,selectedFoods } = userSlice.actions;
export default userSlice.reducer;
