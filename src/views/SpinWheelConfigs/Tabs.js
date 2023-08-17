import React from 'react'
import { Nav, NavItem, NavLink } from "reactstrap"
import { Aperture, Gift, Layers, User } from "react-feather"

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <>
      <Nav pills>
        <NavItem>
          <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
            <Aperture size={18} className="mr-1" />
            <span className="font-weight-bold">
              Spinning Wheel
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
            <User size={18} className="mr-1" />
            <span className="font-weight-bold">
              Fields
            </span>
          </NavLink>
          </NavItem>
        <NavItem>
          <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
            <Gift size={18} className="mr-1" />
            <span className="font-weight-bold">
              Rewards
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
            <Layers size={18} className="mr-1" />
            <span className="font-weight-bold">
              Segmants
            </span>
          </NavLink>
        </NavItem>
      </Nav>
    </>
  )
}

export default Tabs