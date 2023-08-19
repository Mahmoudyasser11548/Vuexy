import { lazy } from "react"

const List = lazy(() => import("../../views/SpinningWheel/List"))
const DisplayedRewards = lazy(() => import("../../views/SpinningWheel/rewards/List"))
const DisplayedWheel = lazy(() => import("../../views/spinningWheel/displayedSpinningWheel"))

const routes = [
  {
    path: "/spinningWheel/list",
    element: <List />
  },
  {
    path: "/spinningWheel/displayed-rewards/:id",
    element: <DisplayedRewards />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/spinningWheel/displayed-wheel/:id",
    element: <DisplayedWheel />,
    meta: {
      layout: "blank",
      authRoute: true
    }
  }
]
export default routes
