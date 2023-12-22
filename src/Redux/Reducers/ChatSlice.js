import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api, { handleApiError } from '../../configs/Api';
import { toast } from 'react-toastify';

export const getUsersWithMessages = createAsyncThunk(
	'ChatSlice/getUsersWithMessages',
	async (queries, { rejectWithValue }) => {
		try {
			const res = await Api.get(`/chat`);
			console.log('res', res);
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const getUserMessages = createAsyncThunk(
	'ChatSlice/getUserMessages',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.get(`/chat/${id}`);
			console.log('res', res);
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const getUserMyMessages = createAsyncThunk(
	'ChatSlice/getUserMyMessages',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.get(`/chat/my-messages`);
			console.log('res', res);
			return res.data;
		} catch (error) {
			console.log('error', error);
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const sendMessage = createAsyncThunk(
	'ChatSlice/sendMessage',
	async (data, { rejectWithValue }) => {
		try {
			const res = await Api.post('/chat/send-message', data);
			getUserMyMessages();
			// return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

export const sendfile = createAsyncThunk(
	'ChatSlice/sendfile',
	async (data, { rejectWithValue }) => {
		try {
			const res = await Api.post('/chat/send-file', data);
			getUserMyMessages();
			// return res.data;
		} catch (error) {
			// return rejectWithValue(error.message);
			throw handleApiError(error);
		}
	}
);

// export const updateChat = createAsyncThunk(
// 	'ChatSlice/updateChat',
// 	async ({ id, data }, { rejectWithValue }) => {
// 		try {
// 			const res = await Api.patch(`/Chats/${id}`, data);
// 			return res.data;
// 		} catch (error) {
// 			// return rejectWithValue(error.message);

// 			handleApiError(error);
// 		}
// 	}
// );

// export const deleteChat = createAsyncThunk(
// 	'ChatSlice/deleteChat',
// 	async (id, { rejectWithValue }) => {
// 		try {
// 			const res = await Api.delete(`/Chats/${id}`);
// 			return res.data;
// 		} catch (error) {
// 			// return rejectWithValue(error.message);

// 			handleApiError(error);
// 		}
// 	}
// );

export const ChatSlice = createSlice({
	name: 'ChatSlice',
	initialState: {
		chats: [],
		chat: [],
		loading: false,

		error: null,
		message: null,
		success: false,
	},

	extraReducers: (builder) => {
		// builder.addCase(getAllChats.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.chats = [];
		// 	state.pagination = null;
		// 	console.log(action);
		// });
		builder.addCase(getUsersWithMessages.fulfilled, (state, action) => {
			state.loading = false;
			state.chats = action?.payload?.data;
		});
		// builder.addCase(getAllChats.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.chats = [];
		// 	state.pagination = null;
		// 	console.log(action);
		// });

		// builder.addCase(getOneChat.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.chat = null;
		// });
		builder.addCase(getUserMessages.fulfilled, (state, action) => {
			state.loading = false;
			state.chat = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(getOneChat.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.chat = null;
		// });

		// builder.addCase(createChat.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.chat = null;
		// });

		builder.addCase(getUserMyMessages.fulfilled, (state, action) => {
			state.loading = false;
			state.chat = action?.payload?.data;
			console.log('action?.payload?.data', action?.payload?.data);
			// toast.success(action.payload?.message);
		});


		builder.addCase(sendMessage.fulfilled, (state, action) => {
			state.loading = false;
			state.chat = action?.payload?.data;
			toast.success(action.payload?.message);
		});

		builder.addCase(sendfile.fulfilled, (state, action) => {
			state.loading = false;
			state.chat = action?.payload?.data;
			toast.success(action.payload?.message);
		});
		// builder.addCase(createChat.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.chat = null;
		// });

		// builder.addCase(updateChat.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.chat = null;
		// });
		// builder.addCase(updateChat.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.chat = action?.payload?.data;
		// 	toast.success(action.payload?.message);
		// });
		// builder.addCase(updateChat.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.chat = null;
		// });

		// builder.addCase(deleteChat.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.chat = null;
		// });
		// builder.addCase(deleteChat.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.chat = action?.payload?.data;
		// 	toast.success(action.payload?.message);
		// });
		// builder.addCase(deleteChat.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.chat = null;
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
			// 		state.chats =
			// 			Array.isArray(action?.payload?.data) && action?.payload?.data;
			// 		state.chat = !Array.isArray(action.payload.data) && action?.payload?.data;
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
					console.log('action.payload rejected', action.payload);
					state.success = false;
				}
			);
	},
});

export default ChatSlice.reducer;
