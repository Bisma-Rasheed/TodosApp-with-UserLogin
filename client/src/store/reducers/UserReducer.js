import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const addTodo = createAsyncThunk('userSlice/addtodos', async (data, thunkApi)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3001/addtodo', requestOptions);
    return response.json();
});

export const deleteTodo = createAsyncThunk('userSlice/deltodos', async (data, thunkApi)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3001/deletetodo', requestOptions);
    return response.json();
});


const initialState = {
    currentUser: {},
    isLoggedIn: false,
    loader: false,
    isError: false
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
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.loader = false;
            
            if (action.payload.error!==undefined) {
                state.isError = true;
                alert(action.payload.error);
            }
            else {
                state.isError = false;
                state.currentUser = action.payload.data;
                state.isLoggedIn = true;
                alert('successfully logged in');
            }
        },
        [fetchUser.rejected]: () => {
            console.log('fetch user rejected');
        },
        [addTodo.pending]:()=>{
            console.log('pending');
        },
        [addTodo.fulfilled]: (state, action) => {
            state.currentUser = action.payload.data
        },
        [addTodo.rejected]: ()=>{
            console.log('request rejected');
        },
        [deleteTodo.pending]:()=>{
            console.log('pending');
        },
        [deleteTodo.fulfilled]: (state, action) => {
            state.currentUser = action.payload.data
        },
        [deleteTodo.rejected]: ()=>{
            console.log('request rejected');
        }
    }

});

export const { loggingIn, currentUser } = UserReducer.actions;
export default UserReducer.reducer;