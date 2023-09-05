import { createSlice } from "@reduxjs/toolkit"

const API_BASE_URL = ''

export const addConfig = createAsyncThunk(
  "configs/add",
  async (config, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(API_BASE_URL, config)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const editConfig = createAsyncThunk(
  "configs/edit",
  async (config, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.put(`${API_BASE_URL}/${config.id}`, config)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteConfig = createAsyncThunk(
  "configs/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
    return id 
  } catch (error) {
    return rejectWithValue(error.message)
  }
  
})

export const getConfigs = createAsyncThunk(
  "configs/get",
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
  configs: [],
  configs_loading: false,
  configs_error: null,
  // Dialogs
  openDeleteDialog: false,
  openEditDialog: false
}

const integrationSlice = createSlice({
  name: 'integration',
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
    // Get Configs
    .addCase(getConfigs.fulfilled, (state, action) => {
      state.configs = action.payload
    })

    // Add Config
    .addCase(addConfig.fulfilled, (state, action) => {
      state.configs.push(action.payload)
    })

    // Edit Config
    .addCase(editConfig.fulfilled, (state, action) => {
      const index = state.configs.findIndex((config) => config.id === action.payload.id)
      if (index > -1) {
        state.configs[index] = action.payload
      }
    })

    // Delete Config
    .addCase(deleteConfig.fulfilled, (state, action) => {
      state.configs = state.configs.filter((config) => config.id !== action.payload)
    })

    .addMatcher(
      isAnyOf(
        getConfigs.pending,
        addConfig.pending,
        deleteConfig.pending,
        editConfig.pending
      ),
      (state) => {
        state.configs_loading = true
      }
    )

    .addMatcher(
      isAnyOf(
        getConfigs.fulfilled,
        addConfig.fulfilled,
        deleteConfig.fulfilled,
        editConfig.fulfilled
      ),
      (state) => {
        state.configs_loading = false
      }
    )

    .addMatcher(
      isAnyOf(
        getConfigs.rejected,
        addConfig.rejected,
        deleteConfig.rejected,
        editConfig.rejected
      ),
      (state, action) => {
        state.configs_loading = false
        state.configs_error = action.error.message
      }
    )
  }
})

export const { showDeleteDialog, showEditDialog } = integrationSlice.actions

export default integrationSlice.reducer