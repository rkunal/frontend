import React, { Component } from "react";
import PubSub from "pubsub-js";

import { Link } from "react-router";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Navbar from "react-bootstrap/lib/Navbar";
import { LinkContainer } from "react-router-bootstrap";

class NavigationMobile extends Component {
  constructor(props) {
    super(props);
    this.setSidebarExpanded = this._setSidebarExpanded.bind(this);
  }

  _setSidebarExpanded(expanded) {
    PubSub.publish("TOGGLE_SIDEBAR");
  }

  render() {
    return (
      <header className="primary-header">
        <Navbar onToggle={this.setSidebarExpanded}>
          <Navbar.Header>
            <Navbar.Toggle />
            <Navbar.Brand>
              <Link style={{ marginTop: "8px" }} to="/">
                Nyaaya
              </Link>
            </Navbar.Brand>
            <Navbar.Form pullRight>
              <LinkContainer to="/search/">
                <Button bsStyle="link" style={{ color: "white" }}>
                  <Glyphicon glyph="search" />
                </Button>
              </LinkContainer>
            </Navbar.Form>
          </Navbar.Header>
        </Navbar>
      </header>
    );
  }
}

export default NavigationMobile;
