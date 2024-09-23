import { configureStore, createSlice } from "@reduxjs/toolkit";
import  authReducer from './authSlice';


export const store = configureStore({
    reducer:{
        auth: authReducer,//authSlice store a eklendi.
    },

}) 

export default store;