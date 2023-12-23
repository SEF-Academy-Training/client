import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api, { handleApiError } from '../../configs/Api';
import { toast } from 'react-toastify';

export const getAllServices = createAsyncThunk(
	'ServiceSlice/getAllServices',
	async (queries, { rejectWithValue }) => {
		const { filter = {}, page = 1, limit = 10 } = queries;
		try {
			const res = await Api.get(`/services?page=${page}&limit=${limit}`, {
				params: { filter },
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

export const getOneService = createAsyncThunk(
	'ServiceSlice/getOneService',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.get(`/services/${id}`);
			console.log('res', res);
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const createService = createAsyncThunk(
	'ServiceSlice/createService',
	async (data, { rejectWithValue }) => {
		try {
			const res = await Api.post('/services', data);
			console.log('res', res);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const updateService = createAsyncThunk(
	'ServiceSlice/updateService',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const res = await Api.patch(`/services/${id}`, data);
			console.log('res', res);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);

			handleApiError(error);
		}
	}
);

export const deleteService = createAsyncThunk(
	'ServiceSlice/deleteService',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.delete(`/services/${id}`);
			console.log('res', res);
			// toast.success(res.data.message)
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);

			handleApiError(error);
		}
	}
);

export const ServiceSlice = createSlice({
	name: 'ServiceSlice',
	initialState: {
		services: [],
		pagination: null,
		service: null,
		loading: false,

		error: null,
		message: null,
		success: false,
	},

	extraReducers: (builder) => {
		builder.addCase(getAllServices.fulfilled, (state, action) => {
			state.loading = false;
			state.services = action?.payload?.data;
			state.pagination = action?.payload?.pagination;
		});

		builder.addCase(getOneService.fulfilled, (state, action) => {
			state.loading = false;
			state.service = action?.payload?.data;
			toast.success(action.payload?.message);
		});

		builder.addCase(createService.fulfilled, (state, action) => {
			state.loading = false;
			state.service = action?.payload?.data;
			toast.success(action.payload?.message);
		});

		builder.addCase(updateService.fulfilled, (state, action) => {
			state.loading = false;
			state.service = action?.payload?.data;
			toast.success(action.payload?.message);
		});

		builder.addCase(deleteService.fulfilled, (state, action) => {
			state.loading = false;
			state.service = action?.payload?.data;
			toast.success(action.payload?.message || 'Service delete successfully');
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
					state.service = {};
					state.success = false;
				}
			);
	},
});

export default ServiceSlice.reducer;
