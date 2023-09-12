import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

const API_BASE_URL = ""

export const addSegmant = createAsyncThunk(
  "segmants/add",
  async (segmant, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await axios.post(API_BASE_URL, segmant)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editSegmant = createAsyncThunk(
  "segmants/edit",
  async (segmant, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await axios.put(`${API_BASE_URL}/${segmant.id}`, segmant)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteSegmant = createAsyncThunk(
  "segmants/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      await axios.delete(`${API_BASE_URL}/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getSegmants = createAsyncThunk(
  "segmants/get",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await axios.get(API_BASE_URL)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  segmants: [],
  segmant_loading: false,
  segmant_error: null,
  // Dialogs
  openDeleteDialog: false,
  openEditDialog: false,
}

const segmantSlice = createSlice({
  name: "spinSegmants",
  initialState: initialState,
  reducers: {
    showDeleteDialog: (state) => {
      state.openDeleteDialog = !state.openDeleteDialog
    },
    showEditDialog: (state) => {
      state.openEditDialog = !state.openEditDialog
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Segmants
      .addCase(getSegmants.fulfilled, (state, action) => {
        state.segmants = action.payload
      })

      // Add Segmant
      .addCase(addSegmant.fulfilled, (state, action) => {
        state.segmants.push(action.payload)
      })

      // Edit Segmant
      .addCase(editSegmant.fulfilled, (state, action) => {
        const index = state.segmants.findIndex(
          (segmant) => segmant.id === action.payload.id
        )
        if (index > -1) {
          state.segmants[index] = action.payload
        }
      })

      // Delete Segmant
      .addCase(deleteSegmant.fulfilled, (state, action) => {
        state.segmants = state.segmants.filter(
          (segmant) => segmant.id !== action.payload
        )
      })
  },
})

export const { showDeleteDialog, showEditDialog } = segmantSlice.actions

export default segmantSlice.reducer
