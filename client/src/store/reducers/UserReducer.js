import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const registerUser = createAsyncThunk('userSlice/add', async (data, thunkApi) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3001/adduser", requestOptions);
    console.log('title'+response)
    return response.json();
});

export const fetchUser = createAsyncThunk('userSlice/read', async (data, thunkApi) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3001/readuser', requestOptions);
    return response.json();
});


const initialState = {
    users: [],
    employees: [],
    isLoggedIn: false,
    currentUser: {},
    error: '',
    loader: false
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
        [registerUser.pending]: (state, action) => {
            console.log('pending');
        },
        [registerUser.fulfilled]: (state, action) => {
            console.log('fulfilled');
            alert(action.payload.message);
        },
        [registerUser.rejected]: () => {
            console.log('request rejected');
        },
        [fetchUser.pending]: (state, action) => {
            state.loader = true;
            // console.log('loader:'+state.loader)
            // console.log('fetch user pending');
        },
        [fetchUser.fulfilled]: (state, action) => {
            //var string = action.payload.data;
            //var subString = "The username";
            //var bool = string.some()
            //console.log(action.payload.error)
            state.loader = false;
            //console.log('loader:'+state.loader)
            if (action.payload.error!==undefined) {
                alert(action.payload.error);
                // console.log('I m in error')
                // state.error = action.payload.error;
            }
            else {
                console.log('I am in data');
                state.currentUser = action.payload.data;
                state.isLoggedIn = true;
                console.log('habfh');
            }
            // if (!action.payload.data) {
            //     console.log('I m in data')
            //     state.error = action.payload.error;
            // }
            // else { 
            //     state.currentUser = action.payload.data;
            //     state.isLoggedIn = true;  
            //     console.log('habfh')
            // }

        },
        [fetchUser.rejected]: () => {
            console.log('fetch user rejected');
        }
    }

});

export const { signUp, addEmployees, loggingIn, currentUser } = UserReducer.actions;
export default UserReducer.reducer;