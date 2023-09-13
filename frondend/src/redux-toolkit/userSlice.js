import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: localStorage.getItem('userLoggedIn') === 'true',location:'',restaurantId:'',guestDetails:""},
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
            localStorage.setItem('restaurantId', '');
        },
        locations: (state,action) =>{
            state.location = action.payload
        },
        selectRestaurant: (state,action) =>{ 
            const resId = JSON.stringify(action.payload)
            state.restaurantId = action.payload
            localStorage.setItem('restaurantId', resId);
        },
        orderUserDetails:(state,action)=>{
            state.guestDetails = action.payload
            const guest = JSON.stringify(action.payload)
            localStorage.setItem("guestDetails",guest)
        }        
    },

});

export const { signin, logout, locations, selectRestaurant,orderUserDetails } = userSlice.actions;
export default userSlice.reducer;
