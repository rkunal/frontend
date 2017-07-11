import React, { Component } from "react";

import SearchBox from "./SearchBox.js";

import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import { LinkContainer } from "react-router-bootstrap";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: false
    };
    this.setNavExpanded = this._setNavExpanded.bind(this);
    this.closeNav = this._closeNav.bind(this);
  }
  _setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }
  _closeNav() {
    this.setState({ navExpanded: false });
  }
  render() {
    return (
      <header className="primary-header">
        <Navbar
          onToggle={this.setNavExpanded}
          expanded={this.state.navExpanded}
        >
          <Navbar.Header>
            <Navbar.Toggle />
            <Navbar.Brand>
              <a href="/">
                <img
                  src="/static/logo-white-large-beta-white.png"
                  alt="Nyaaya"
                  height="62"
                  width="62"
                />
              </a>
            </Navbar.Brand>
            <Navbar.Form pullLeft>
              <SearchBox textValue={this.props.keyword} />
            </Navbar.Form>
          </Navbar.Header>

          <Navbar.Collapse>

            <Nav pullRight onSelect={this.closeNav}>
              <LinkContainer to="/law-explainers/">
                <NavItem eventKey={1} href="/law-explainers/">
                  Law Explainers
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/guides/">
                <NavItem eventKey={2} href="/guides/">Guides</NavItem>
              </LinkContainer>
              <NavDropdown
                eventKey={3}
                title="Nyaaya Apps"
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/traffic-fine/">
                  <MenuItem eventKey={3.1}>Traffic Fine App</MenuItem>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/catalogue/category/">
                <NavItem eventKey={4} href="/catalogue/category/">
                  Catalogue
                </NavItem>
              </LinkContainer>
              <NavDropdown
                eventKey={5}
                title="About Us"
                id="basic-nav-dropdown-2"
              >
                <MenuItem eventKey={5.1} href="/mission/">Mission</MenuItem>
                <MenuItem eventKey={5.2} href="/aboutus/">Team</MenuItem>
                <MenuItem eventKey={5.3} href="/contributors/">
                  Contributors
                </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Navigation;
