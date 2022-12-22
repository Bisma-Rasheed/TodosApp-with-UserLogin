import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const registerUser = createAsyncThunk('userSlice', async (data, thunkApi) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3001/adduser", requestOptions);
    return response.json();
});

export const fetchUser = createAsyncThunk('userSlice', async () => {
    const response = await fetch('http://localhost:3001/readuser');
    return response.json();
})

const initialState = {
    users: [],
    employees: [],
    isLoggedIn: false,
    currentUser: {}
}
const UserReducer = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.users = [...state.users, action.payload]
        },

        addEmployees: (state, action) => {
            state.employees = [...state.employees, action.payload]
        },

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
            console.log('fulfilled');
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        }
    }

});

export const { signUp, addEmployees, loggingIn, currentUser } = UserReducer.actions;
export default UserReducer.reducer;