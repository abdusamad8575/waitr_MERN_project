import {createSlice} from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name:'admin',
    initialState:{userDatas:[]},
    reducers:{
        setUserDatas:(state,action)=>{
            state.userDatas = action.payload;
        }
    }
})

export const {setUserDatas} = adminSlice.actions;
export default adminSlice.reducer;
