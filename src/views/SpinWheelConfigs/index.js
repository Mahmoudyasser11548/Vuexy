import { lazy } from "react"

const WholeTabs = lazy(() => import("../../views/SpinWheelConfigs/WholeTabs"))
const Wheel = lazy(() => import("@src/views/SpinWheelConfigs/Wheel"))
const ExtraData = lazy(() => import("@src/views/spinWheel/ExtraData/ExtraDataPage"))

const routes = [
  {
    path: "/spinWheel/tabs/new",
    element: <WholeTabs />
  },
  {
    path: "/spinWheel/tabs/:id",
    element: <WholeTabs />
  },
  {
    path: "/spinWheel/wheel",
    element: <Wheel />
  },
  {
    path: "/extra/list/:id",
    element: <ExtraData />
  }
]

export default routes