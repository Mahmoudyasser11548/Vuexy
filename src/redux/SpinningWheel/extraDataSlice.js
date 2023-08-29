import axios from 'axios'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'

const API_BASE_URL = ''

export const addExtraData = createAsyncThunk(
  "extraData/add",
  async (extraData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(API_BASE_URL, extraData)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})


export const deleteExtraData = createAsyncThunk(
  "extraData/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
    return id 
  } catch (error) {
    return rejectWithValue(error.message)
  }
  
})

export const getExtraData = createAsyncThunk(
  "extraData/get",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.get(API_BASE_URL)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})


const initialState = {
  extraData: [],
  extraData_loading: false,
  extraData_error: null,
  // Dialogs
  openDeleteDialog: false,
  openEditDialog: false
}

const extraDataSlice = createSlice({
  name: 'extraData',
  initialState: initialState,
  reducers: {
    showDeleteDialog: (state) => {
      state.openDeleteDialog = !state.openDeleteDialog
    },
    showEditDialog: (state) => {
      state.openEditDialog = !state.openEditDialog
    }
  },
  extraReducers: (builder) => {
    builder
      // Get ExtraData
      .addCase(getExtraData.fulfilled, (state, action) => {
        state.extraData = action.payload
      })

      // Add ExtraData
      .addCase(addExtraData.fulfilled, (state, action) => {
        state.extraData.push(action.payload)
      })

      // Delete ExtraData
      .addCase(deleteExtraData.fulfilled, (state, action) => {
        state.extraData = state.extraData.filter((data) => data.id !== action.payload)
      })

      .addMatcher(
        isAnyOf(
          getExtraData.pending,
          addExtraData.pending,
          deleteExtraData.pending
        ),
        (state) => {
          state.extraData_loading = true
        }
      )

      .addMatcher(
        isAnyOf(
          getExtraData.fulfilled,
          addExtraData.fulfilled,
          deleteExtraData.fulfilled
        ),
        (state) => {
          state.extraData_loading = false
        }
      )

      .addMatcher(
        isAnyOf(
          getExtraData.rejected,
          addExtraData.rejected,
          deleteExtraData.rejected
        ),
        (state, action) => {
          state.extraData_loading = false
          state.extraData_error = action.error.message
        }
      )
  }
})

export const { showDeleteDialog, showEditDialog } = extraDataSlice.actions

export default extraDataSlice.reducer