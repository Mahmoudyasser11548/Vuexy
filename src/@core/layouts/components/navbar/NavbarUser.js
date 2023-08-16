import { Fragment } from "react";

// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"
import IntlDropdown from './IntlDropdown'

// ** Third Party Components
import { Sun, Moon, Menu } from "react-feather";

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap";

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu me-auto">
            <NavLink
              className="nav-menu-main menu-toggle hidden-xs is-active"
              onClick={() => setMenuVisibility(true)}
            >
              <Menu className="ficon" />
            </NavLink>
          </NavItem>
        </ul>
        <NavItem className="d-none d-lg-block">
          <NavLink className="nav-link-style">
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div>
      <ul className="nav navbar-nav align-items-center ms-auto">
        <IntlDropdown />
        <UserDropdown />
      </ul>
    </Fragment>
  )
}
export default NavbarUser
