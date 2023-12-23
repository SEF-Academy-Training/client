import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api, { handleApiError } from '../../configs/Api';
import { toast } from 'react-toastify';

export const getAllPapers = createAsyncThunk(
	'papers/getAllPapers',
	async (queries, thunkApi) => {
		const { filter = {}, page = 1, limit = 10 } = queries;
		try {
			const res = await Api.get(`/papers/getall?page=${page}&limit=${limit}`, {
				params: { filter },
			});
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);
export const getMyPapers = createAsyncThunk('papers/getMyPapers', async (_, thunkApi) => {
	try {
		const res = await Api.get(`/papers/mypapers`);
		console.log('res', res);
		return res.data;
	} catch (error) {
		console.log('error', error);
		// return rejectWithValue(error.message);
		throw handleApiError(error);
	}
});

export const getOnePaper = createAsyncThunk(
	'paperSlice/getOnePaper',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.get(`/papers/getone${id}`);
			console.log('res', res);
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const createPaper = createAsyncThunk(
	'paperSlice/createPaper',
	async (data, { rejectWithValue }) => {
		try {
			const res = await Api.post('/papers/create', data);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const updatePaper = createAsyncThunk(
	'paperSlice/updatePaper',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const res = await Api.patch(`/papers/update/${id}`, data);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);

			handleApiError(error);
		}
	}
);

export const deletePaper = createAsyncThunk(
	'paperSlice/deletePaper',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.delete(`/papers/delete/${id}`);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);

			handleApiError(error);
		}
	}
);

export const paperSlice = createSlice({
	name: 'paperSlice',
	initialState: {
		papers: [],
		mypapers: [],
		pagination: null,
		paper: null,
		loading: false,

		error: null,
		message: null,
		success: false,
	},

	extraReducers: (builder) => {
		builder.addCase(getAllPapers.fulfilled, (state, action) => {
			state.loading = false;
			state.papers = action?.payload?.data;
			state.pagination = action?.payload?.pagination;
		});
		builder.addCase(getMyPapers.fulfilled, (state, action) => {
			state.loading = false;
			console.log(action.payload);
			state.mypapers = action?.payload?.data;
			state.pagination = action?.payload?.pagination;
		});

		builder.addCase(getOnePaper.fulfilled, (state, action) => {
			state.loading = false;
			state.paper = action?.payload?.data;
			toast.success(action.payload?.message);
		});

		builder.addCase(createPaper.fulfilled, (state, action) => {
			state.loading = false;
			state.paper = action?.payload?.data;
			toast.success(action.payload?.message);
		});

		builder.addCase(updatePaper.fulfilled, (state, action) => {
			state.loading = false;
			state.paper = action?.payload?.data;
			toast.success(action.payload?.message);
		});

		builder.addCase(deletePaper.fulfilled, (state, action) => {
			state.loading = false;
			state.paper = action?.payload?.data;
			toast.success(action.payload?.message);
		});

		builder
			.addMatcher(
				(action) => action.type.endsWith('/pending'),
				(state) => {
					state.loading = true;
					state.success = false;
					state.error = '';
					state.message = '';
				}
			)

			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, action) => {
					state.loading = false;
					state.message = '';
					state.error = action.payload; // This assumes handleApiError returns the appropriate value
					state.course = {};
					state.success = false;
				}
			);
	},
});

export const {} = paperSlice.actions;

export default paperSlice.reducer;
