import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './reducers/UserReducer';

export default configureStore({
    reducer:{
        userSlice: UserReducer
    }
});