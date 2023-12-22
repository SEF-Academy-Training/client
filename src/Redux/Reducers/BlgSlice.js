import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api, { apiOption, handleApiError } from '../../configs/Api';
import { toast } from 'react-toastify';

export const getAllBlogs = createAsyncThunk(
	'BlogSlice/getAllBlogs',
	async (queries, { rejectWithValue }) => {
		const { filter = {}, page = 1, limit = 10 } = queries;
		try {
			const res = await Api.get(`/blogs?page=${page}&limit=${limit}`, {
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

export const getOneBlog = createAsyncThunk(
	'BlogSlice/getOneBlog',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.get(`/blogs/${id}`);
			console.log('res', res);
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const createBlog = createAsyncThunk(
	'BlogSlice/createBlog',
	async (data, { rejectWithValue }) => {
		console.log('data', data);
		try {
			const res = await Api.post('/blogs', data, apiOption);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const updateBlog = createAsyncThunk(
	'BlogSlice/updateBlog',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const res = await Api.patch(`/blogs/${id}`, data, apiOption);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);

			handleApiError(error);
		}
	}
);

export const deleteBlog = createAsyncThunk(
	'BlogSlice/deleteBlog',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.delete(`/blogs/${id}`);
			return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);

			handleApiError(error);
		}
	}
);

export const BlogSlice = createSlice({
	name: 'BlogSlice',
	initialState: {
		blogs: [],
		pagination: null,
		blog: null,
		loading: false,

		error: null,
		message: null,
		success: false,
	},

	extraReducers: (builder) => {
		// builder.addCase(getAllBlogs.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.blogs = [];
		// 	state.pagination = null;
		// 	console.log(action);
		// });
		builder.addCase(getAllBlogs.fulfilled, (state, action) => {
			state.loading = false;
			state.blogs = action?.payload?.data;
			state.pagination = action?.payload?.pagination;
		});
		// builder.addCase(getAllBlogs.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.blogs = [];
		// 	state.pagination = null;
		// 	console.log(action);
		// });

		// builder.addCase(getOneBlog.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.blog = null;
		// });
		builder.addCase(getOneBlog.fulfilled, (state, action) => {
			state.loading = false;
			state.blog = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(getOneBlog.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.blog = null;
		// });

		// builder.addCase(createBlog.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.blog = null;
		// });
		builder.addCase(createBlog.fulfilled, (state, action) => {
			state.loading = false;
			state.blog = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(createBlog.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.blog = null;
		// });

		// builder.addCase(updateBlog.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.blog = null;
		// });
		builder.addCase(updateBlog.fulfilled, (state, action) => {
			state.loading = false;
			state.blog = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(updateBlog.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.blog = null;
		// });

		// builder.addCase(deleteBlog.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.blog = null;
		// });
		builder.addCase(deleteBlog.fulfilled, (state, action) => {
			state.loading = false;
			state.blog = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(deleteBlog.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.blog = null;
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
			// 		state.blogs =
			// 			Array.isArray(action?.payload?.data) && action?.payload?.data;
			// 		state.blog = !Array.isArray(action.payload.data) && action?.payload?.data;
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
					state.course = {};
					state.success = false;
				}
			);
	},
});

export default BlogSlice.reducer;
