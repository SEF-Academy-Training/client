import { createSlice } from '@reduxjs/toolkit';

const GlobalSlice = createSlice({
	name: 'route',
	initialState: {
		activeLink: 'home',
		toggleDark: false,
		sortData: null,
		searchQuery: '',
	},
	reducers: {
		setActiveLink: (state, action) => {
			state.activeLink = action.payload;
		},
		settoggleDark: (state, action) => {
			state.toggleDark = action.payload;
		},
		setSortData: (state, action) => {
			// state.sortData = state.sortData === 'asc' ?'asc' : -1 ;
			state.sortData = action.payload;
			console.log('action.payload', action.payload);
		},
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		},
	},
});

export const { setActiveLink, settoggleDark , setSortData, setSearchQuery } = GlobalSlice.actions;
export default GlobalSlice.reducer;
