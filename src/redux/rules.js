// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/rules'

export const addRule = createAsyncThunk("rules/add", async (rule) => {
  const res = await axios.post(API_BASE_URL, rule)
  return res.data
})

export const editRule = createAsyncThunk('rules/edit', async (rule) => {
  const res = await axios.put(`${API_BASE_URL}/${rule.id}`, rule)
  return res.data
})

export const deleteRule = createAsyncThunk('rules/delete', async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`)
  return id
})

export const getRule = createAsyncThunk("rules/get", async () => {
  const res = await axios.get(API_BASE_URL)
  return res.data
})

export const ruleSlice = createSlice({
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
      state.Rule.push(action.payload)
    })
    .addCase(getRule.fulfilled, (state, action) => {
      state.loading = false
      state.Rule = action.payload
    })
    .addCase(editRule.fulfilled, (state, action) => {
      state.loading = false
      const index = state.Rule.findIndex((rule) => rule.id === action.payload.id)
      if (index > -1) {
        state.Rule[index] = action.payload
      }
    })
    .addCase(deleteRule.fulfilled, (state, action) => {
      state.loading = false
      state.Rule = state.Rule.filter(rule => rule.id !== action.payload)
    })
  }
})

export default ruleSlice.reducer
