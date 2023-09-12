// ** Ripple Button
import "./@core/components/ripple-button"
// ** PrismJS
import "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-jsx.min"
// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css"
// ** React Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss"
// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css"
import "./@core/scss/core.scss"
import "./assets/scss/style.scss"

// ** Service Worker
import * as serviceWorker from "./serviceWorker"

// ** React Imports
import { Suspense, lazy } from "react"

import { BrowserRouter } from "react-router-dom"
// Intl Provider
import { IntlProviderWrapper } from "./utility/context/Internationalization"
import { Provider } from "react-redux"
// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner"
import { ThemeContext } from "./utility/context/ThemeColors"
// ** Toast
import { Toaster } from "react-hot-toast"
import { createRoot } from "react-dom/client"
// ** Redux Imports
import { store } from "./store/store"
// ** ThemeConfig
import themeConfig from "./configs/themeConfig"

// ** ThemeColors Context

// ** Lazy load app
const LazyApp = lazy(() => import("./App"))

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <ThemeContext>
          <IntlProviderWrapper>
            <LazyApp />
            <Toaster
              position={themeConfig.layout.toastPosition}
              toastOptions={{ className: "react-hot-toast" }}
            />
          </IntlProviderWrapper>
        </ThemeContext>
      </Suspense>
    </Provider>
  </BrowserRouter>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
