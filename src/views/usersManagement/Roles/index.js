import { lazy } from "react"

const List = lazy(() => import('@src/views/usersManagement/Roles/List'))
const Details = lazy(() => import('@src/views/usersManagement/Roles/Details'))

const routes = [
  {
    path: 'user-management/roles/list',
    element: <List />,
    meta: {
      permission: "read_role"
    }
  },
  {
    path: 'user-management/roles/details/:id',
    element: <Details />,
    meta: {
      permission: "read_role"
    }
  },
  {
    path: 'user-management/roles/details/new',
    element: <Details />,
    meta: {
      permission: "read_role"
    }
  }
]

export default routes