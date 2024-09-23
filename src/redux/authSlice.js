import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState =  {
    token: null,
    user: null,
    loading: false,
    error:  null,
    
};

export const registerUser = createAsyncThunk(
    'Auth/register', async(registerData) => {
        const response = await axios.post('https://localhost:7022/api/Auth/register',registerData);
        return response.data;
    }
);

export const loginUser = createAsyncThunk(
    'Auth/login', async(loginData) => {
        console.log("response: ", loginData);
        
        const response = await axios.post('https://localhost:7022/api/Auth/login',loginData);
        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducer:{
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        }
        //Http isteği olmaz ise kullanılır !
        },
     extraReducers: (builder) => {
          // Register işlemleri
            builder.addCase(registerUser.pending,(state) => {
                state.loading = true;
            })
            builder.addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token',action.payload.token);
            })
            builder.addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

              // Giriş işlemleri
            builder.addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            builder.addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload;
                //statge.token=action.payload.token;

                // Login action'ını ve payload'u logla
                console.log("Login action: ", action);
                console.log("Login payload: ", action.payload);
                
                //localStorage.setItem('token', action.payload.token); eskisi.
                // localStorage.setItem('token', action.payload);
                console.log('Login successful, token saved:', action.payload.token);
            })
            builder.addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                // console.log("Login error: ", action.error.message);
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer