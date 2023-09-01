import { lazy } from "react"

const Details = lazy(() => import("src/views/Integration/Details"))
const List = lazy(() => import("src/views/Integration/List"))

const routes = [
  {
    path: "/configs/details/:id",
    element: <Details />
    // meta: {
    //   permission: "read_user",
    // },
  },
  {
    path: "/configs/details/new",
    element: <Details />
    // meta: {
    //   permission: "read_user",
    // },
  },
  {
    path: "/configs/list",
    element: <List />
    // meta: {
    //   permission: "read_user",
    // },
  }
]

export default routes
