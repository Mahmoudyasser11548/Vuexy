import { lazy } from "react"

const List = lazy(() => import("../../views/SpinningWheel/List"))

const routes = [
  {
    path: "/spinningWheel/list",
    element: <List />
  }
]
export default routes
