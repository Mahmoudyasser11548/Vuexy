import { createSlice } from "@reduxjs/toolkit"

const API_BASE_URL = ""

export const addGuest = createAsyncThunk(
  "guests/add",
  async (guest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await axios.post(API_BASE_URL, guest)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editGuestReward = createAsyncThunk(
  "guests/edit",
  async (guest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await axios.put(`${API_BASE_URL}/${guest.id}`, guest)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteGuest = createAsyncThunk(
  "guests/delete",
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

export const getGuests = createAsyncThunk("guests/get", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.get(API_BASE_URL)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  guests: [],
  guest_loading: false,
  guest_error: null,
}

const guestSlice = createSlice({
  name: "guest",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Guests
      .addCase(getGuests.fulfilled, (state, action) => {
        state.guests = action.payload
      })

      // Add Guest
      .addCase(addGuest.fulfilled, (state, action) => {
        state.guests.push(action.payload)
      })

      // Edit Guest
      .addCase(editGuestReward.fulfilled, (state, action) => {
        const index = state.guests.findIndex(
          (guest) => guest.id === action.payload.id
        )
        if (index > -1) {
          state.guests[index] = action.payload
        }
      })

      // Delete Guest
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.guests = state.guests.filter(
          (guest) => guest.id !== action.payload
        )
      })
  },
})

export default guestSlice.reducer
