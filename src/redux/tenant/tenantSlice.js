import { createSlice } from "@reduxjs/toolkit"

const API_BASE_URL = ''

export const addTenant = createAsyncThunk(
  "tenants/add",
  async (tenant, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(API_BASE_URL, tenant)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const editTenant = createAsyncThunk(
  "tenants/edit",
  async (tenant, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.put(`${API_BASE_URL}/${tenant.id}`, tenant)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteTenant = createAsyncThunk(
  "tenants/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
    return id 
  } catch (error) {
    return rejectWithValue(error.message)
  }
  
})

export const getTenants = createAsyncThunk(
  "tenants/get",
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
  tenants: [],
  tenant_loading: false, 
  tenant_error: null,
  // dialogs
  openDeleteDialog: false,
  openEditDialog: false
}

const tenantSlice = createSlice({
  name: 'tenant',
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
      // Get tenants
      .addCase(getTenants.fulfilled, (state, action) => {
        state.tenants = action.payload
      })

      // Add tenant
      .addCase(addTenant.fulfilled, (state, action) => {
        state.tenants.push(action.payload)
      })

      // Edit tenant
      .addCase(editTenant.fulfilled, (state, action) => {
        const index = state.tenants.findIndex((tenant) => tenant.id === action.payload.id)
        if (index > -1) {
          state.tenants[index] = action.payload
        }
      })

      // Delete tenant
      .addCase(deleteTenant.fulfilled, (state, action) => {
        state.tenants = state.tenants.filter((tenant) => tenant.id !== action.payload)
      })

      .addMatcher(
        isAnyOf(
          getTenants.pending,
          addTenant.pending,
          deleteTenant.pending,
          editTenant.pending
        ),
        (state) => {
          state.tenant_loading = true
        }
      )

      .addMatcher(
        isAnyOf(
          getTenants.fulfilled,
          addTenant.fulfilled,
          deleteTenant.fulfilled,
          editTenant.fulfilled
        ),
        (state) => {
          state.tenant_loading = false
        }
      )

      .addMatcher(
        isAnyOf(
          getTenants.rejected,
          addTenant.rejected,
          deleteTenant.rejected,
          editTenant.rejected
        ),
        (state, action) => {
          state.tenant_loading = false
          state.tenant_error = action.error.message
        }
      )
  }
})

export const {showDeleteDialog, showEditDialog} = tenantSlice.actions

export default tenantSlice.reducer
