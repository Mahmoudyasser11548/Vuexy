import { createSlice } from "@reduxjs/toolkit"

const API_BASE_URL = ''

export const addUser = createAsyncThunk(
  "users/add",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(API_BASE_URL, user)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
    return id 
  } catch (error) {
    return rejectWithValue(error.message)
  }
  
})

export const getUsers = createAsyncThunk(
  "users/get",
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
  users: [],
  user_loading: false,
  user_error: null,
  // dialogs
  openDeleteDialog: false,
  openEditDialog: false
}

const userSlice = createSlice({
  name: 'user',
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
      // Get Users
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })

      // Add User
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload)
      })

      .addMatcher(
        isAnyOf(
          getUsers.pending,
          addUser.pending,
          deleteUser.pending
        ),
        (state) => {
          state.user_loading = true
        }
      )

      .addMatcher(
        isAnyOf(
          getUsers.fulfilled,
          addUser.fulfilled,
          deleteUser.fulfilled
        ),
        (state) => {
          state.user_loading = false
        }
      )

      .addMatcher(
        isAnyOf(
          getUsers.rejected,
          addUser.rejected,
          deleteUser.rejected
        ),
        (state, action) => {
          state.user_loading = false
          state.user_error = action.error.message
        }
      )
  }
})


export const {showDeleteDialog, showEditDialog} = userSlice.actions

export default userSlice.reducer
