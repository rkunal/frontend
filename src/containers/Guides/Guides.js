import React, { Component } from "react";

import SidebarLayout from "../../components/Layouts/SidebarLayout";
import api from "../../api/api";
import SeoTags from "../../components/SeoTags";

import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import Image from "react-bootstrap/lib/Image";
import Clearfix from "react-bootstrap/lib/Clearfix";

import { LinkContainer } from "react-router-bootstrap";

class Guides extends Component {
  constructor(props) {
    super(props);
    this.state = { seo: {} };
  }
  componentDidMount() {
    this.fetchIniData();
  }
  componentWillReceiveProps(nextProps) {
    this.fetchIniData();
  }
  fetchIniData() {
    api.GuidePage().then(response => response.json()).then(json => {
      this.setState({
        seo: json.seo
      });
    });
  }

  render() {
    return <SidebarLayout content={this.renderContent()} />;
  }
  renderContent() {
    const infoHeader = {
      fontSize: "12px",
      color: "#B7B7B7"
    };
    const mainHeader = {
      marginTop: "10px"
    };
    const headerRow = {
      marginTop: "10px",
      marginBottom: "10px"
    };
    const styleHeader = {
      color: "#7ED321",
      marginTop: "0px",
      marginBottom: "12px"
    };
    const styleHeaderHindi = {
      color: "#7ED321",
      marginBottom: "12px",
      fontSize: "24px"
    };
    const styletext = {
      color: "#B7B7B7"
    };
    const styletextHindi = {
      color: "#B7B7B7",
      fontFamily: "Karma"
    };
    const elementStyle = {
      marginTop: "8px",
      marginBottom: "18px"
    };
    return (
      <div>
        <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
        <Grid>
          <Row style={headerRow}>
            <Col lg={6} xs={12} sm={12} md={4}>
              <h2 style={mainHeader} className="text-left">Law Guides</h2>
            </Col>
            <Col lg={6} xs={12} sm={12} md={8}>
              <h6 style={infoHeader}>
                Looking for the entire catalogue of laws on Nyaaya?&nbsp;
                <LinkContainer to="/catalogue/category/">
                  <Button bsStyle="info">Browse Nyaaya Laws’ Catalogue</Button>
                </LinkContainer>
              </h6>
            </Col>
          </Row>
          <Row>
            <Col
              lg={6}
              xs={12}
              sm={12}
              md={6}
              style={elementStyle}
              className="text-center"
            >
              <div>
                <a href="/crpc/victim/intro/">
                  <Image
                    src={`${this.props.apiRoot}/assets/images/crpc-victim.jpg`}
                    responsive
                  />
                </a>
              </div>
              <div>
                <a href="/crpc/victim/intro/">
                  <h3 style={styleHeader}>Victim’s guide to criminal law</h3>
                </a>
                <a href="/crpc/victim/intro/" style={styletext}>
                  This guide explains the police and court system, from your perspective.
                </a>
              </div>
              <div>
                <a href="/hi/crpc-victim-in-hindi/">
                  <h3 style={styleHeaderHindi}>पीड़ित के दृष्टिकोण से</h3>
                </a>
                <a href="/hi/crpc-victim-in-hindi/" style={styletextHindi}>
                  यह गाइड आपको पुलिस एवं न्यायालय प्रणाली आप ही के नजरिये से समझती है I
                </a>
              </div>
            </Col>
            <Col
              lg={6}
              xs={12}
              sm={12}
              md={6}
              style={elementStyle}
              className="text-center"
            >
              <div>
                <a href="/crpc/accused/intro/">
                  <Image
                    src={`${this.props.apiRoot}/assets/images/crpc-accused.jpg`}
                    responsive
                  />
                </a>
              </div>
              <div>
                <a href="/crpc/accused/intro/">
                  <h3 style={styleHeader}>Accused’s guide to criminal law</h3>
                </a>
                <a href="/crpc/accused/intro/" style={styletext}>
                  Learn about your rights under criminal procedure law.
                </a>
              </div>
              <div>
                <a href="/hi/crpc-accused-in-hindi/">
                  <h3 style={styleHeaderHindi}>अपराध के आरोपी</h3>
                </a>
                <a href="/hi/crpc-accused-in-hindi/" style={styletextHindi}>
                  दण्ड प्रक्रिया के अंतर्गत अपने अधिकारों के बारे में अधिक जानिए।
                </a>
              </div>
            </Col>
            <Clearfix visibleMdBlock visibleLgBlock />
            <Col
              lg={6}
              xs={12}
              sm={12}
              md={6}
              style={elementStyle}
              className="text-center"
            >
              <div>
                <a href="/voting-and-elections/">
                  <Image
                    src={
                      `${this.props.apiRoot}/assets/images/voting-and-elections.png`
                    }
                    responsive
                  />
                </a>
              </div>
              <div>
                <a href="/voting-and-elections/">
                  <h3 style={styleHeader}>
                    Voting and Elections
                  </h3>
                </a>
                <a href="/voting-and-elections/" style={styletext}>
                  Basic laws, rules and regulations governing elections
                </a>
              </div>
            </Col>

            <Col
              lg={6}
              xs={12}
              sm={12}
              md={6}
              style={elementStyle}
              className="text-center"
            >
              <div>
                <a href="/children-accused-of-crimes/">
                  <Image
                    src={
                      `${this.props.apiRoot}/assets/images/juvenile-justice.png`
                    }
                    responsive
                  />
                </a>
              </div>
              <div>
                <a href="/children-accused-of-crimes/">
                  <h3 style={styleHeader}>
                    Children accused of crimes
                  </h3>
                </a>
                <a href="/children-accused-of-crimes/" style={styletext}>
                  How does the law deal with child offenders and vulnerable children?
                </a>
              </div>
            </Col>
            <Clearfix visibleMdBlock visibleLgBlock />
            <Col
              lg={6}
              xs={12}
              sm={12}
              md={6}
              style={elementStyle}
              className="text-center"
            >
              <div>
                <a href="/guide-to-traffic-rules/">
                  <Image
                    src={
                      `${this.props.apiRoot}/assets/images/being-fined-by-a-traffic-cop.jpg`
                    }
                    responsive
                  />
                </a>
              </div>
              <div>
                <a href="/guide-to-traffic-rules/">
                  <h3 style={styleHeader}>Guide to Traffic Rules</h3>
                </a>
                <a href="/guide-to-traffic-rules/" style={styletext}>
                  Learn about what to do if you’re in an accident or if your vehicle is towed.
                </a>
              </div>
            </Col>

            <Col
              lg={6}
              xs={12}
              sm={12}
              md={6}
              style={elementStyle}
              className="text-center"
            >
              <div>
                <a href="/guide-to-marriage-divorce-and-maintenance/">
                  <Image
                    src={
                      `${this.props.apiRoot}/assets/images/marriage-divorce.jpg`
                    }
                    responsive
                  />
                </a>
              </div>
              <div>
                <a href="/guide-to-marriage-divorce-and-maintenance/">
                  <h3 style={styleHeader}>
                    Guide to Marriage, Divorce and Maintenance
                  </h3>
                </a>
                <a
                  href="/guide-to-marriage-divorce-and-maintenance/"
                  style={styletext}
                >
                  Learn about the religious and non-religious laws about marriage
                </a>
              </div>
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default Guides;
