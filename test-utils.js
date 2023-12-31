import { render, renderHook } from "@testing-library/react"

import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import React from "react"
import { ThemeContext } from "./src/utility/context/ThemeColors"
import { configureStore } from "@reduxjs/toolkit"
// As a basic setup, import your same slice reducers
import rootReducer from "./src/store/rootReducer"

export function renderWithProviders(
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: rootReducer }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ThemeContext>{children}</ThemeContext>
        </Provider>
      </BrowserRouter>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
export function renderHooksWithProviders(
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: rootReducer }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ThemeContext>{children}</ThemeContext>
        </Provider>
      </BrowserRouter>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...renderHook(ui, { wrapper: Wrapper, ...renderOptions }) }
}
