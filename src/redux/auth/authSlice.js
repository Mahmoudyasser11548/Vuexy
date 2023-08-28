import { createSlice } from '@reduxjs/toolkit'
import jwtDecoder from "jwt-decode"

const initialState = {
  login: null,
  user: null,
  isLoggedIn: false,
  token: null,
  loginError: undefined,
  notifications: [],
  // loading
  loginLoading: false,
  loginExternalLoading: false,
  // error
  changePassword_errors: null,
  loginExternalLoadingError: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const user = jwtDecoder(action.payload.token)
      state.user = user
      state.isLoggedIn = true
      state.loginLoading = false
      localStorage.setItem("userData", JSON.stringify(user))
      localStorage.setItem("jwtToken", action.payload.token)
      localStorage.setItem("refreshToken", action.payload.refreshToken)
      state.login = undefined
    },
    loginFail: (state, action) => {
      state.loginLoading = false
      state.loginError = action.payload
    },
    loginExternal: (state, action) => {
      const user = jwtDecoder(action.payload.token)
      state.user = user
      state.isLoggedIn = true
      state.loginLoading = false
      localStorage.setItem("userData", JSON.stringify(user))
      localStorage.setItem("jwtToken", action.payload.token)
      state.login = undefined
    },
    loginExternalFail: (state, action) => {
      state.loginExternalLoading = false
      state.loginExternalLoadingError = action.payload
    },
    updateToken: (state, action) => {
      const user = jwtDecoder(action.payload)
      if (user.active === false) {
        localStorage.removeItem("userData")
        localStorage.removeItem("jwtToken")
        state.user = undefined
        state.isLoggedIn = false
        return
      }
      state.user = user
      state.loginLoading = false
      localStorage.setItem("userData", JSON.stringify(user))
      localStorage.setItem("jwtToken", action.payload)
    },
    resetPassword: (state) => {
      state.changePassword_errors = null
    },
    refreshToken: (state, action) => {
      localStorage.setItem("jwtToken", action.payload.token)
      localStorage.setItem("refreshToken", action.payload.refreshToken)
      state.refreshToken = undefined
    },
    refreshTokenFailure: (state) => {
      localStorage.removeItem("userData")
      localStorage.removeItem("jwtToken")
      localStorage.removeItem("refreshToken")
    
      state.user = undefined
      state.isLoggedIn = false
    },
    switchAsTenant: (state, action) => {
      if (!action.payload) return
      const { tenantId, switched } = action.payload
      if (!switched) {
        localStorage.removeItem("t__id")
        state.user = { ...state.user, switched: false }
        return
      }
      localStorage.setItem("t__id", tenantId)
      state.user = { ...state.user, switched: true }
    },
    logout: (state) => {
      localStorage.removeItem("userData")
      localStorage.removeItem("jwtToken")
      localStorage.removeItem("refreshToken")
      state.user = undefined
      state.refreshToken = undefined
      state.isLoggedIn = false
    }
  }
})

export const {
  loginSuccess, 
  loginFail,
  loginExternalSuccess, 
  loginExternalFail,
  updateTokenSuccess, 
  resetPasswordSuccess, 
  refreshTokenSuccess,
  refreshTokenFailure,
  switchAsTenantSuccess,
  logout
} = authSlice.actions

export default authSlice.reducer