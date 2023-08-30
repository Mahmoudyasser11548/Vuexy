import { Trans } from "@lingui/react"
import React from "react"
import { Aperture, User, Users } from "react-feather"

export default [
  {
    id: "spinningWheel",
    title: <Trans id="Spin Wheel" />,
    icon: <Aperture size={20} />,
    navLink: "/spinningWheel/list"
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
  }
]
