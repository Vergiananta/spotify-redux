import React, { Component, Fragment } from "react";
import { Navbar, Collapse, NavbarBrand, NavItem, NavbarToggler, Nav } from "reactstrap";
// import "./tes.css";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>
        <Navbar dark color="dark" className="shadow mb-4">
          <NavbarBrand href="/" className="mr-auto">Music Library</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2 d-sm-none d-block" />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink to="/genres">Genres</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/albums">Albums</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/artists">Artists</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/songs">Songs</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    )
  }
}

export default Header;