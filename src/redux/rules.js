// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import axios from 'axios'


export const addRule = createAsyncThunk("rules/add", async (rule) => {
  const res = await axios.post('http://localhost:3000/rules', rule)
  return res.data
})

export const editRule = createAsyncThunk("rules/edit", async ({id}) => {
  const res = await axios.put(`http://localhost:3000/rules/${id}`)
  return res.data
})

export const deleteRule = createAsyncThunk("rules/delete", async (id) => {
  await axios.delete(`http://localhost:3000/rules/${id}`)
  return id
})

export const getRule = createAsyncThunk("rules/get", async () => {
  const res = await axios.get('http://localhost:3000/rules')
  return res.data
})

export const layoutSlice = createSlice({
  name: "rule",
  initialState: {
    Rule: [],
    error: false,
    loading: false
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(addRule.fulfilled,  (state, action) => {
      state.loading = false
      state.Rule = action.payload
    })
      .addCase(getRule.fulfilled, (state, action) => {
        state.loading = false
        state.Rule = action.payload
      })
      .addCase(editRule.fulfilled, (state, action) => {
        state.loading = false
        const index = state.Rule.findIndex((rule) => rule.id === action.payload.id)
        state.Rule[index] = action.payload
      })
      .addCase(deleteRule.fulfilled, (state, action) => {
        return state.Rule.filter(rule => rule.id !== action.payload.id)
      })
  }
})

export default layoutSlice.reducer
