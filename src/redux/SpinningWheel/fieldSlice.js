import axios from 'axios'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'

const API_BASE_URL = ''

export const addField = createAsyncThunk(
  "fields/add",
  async (field, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(API_BASE_URL, field)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})


export const deleteField = createAsyncThunk(
  "fields/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
    return id 
  } catch (error) {
    return rejectWithValue(error.message)
  }
  
})

export const getFields = createAsyncThunk(
  "fields/get",
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
  fields: [],
  field_loading: false,
  field_error: null,
  // Dialogs
  openDeleteDialog: false,
  openEditDialog: false
}

const fieldSlice = createSlice({
  name: 'spinFields',
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
      // Get Fields
      .addCase(getFields.fulfilled, (state, action) => {
        state.fields = action.payload
      })

      // Add Field
      .addCase(addField.fulfilled, (state, action) => {
        state.fields.push(action.payload)
      })

      // Delete Field
      .addCase(deleteField.fulfilled, (state, action) => {
        state.fields = state.fields.filter((field) => field.id !== action.payload)
      })

      .addMatcher(
        isAnyOf(
          getFields.pending,
          addField.pending,
          deleteField.pending
        ),
        (state) => {
          state.field_loading = true
        }
      )

      .addMatcher(
        isAnyOf(
          getFields.fulfilled,
          addField.fulfilled,
          deleteField.fulfilled
        ),
        (state) => {
          state.field_loading = false
        }
      )

      .addMatcher(
        isAnyOf(
          getFields.rejected,
          addField.rejected,
          deleteField.rejected
        ),
        (state, action) => {
          state.field_loading = false
          state.field_error = action.error.message
        }
      )
  }
})

export const { showDeleteDialog, showEditDialog } = fieldSlice.actions

export default fieldSlice.reducer