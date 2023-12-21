import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Reducers/UserSlice'
import GlobalSlice from './Reducers/GlobalSlice'
import AdminSlice from './Reducers/AdminSlice';
import BlogSlice from './Reducers/BlgSlice';
import ChatSlice from './Reducers/ChatSlice';

const Store = configureStore({
	reducer: {
		UserSlice,
		GlobalSlice,
		AdminSlice,
		BlogSlice,
		ChatSlice,
	},
});

export default Store;

