import {createSlice} from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name:'admin',
    initialState:{userDatas:[]},
    reducers:{
        setUserDatas:(state,action)=>{
            // console.log('poi=>',action.payload);
            state.userDatas = action.payload;
        }
    }
})

export const {setUserDatas} = adminSlice.actions;
export default adminSlice.reducer;
