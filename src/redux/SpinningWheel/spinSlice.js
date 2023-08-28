import axios from 'axios'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'

const API_BASE_URL = ''

export const addSpin = createAsyncThunk(
  "spins/add",
  async (spin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(API_BASE_URL, spin)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const editSpin = createAsyncThunk(
  "spins/edit",
  async (spin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.put(`${API_BASE_URL}/${spin.id}`, spin)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteSpin = createAsyncThunk(
  "spins/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
    return id 
  } catch (error) {
    return rejectWithValue(error.message)
  }
  
})

export const getSpins = createAsyncThunk(
  "spins/get",
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
  spins: [],
  spin_loading: false,
  spin_error: null,
  // Dialogs
  openDeleteDialog: false,
  openEditDialog: false
}

const spinSlice = createSlice({
  name: 'spinningWheel',
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
      // Get Spins
      .addCase(getSpins.fulfilled, (state, action) => {
        state.spins = action.payload
      })

      // Add Spin
      .addCase(addSpin.fulfilled, (state, action) => {
        state.spins.push(action.payload)
      })

      // Edit Spin
      .addCase(editSpin.fulfilled, (state, action) => {
        const index = state.spins.findIndex((spin) => spin.id === action.payload.id)
        if (index > -1) {
          state.spins[index] = action.payload
        }
      })

      // Delete Spin
      .addCase(deleteSpin.fulfilled, (state, action) => {
        state.spins = state.spins.filter((spin) => spin.id !== action.payload)
      })

      .addMatcher(
        isAnyOf(
          getSpins.pending,
          addSpin.pending,
          deleteSpin.pending,
          editSpin.pending
        ),
        (state) => {
          state.spin_loading = true
        }
      )

      .addMatcher(
        isAnyOf(
          getSpins.fulfilled,
          addSpin.fulfilled,
          deleteSpin.fulfilled,
          editSpin.fulfilled
        ),
        (state) => {
          state.spin_loading = false
        }
      )

      .addMatcher(
        isAnyOf(
          getSpins.rejected,
          addSpin.rejected,
          deleteSpin.rejected,
          editSpin.rejected
        ),
        (state, action) => {
          state.spin_loading = false
          state.spin_error = action.error.message
        }
      )
  }
})

export const { showDeleteDialog, showEditDialog } = spinSlice.actions

export default spinSlice.reducer