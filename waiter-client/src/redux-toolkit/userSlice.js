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
            localStorage.setItem('orderData','')
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
        },
        orderSuccess:(state,action)=>{
            state.orderDetails= action.payload
            const orderData = JSON.stringify(action.payload)
            localStorage.setItem('orderData',orderData)
        }
    },

});

export const { signin, logout, locations, selectRestaurant,orderUserDetails,orderFoodDetails,orderSuccess } = userSlice.actions;
export default userSlice.reducer;
