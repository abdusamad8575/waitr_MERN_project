import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

export const fetchData = createAsyncThunk(
    'fetchData/restaurant',
    async(id,{rejectWithValue}) => {
        try{
        const response = await axiosInstance.post('/selectedRestaurant',{id})
        return response.data
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    })



const resData = createSlice({
    name: 'restaurantFetch',
    initialState: {loading:false, details:null,fetchError:''},
    reducers: {
    },
    extraReducers : builder => {
        builder
        .addCase(fetchData.pending, (state,action) => {
            state.loading = true
        })
        .addCase(fetchData.fulfilled,(state,action) => {
            state.loading = false;
            state.details = action.payload.restaurant
            console.log("xcv",action.payload.restaurant);
        })
        .addCase(fetchData.rejected,(state,action) => {
            state.loading = false;
            state.fetchError = action.error.message
        })
    }
})

// export const {extraReducers} = resData.actions;
export default resData.reducer;