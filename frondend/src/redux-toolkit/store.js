import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../redux-toolkit/userSlice'
import adminSlice from '../redux-toolkit/adminSlice'

const store = configureStore({
    reducer:{
        user: userSlice,
        admin:adminSlice
    }
});
export default store;