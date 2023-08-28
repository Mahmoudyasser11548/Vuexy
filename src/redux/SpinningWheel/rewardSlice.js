import axios from 'axios'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'

const API_BASE_URL = ''

export const addReward = createAsyncThunk(
  "rewards/add",
  async (reward, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(API_BASE_URL, reward)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const editReward = createAsyncThunk(
  "rewards/edit",
  async (reward, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.put(`${API_BASE_URL}/${reward.id}`, reward)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteReward = createAsyncThunk(
  "rewards/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
    return id 
  } catch (error) {
    return rejectWithValue(error.message)
  }
  
})

export const getRewards = createAsyncThunk(
  "rewards/get",
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
  rewards: [],
  reward_loading: false,
  reward_error: null,
  // Dialogs
  openDeleteDialog: false,
  openEditDialog: false
}

const rewardSlice = createSlice({
  name: 'spinRewards',
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
      // Get rewards
      .addCase(getRewards.fulfilled, (state, action) => {
        state.rewards = action.payload
      })

      // Add reward
      .addCase(addReward.fulfilled, (state, action) => {
        state.rewards.push(action.payload)
      })

      // Edit reward
      .addCase(editReward.fulfilled, (state, action) => {
        const index = state.rewards.findIndex((reward) => reward.id === action.payload.id)
        if (index > -1) {
          state.rewards[index] = action.payload
        }
      })

      // Delete reward
      .addCase(deleteReward.fulfilled, (state, action) => {
        state.rewards = state.rewards.filter((reward) => reward.id !== action.payload)
      })

      .addMatcher(
        isAnyOf(
          getRewards.pending,
          addReward.pending,
          deleteReward.pending,
          editReward.pending
        ),
        (state) => {
          state.reward_loading = true
        }
      )

      .addMatcher(
        isAnyOf(
          getRewards.fulfilled,
          addReward.fulfilled,
          deleteReward.fulfilled,
          editReward.fulfilled
        ),
        (state) => {
          state.reward_loading = false
        }
      )

      .addMatcher(
        isAnyOf(
          getRewards.rejected,
          addReward.rejected,
          deleteReward.rejected,
          editReward.rejected
        ),
        (state, action) => {
          state.reward_loading = false
          state.reward_error = action.error.message
        }
      )
  }
})

export const { showDeleteDialog, showEditDialog } = rewardSlice.actions

export default rewardSlice.reducer