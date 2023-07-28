import React from "react"
import { Mail, Home, List } from "react-feather"

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home"
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page"
  },
  {
    id: "rules",
    title: "Rules",
    icon: <List size={20} />,
    navLink: "/rules"
  }
]
