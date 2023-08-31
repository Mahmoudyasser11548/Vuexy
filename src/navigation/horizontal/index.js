import React from "react"
import { Trans } from "@lingui/react"
import { Aperture, User, Users } from "react-feather"

export default [
  {
    id: "spinningWheel",
    title: <Trans id="Spin Wheel" />,
    icon: <Aperture size={20} />,
    navLink: "/spinningWheel/list"
  },
  {
    id: "guests",
    title: <Trans id="Guests" />,
    icon: <Aperture size={20} />,
    navLink: "/guests/list"
  },
  {
    id: "tenants",
    title: <Trans id="Tenants" />,
    icon: <User size={20} />,
    navLink: "/tenant/list",
    permissions: "read_user"
  },
  {
    id: "users",
    title: <Trans id="Users" />,
    icon: <Users size={20} />,
    navLink: "/user-managment/users/list",
    permissions: "read_user"
  },
  {
    id: "roles",
    title: <Trans id="Roles" />,
    icon: <Users size={20} />,
    navLink: "/user-management/roles/list",
    permissions: "read_role"
  }
]
