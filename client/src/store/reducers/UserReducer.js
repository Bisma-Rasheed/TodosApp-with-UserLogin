import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const registerUser = createAsyncThunk('userSlice', async () => {
    const response = await fetch("http://localhost:3001/readuser");
    return response.json();
});

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
            //state.currentUser = action.payload;
            state.users = action.payload
        },
        [registerUser.rejected]: (state, action) => {
            console.log('request rejected');
        }
    }

});

export const { signUp, addEmployees, loggingIn, currentUser } = UserReducer.actions;
export default UserReducer.reducer;