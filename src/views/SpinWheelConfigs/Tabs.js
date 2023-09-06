import React from 'react'
import { Nav, NavItem, NavLink } from "reactstrap"
import { Aperture, Gift, Layers } from "react-feather"
import { Trans } from '@lingui/react'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <>
      <Nav pills>
        <NavItem>
          <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
            <Aperture size={18} className="mr-1" />
            <span className="font-weight-bold">
              <Trans id="Spinning_Wheel" />
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
            <Gift size={18} className="mr-1" />
            <span className="font-weight-bold">
              <Trans id="Rewards" />
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
            <Layers size={18} className="mr-1" />
            <span className="font-weight-bold">
              <Trans id="Segmants" />
            </span>
          </NavLink>
        </NavItem>
      </Nav>
    </>
  )
}

export default Tabs