import React, { Component } from "react";

import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import SidebarLayout from "./Layouts/SidebarLayout";

import BigSearchBox from "../containers/Search/BigSearchBox";

class NotFound extends Component {
  render() {
    const centerStyle = {
      float: "none",
      margin: "0 auto"
    };

    const content = (
      <div>
        <Grid>
          <Row className="container">
            <Col lg={6} xs={12} sm={12} md={8} style={centerStyle}>
              <h6>The page you are looking for can not be found</h6>
              <br />
            </Col>
            <Col>
              <BigSearchBox />
            </Col>
          </Row>
        </Grid>
      </div>
    );
    return <SidebarLayout content={content} />;
  }
}

export default NotFound;
