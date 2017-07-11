import React, { Component } from "react";
import "./Home.css";

import SidebarLayout from "../../components/Layouts/SidebarLayout";
import ContentCard from "../../components/ContentCard/ContentCard";
import SeoTags from "../../components/SeoTags";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Image from "react-bootstrap/lib/Image";

import { LinkContainer } from "react-router-bootstrap";
import api from "../../api/api";
class Home extends Component {
  constructor(props) {
    super(props);
    if (this.props.serverSharedData.home_explainers_items !== undefined) {
      const json = this.props.serverSharedData;
      this.state = {
        home_explainers_items: json.home_explainers_items,
        seo: json.seo
      };
    } else {
      this.state = { home_explainers_items: [], seo: {} };
    }
  }
  componentDidMount() {
    if (this.state.home_explainers_items.length === 0) {
      this.fetchIniData();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.fetchIniData();
  }
  fetchIniData() {
    api.HomePage().then(response => response.json()).then(json => {
      this.setState({
        seo: json.seo,
        home_explainers_items: json.home_explainers_items
      });
    });
  }
  render() {
    return <SidebarLayout content={this.renderContent()} />;
  }

  renderContent() {
    const contributeTextStyle = {
      color: "#494949"
    };
    const explainers = this.state.home_explainers_items.map((item, index) => (
      <ContentCard
        key={index}
        imageUrl={item.image_desktop}
        Title={item.title}
        Url={item.url}
      />
    ));
    return (
      <div>
        <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
        <Grid className="home-container">
          <Row>
            <Col xs={12} md={6} sm={6} lg={6}>
              <div>
                <h2>
                  Nyaaya is India’s first free online source for every central and state law. Explained in simple language.
                </h2>
              </div>
              <br />
              <div>
                <LinkContainer to="/law-explainers/">
                  <Button bsStyle="info">Browse the Explainers</Button>
                </LinkContainer>
              </div>
              <br />
              <div className="secondary-body-text">
                Browse the rich and ever-growing repository of knowledge on the laws laid out
                by the Indian government.
              </div>
              <hr />
              <div>
                <u>
                  <a style={contributeTextStyle} href="/write-to-us/">
                    Learn how you can contribute
                  </a>
                </u>
              </div>
              <div className="secondary-body-text">
                Law, Technology, Design or anything else. Nyaaya could use your help.
              </div>
              <br />
            </Col>
            <Col xs={12} md={6} sm={6} lg={6}>
              <br />
              <h6 className="section-headline">NYAAYA APPS</h6>
              <Row>
                <Col xs={6} sm={6} md={6} lg={4}>
                  <Image
                    responsive
                    style={{ padding: "24px", maxWidth: "172px" }}
                    src={
                      `${this.props.apiRoot}/assets/images/traffic_small_home.jpg`
                    }
                  />
                </Col>
                <Col xs={6} md={6} sm={6} lg={8}>
                  <div className="text-left">
                    <h4>Being fined by a traffic cop?</h4>
                  </div>
                  <div className="text-left">
                    <LinkContainer to="/traffic-fine/">
                      <Button bsStyle="primary" href="/traffic-fine/">
                        Know your Fine
                      </Button>
                    </LinkContainer>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={6} sm={6} md={6} lg={4}>
                  <Image
                    responsive
                    style={{ maxWidth: "172px" }}
                    src={`${this.props.apiRoot}/assets/images/crpc-victim.jpg`}
                  />
                </Col>
                <Col xs={6} md={6} sm={6} lg={8}>
                  <div className="text-left">
                    <h4 style={{ fontFamily: "Karma" }}>
                      क़ानून समझिये
                    </h4>
                  </div>
                  <div className="text-left">
                    <LinkContainer
                      to="/hi/law-explainers/"
                      style={{ fontFamily: "Karma" }}
                    >
                      <Button bsStyle="info" href="/hi/law-explainers/">
                        हिंदी में
                      </Button>
                    </LinkContainer>
                  </div>
                </Col>
              </Row>
            </Col>
            <br />
          </Row>
          <br />
          <Row>
            <Col className="text-center">
              <h6 className="section-headline">Recent Guides</h6>
            </Col>
          </Row>
          <br />
          <Row className="text-center">
            <Col xs={12} md={6} sm={6} lg={6}>
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
                <h3 className="page-feature-headline">
                  Children accused of crimes
                </h3>
              </div>
              <div>
                How does the law deal with child offenders and vulnerable children?
              </div>
            </Col>
            <Col xs={12} md={6} sm={6} lg={6}>
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
                <h3 className="page-feature-headline">
                  Guide to Marriage, Divorce and Maintenance
                </h3>
              </div>
              <div>
                Learn about the religious and non-religious laws about marriage.
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col className="text-center">
              <h6 className="section-headline">RECENT EXPLAINERS</h6>
            </Col>
          </Row>
          <Row className="text-center">
            {explainers}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
