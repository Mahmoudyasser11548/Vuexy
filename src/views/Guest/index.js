import { lazy } from "react"

const List = lazy(() => import("@src/views/Guest/List"))
const Registration = lazy(() => import("@src/views/Guest/Details"))

const routes = [
  {
    path: "/guests/list",
    element: <List />
  },
  {
    path: "/guests/registration/:id",
    element: <Registration />,
    meta: {
      layout: "blank",
      authRoute: true
    }
  },
  {
    path: "/guests/registration/new",
    element: <Registration />,
    meta: {
      layout: "blank",
      authRoute: true
    }
  }
]

export default routes