import { createAsyncThunk } from "@reduxjs/toolkit"
import Api, { handleApiError } from '../../configs/Api';
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { errorMsg } from "../../Components/Global/Toastify/Toastify";

export const contactUs = createAsyncThunk('users/contact-us',async(contactData,{rejectWithValue})=>{
  try {
    const response =await Api.post('/users/contact-us',contactData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
 
const contactUsSlice = createSlice({
    name: "contactUs",
    initialState: { 
        loading: false,
        error: null,
        success: true, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(contactUs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(contactUs.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
                state.isAuthenticated = true
                state.user= payload.data
            })            
            .addCase(contactUs.rejected, (state,{payload} ) => {
                state.loading = false;
                if (payload) {
                    if (Array.isArray(payload.error)) {
                        console.log(payload.error);
                        payload.error.map(err => toast.error(err.message));
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
          

    }
})
export default contactUsSlice.reducer