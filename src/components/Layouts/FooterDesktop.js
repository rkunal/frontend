import React, { Component } from "react";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

class FooterDesktop extends Component {
  render() {
    let ULStyle = {
      listStyleType: "none",
      margin: "0",
      padding: "0"
    };
    return (
      <footer>

        <Grid fluid>
          <Row>
            <Col xs={4} sm={3} lg={3} className="text-left">
              <h6>NYAAYA LIBRARY</h6>
              <ul style={ULStyle}>
                <li>
                  <a href="/law-explainers/">Explainers</a>
                </li>
                <li>
                  <a href="/catalogue/">Law Catalogue</a>
                </li>
                <li><a href="/guides/">Law Guides</a> </li>
                <li>
                  <a href="/crpc/victim/intro/">Criminal Justice System</a>{" "}
                </li>
                <li><a href="/traffic-fine/">Traffic Fine</a> </li>
              </ul>
            </Col>
            <Col xs={4} sm={3} lg={3} className="text-left">
              <h6>ABOUT</h6>
              <ul style={ULStyle}>
                <li><a href="/write-to-us/">Become a contributor</a> </li>
              </ul>
              <ul style={ULStyle}>
                <li><a href="/blog/">Blog</a> </li>
                <li><a href="/content-policies-and-principles/">Content policies & principles</a></li>
              </ul>
            </Col>
            <Col xs={4} sm={3} lg={3} className="text-left">
              <h6>CONNECT WITH NYAAYA</h6>
              <ul style={ULStyle}>
                <li>
                  <a href="https://www.facebook.com/nyaayain/">
                    {" "}Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/13200616">
                    Linkedin{" "}
                  </a>
                </li>
                <li><a href="https://twitter.com/NyaayaIN"> Twitter</a></li>
                <li>
                  <a href="mailto:contact@nyaaya.in">Mail</a>
                </li>

              </ul>
            </Col>

            <Col xs={4} sm={3} lg={3} className="text-left">
              <h6>LEGAL</h6>
              <ul style={ULStyle}>
                <li>
                  <a href="/terms-of-use/">Terms of Use</a>
                </li>
                <li>
                  <a href="/privacy-policy/">Privacy Policy</a>
                </li>
                <li><a href="/disclaimers/">Disclaimers</a> </li>
              </ul>
            </Col>

          </Row>

        </Grid>
        <Grid fluid>
          <Row>
            <Col><h1 /></Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}

export default FooterDesktop;
