import { lazy } from "react"

const List = lazy(() => import("../../views/tenant/List"))
const Details = lazy(() => import("../../views/tenant/Details"))

const routes = [
  {
    path: "/tenant/list",
    element: <List />,
    meta: {
      permission: "read_user"
    }
  },
  {
    path: "/tenant/details/:id",
    element: <Details />,
    meta: {
      permission: "read_user"
    }
  },
  {
    path: "/tenant/details/new",
    element: <Details />,
    meta: {
      permission: "read_user"
    }
  }
]
export default routes
