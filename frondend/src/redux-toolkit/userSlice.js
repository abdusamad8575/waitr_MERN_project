import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: localStorage.getItem('userLoggedIn') === 'true',location:'',restaurantId:'',guestDetails:""},
    reducers: {
        signin: (state, data) => {
            const userDitails = JSON.stringify(data.payload)
            state.isLoggedIn = true;
            state.userId= data.payload._id;
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('user',userDitails)
            const userIds = JSON.stringify(data.payload._id)
            localStorage.setItem('userId',userIds);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.setItem('userLoggedIn', 'false');
            localStorage.setItem('user','')
            localStorage.setItem('userId', '');
            localStorage.setItem('restaurantId', '');
            localStorage.setItem("guestDetails",'')
            localStorage.setItem("orderFoodDetails",'')
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
        },
        orderFoodDetails: (state,action)=>{
            state.orders = action.payload
            const foods = JSON.stringify(action.payload)
            localStorage.setItem("orderFoodDetails",foods)
            // console.log("setData:-",action.payload);         
        }      
    },

});

export const { signin, logout, locations, selectRestaurant,orderUserDetails,orderFoodDetails } = userSlice.actions;
export default userSlice.reducer;
