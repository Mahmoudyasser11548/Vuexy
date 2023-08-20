// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"
import { Trans } from "@lingui/react"

const UserDropdown = () => {
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">Admin</span>
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/login">
          <Power size={14} className="me-75" />
          <span className="align-middle"><Trans id="Logout" /></span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
