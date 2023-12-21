import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Reducers/UserSlice';
import GlobalSlice from './Reducers/GlobalSlice';
import AdminSlice from './Reducers/AdminSlice';
import BlogSlice from './Reducers/BlgSlice';
import user from './Reducers/user';
import { contactUs } from './Reducers/contactUsSlice';
import ChatSlice from './Reducers/ChatSlice';

const Store = configureStore({
	reducer: {
		UserSlice,
		GlobalSlice,
		AdminSlice,
		BlogSlice,
		user: user,
		contact: contactUs,
		ChatSlice,
	},
});

export default Store;
