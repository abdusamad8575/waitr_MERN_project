import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../redux-toolkit/userSlice'
import adminSlice from '../redux-toolkit/adminSlice'
import resDatas from '../redux-toolkit/fetchData'

const store = configureStore({
    reducer:{
        user: userSlice,
        admin:adminSlice,
        resData:resDatas
    }
});
export default store;