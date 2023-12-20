import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api, { handleApiError } from '../../configs/Api';
import { toast } from "react-toastify";
import { errorMsg } from "../../Components/Global/Toastify/Toastify";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const registerUser = createAsyncThunk('auth/register',async(userData,{rejectWithValue})=>{
  try {
    const response =await Api.post('/auth/register',userData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const currentUser = createAsyncThunk(
  "auth/current-user",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/current-user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/update-profile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.patch(`/users/update-profile`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/*********** Admin *************** */
export const getAllUsers = createAsyncThunk(
  "users/get-all",
  async (queries, { rejectWithValue }) => {
    try {
      const { page, fieldValue, fieldName, searchBy, searchValue } = queries;
      console.log({ page, fieldValue, fieldName, searchBy, searchValue });
      const response = await Api.get(
        `/users/get-all?page=${page}&fieldName=${fieldName}&fieldValue=${fieldValue}&searchBy=${searchBy}&searchValue=${searchValue}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createUser = createAsyncThunk(
  "users/create-by-admin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/users/create-by-admin", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUser = createAsyncThunk(
  "users/get-one",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/users/get-one/${_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await Api.get("/users/get-user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  "users/update-by-admin",
  async ({ _id, userData }, { rejectWithValue }) => {
    try {
      console.log(_id, userData);
      const response = await Api.patch(
        `/users/update-by-admin/${_id}`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "users/delete-user",
  async ({ _id }, { rejectWithValue }) => {
    try {
      console.log(_id);
      const response = await Api.delete(`/users/delete-user/${_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    getUser: null,
    pagination: [],
    loading: false,
    error: null,
    success: true,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.isAuthenticated=true;
      }) 
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = payload.data;
        console.log(state.user);
        console.log(state.user.role);
        console.log(state.isAuthenticated)

      
      })      
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            console.log(payload.error);
            payload.error.map((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        // Handle logout error if needed
        console.error("Logout error:", payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true
        state.isAuthenticated = true
        state.user= payload.data
    })            
    .addCase(registerUser.rejected, (state,{payload} ) => {
        state.loading = false;
        if (payload) {
            if (Array.isArray(payload.error)) {
                console.log(payload.error);
                payload.error.map(err => errorMsg(err.message));
            } else if (payload.success === false && payload.error) {
                state.error = payload.error;
                state.success = payload.success;
            } else {
                state.error = "An unknown error occurred";
            }
        } else {
            state.error = "Network error occurred";
        }
    })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        // console.log("currentUser",payload);
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = payload.data;
      })

      .addCase(currentUser.rejected, (state, { payload }) => {
        console.log("currentUser error", payload);
        state.error = payload.error;
        state.success = payload.success;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.data;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            console.log(payload.error);
            payload.error.map((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.getUser = payload.data;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            console.log(payload.error);
            payload.error.map((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        console.log(payload.pagination);
        state.pagination = payload.pagination;
        state.users = payload.data;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.getUser = payload.data;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            console.log(payload.error);
            payload.error.map((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      });
  },
});
export default user.reducer;
 