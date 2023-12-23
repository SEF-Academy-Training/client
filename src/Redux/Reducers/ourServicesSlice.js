import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api, { apiOption, handleApiError } from '../../configs/Api';
import { toast } from 'react-toastify';

export const getAllOurServices = createAsyncThunk(
	'OurServiceSlice/getAllOurServices',
	async (queries, { rejectWithValue }) => {
		const { filter = {}, sort, page = 1, limit = 10 } = queries;
		try {
			const res = await Api.get(`/our-services?page=${page}&limit=${limit}`, {
				params: { filter, sort },
			});
			console.log('res', res);
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const getOneOurService = createAsyncThunk(
	'OurServiceSlice/getOneOurService',
	async (id, { rejectWithValue }) => {
		console.log('id',id);
		try {
			const res = await Api.get(`/our-services/${id}`);
			console.log('res', res);
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const createOurService = createAsyncThunk(
	'OurServiceSlice/createOurService',
	async (data, { rejectWithValue }) => {
		try {
			const res = await Api.post('/our-services', data, apiOption);
			console.log('res', res);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const updateOurService = createAsyncThunk(
	'OurServiceSlice/updateOurService',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const res = await Api.patch(`/our-services/${id}`, data, apiOption);
			console.log('res', res);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);

			handleApiError(error);
		}
	}
);

export const deleteOurService = createAsyncThunk(
	'OurServiceSlice/deleteOurService',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.delete(`/our-services/${id}`);
			console.log('res', res);
			// toast.success(res.data.message)
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);

			handleApiError(error);
		}
	}
);

export const OurServiceSlice = createSlice({
	name: 'OurServiceSlice',
	initialState: {
		ourServices: [],
		pagination: null,
		ourService: null,
		loading: false,

		error: null,
		message: null,
		success: false,
	},

	extraReducers: (builder) => {
		// builder.addCase(getAllOurServices.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.OurServices = [];
		// 	state.pagination = null;
		// 	console.log(action);
		// });
		builder.addCase(getAllOurServices.fulfilled, (state, action) => {
			state.loading = false;
			state.ourServices = action?.payload?.data;
			state.pagination = action?.payload?.pagination;
		});
		// builder.addCase(getAllOurServices.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.OurServices = [];
		// 	state.pagination = null;
		// 	console.log(action);
		// });

		// builder.addCase(getOneOurService.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.OurService = null;
		// });
		builder.addCase(getOneOurService.fulfilled, (state, action) => {
			state.loading = false;
			state.ourService = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(getOneOurService.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.OurService = null;
		// });

		// builder.addCase(createOurService.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.OurService = null;
		// });
		builder.addCase(createOurService.fulfilled, (state, action) => {
			state.loading = false;
			state.OurService = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(createOurService.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.OurService = null;
		// });

		// builder.addCase(updateOurService.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.OurService = null;
		// });
		builder.addCase(updateOurService.fulfilled, (state, action) => {
			state.loading = false;
			state.OurService = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(updateOurService.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.OurService = null;
		// });

		// builder.addCase(deleteOurService.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.OurService = null;
		// });
		builder.addCase(deleteOurService.fulfilled, (state, action) => {
			state.loading = false;
			state.OurService = action?.payload?.data;
			toast.success(action.payload?.message || 'OurService delete successfully');
		});
		// builder.addCase(deleteOurService.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.OurService = null;
		// });

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
			// .addMatcher(
			// 	(action) => action.type.endsWith('/fulfilled'),
			// 	(state, action) => {
			// 		state.loading = false;
			// 		state.error = '';
			// 		state.message = action.payload?.message || '';
			// 		state.OurServices =
			// 			Array.isArray(action?.payload?.data) && action?.payload?.data;
			// 		state.OurService = !Array.isArray(action.payload.data) && action?.payload?.data;
			// 		state.success = action.payload.success || false;
			// 		toast.success(action.payload?.message);
			// 	}
			// )
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, action) => {
					state.loading = false;
					state.message = '';
					state.error = action.payload; // This assumes handleApiError returns the appropriate value
					state.OurService = {};
					state.success = false;
				}
			);
	},
});

export default OurServiceSlice.reducer;
