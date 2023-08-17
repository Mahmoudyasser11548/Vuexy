import { lazy } from "react"

const WholeTabs = lazy(() => import("../../views/SpinWheelConfigs/WholeTabs"))

const routes = [
  {
    path: "/spinWheel/tabs/new",
    element: <WholeTabs />
  }
]

export default routes