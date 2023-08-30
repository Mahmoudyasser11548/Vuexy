import { lazy } from 'react'

const List = lazy(() => import('@src/views/usersManagement/Users/List'))
const Details = lazy(() => import("@src/views/usersManagement/Users/Details"))

const routes = [
  {
    path: "/user-managment/users/list",
    element: <List />,
    meta: {
      permission: "read_user"
    }
  },
  {
    path: "/user-management/users/details/:id",
    element: <Details />,
    meta: {
      permission: "read_user"
    }
  },
  {
    path: "/user-management/users/details/new",
    element: <Details />,
    meta: {
      permission: "read_user"
    }
  }
]

export default routes
