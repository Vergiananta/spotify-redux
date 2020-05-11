import React, { Component, Fragment } from 'react';
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <Fragment>
        <Nav vertical pills>
          <NavItem>
            <NavLink exact to="/" className="nav-link">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/genres" className="nav-link">Genre</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/albums" className="nav-link">Albums</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/artists" className="nav-link">Artists</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/songs" className="nav-link">Songs</NavLink>
          </NavItem>
        </Nav>
      </Fragment>
    )
  }
}

export default Sidebar;