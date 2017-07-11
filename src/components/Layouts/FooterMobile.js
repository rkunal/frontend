import React, { Component } from "react";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";

class FooterMobile extends Component {
  render() {
    let HRStyle = {
      marginTop: "0",
      marginBottom: "0"
    };
    return (
      <footer>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Explore Nyaaya
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/catalogue/category/">
              Catalogue
            </NavItem>
            <NavItem eventKey={2} href="/law-explainers/">Explainers</NavItem>
            <NavItem eventKey={3} href="/guides/">Law Guides</NavItem>
            <NavItem eventKey={4} href="/crpc/victim/intro/">
              Criminal Justice System
            </NavItem>
            <NavItem eventKey={5} href="/traffic-fine/">Traffic Fine</NavItem>
            <NavItem eventKey={6} href="/blog/">Blog</NavItem>
	    <NavItem eventKey={7} href="/content-policies-and-principles/">Content policies & principles</NavItem>
        </Nav>
        </Navbar>

        <Grid>
          <Row>
            <Col><h1 /></Col>
          </Row>
        </Grid>

        <hr style={HRStyle} />
        <Grid>
          <Row>
            <Col xs={3} className="footer-copyright-col">
              <Button bsStyle="link" href="/"><small>Nyaaya</small></Button>
            </Col>
            <Col xs={3}>
              <Button bsStyle="link" href="/terms-of-us/">
                <small>Terms of Use</small>
              </Button>
            </Col>
            <Col xs={3}>
              <Button bsStyle="link" href="/privacy-policy/">
                <small>Privacy Policy</small>
              </Button>
            </Col>
            <Col xs={3}>
              <Button bsStyle="link" href="/disclaimers/">
                <small>Disclaimers</small>
              </Button>
            </Col>
          </Row>

        </Grid>
      </footer>
    );
  }
}

export default FooterMobile;
