import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


// let navigate = useNavigate();
export const registerUser = createAsyncThunk('userSlice', async (data, thunkApi) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3001/adduser", requestOptions);
    return response.json();
});

export const fetchUser = createAsyncThunk('userSlice', async (data, thunkApi) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3001/readuser', requestOptions);
    return response.json();
});

//let navigate = useNavigate();
const initialState = {
    users: [],
    //navigate : useNavigate(),
    employees: [],
    isLoggedIn: false,
    currentUser: {},
    error: ''
}
const UserReducer = createSlice({

    name: 'userSlice',
    initialState,
    reducers: {

        loggingIn: (state, action) => {
            state.isLoggedIn = action.payload
        },

        currentUser: (state, action) => {
            state.currentUser = action.payload
        }
    },
    extraReducers: {
        [registerUser.pending]: () => {
            console.log('pending');
        },
        [registerUser.fulfilled]: (state, action) => {
            console.log('fulfilled');
            alert(action.payload.message);
        },
        [registerUser.rejected]: () => {
            console.log('request rejected');
        },
        [fetchUser.fulfilled]: (state, action) => {
            //console.log('fetch user fulfilled');
            //console.log(action.payload.data);
            if (!action.payload.data) {
                console.log('I m in data')
                state.error = action.payload.error;
            }
            else { 
                state.currentUser = action.payload.data;
                state.isLoggedIn = true;  
                console.log('habfh')
            }

        },
        [fetchUser.pending]: () => {
            console.log('fetch user pending');
        },
        [fetchUser.rejected]: () => {
            console.log('fetch user rejected');
        }
    }

});

export const { signUp, addEmployees, loggingIn, currentUser } = UserReducer.actions;
export default UserReducer.reducer;