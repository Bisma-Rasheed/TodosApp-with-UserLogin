import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
        signUp: (state,action)=>{
            state.users = [...state.users, action.payload]
        },

        addEmployees: (state, action) => {
            state.employees = [...state.employees, action.payload]
        },

        loggingIn: (state,action) => {
            state.isLoggedIn = action.payload
        },

        currentUser: (state,action) => {
            state.currentUser = action.payload
        }
    }

});

export const {signUp, addEmployees, loggingIn, currentUser} = UserReducer.actions;
export default UserReducer.reducer;