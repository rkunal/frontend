import React, { Component } from "react";
import "./Explainers.css";
import SidebarLayout from "../../components/Layouts/SidebarLayout";
import ContentCard from "../../components/ContentCard/ContentCard";
import SeoTags from "../../components/SeoTags";
import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import { LinkContainer } from "react-router-bootstrap";
import Clearfix from "react-bootstrap/lib/Clearfix";

const ExplainList = items => {
  const groupSize = 4;
  const components = items.map((item, index) => {
    return (
      <ContentCard
        key={index}
        Title={item.title}
        shortTitle={item.short_title ? item.short_title : ""}
        Url={item.url}
        imageUrl={item.image_desktop}
      />
    );
  });
  let children = [];
  const totalcomps = components.length;
  let i = 0;
  while (i < totalcomps) {
    children.push(components[i]);

    if ((i + 1) % (groupSize / 2) === 0) {
      children.push(<Clearfix visibleMdBlock visibleSmBlock key={i * 317} />);
    }
    if ((i + 1) % groupSize === 0) {
      children.push(<Clearfix visibleLgBlock key={i * 313} />);
    }
    i++;
  }
  return <Row className="law-explainers-items">{children}</Row>;
};

const EngExplainers = items => {
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
  return (
    <div>
      <Grid>
        <Row style={headerRow}>
          <Col lg={6} xs={12} sm={12} md={4}>
            <h2 style={mainHeader} className="text-left">Law Explainers</h2>
          </Col>
          <Col lg={6} xs={12} sm={12} md={8}>
            <h6 style={infoHeader}>
              Looking for the entire catalogue of laws on Nyaaya?&nbsp;
              <LinkContainer to="/catalogue/category/">
                <Button bsStyle="info">Browse Nyaaya Laws Catalogue</Button>
              </LinkContainer>
            </h6>
          </Col>
        </Row>
        {ExplainList(items)}
      </Grid>
    </div>
  );
};

const HindiExplainers = items => {
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

  return (
    <div>
      <Grid>
        <Row style={headerRow}>
          <Col lg={6} xs={12} sm={12} md={4}>
            <h2 style={mainHeader} className="text-left">
              क़ानून समझिये
            </h2>
          </Col>
          <Col lg={6} xs={12} sm={12} md={8}>
            <h6 style={infoHeader}>
              न्याय पे भारतीय कानूनों की पूरी सूचि को पढ़ें (अंग्रेजी मैं)&nbsp;
              <LinkContainer to="/catalogue/category/">
                <Button bsStyle="info">Browse Nyaaya Laws Catalogue</Button>
              </LinkContainer>
            </h6>
          </Col>
        </Row>
        {ExplainList(items)}
      </Grid>
    </div>
  );
};

class Explainers extends Component {
  constructor(props) {
    super(props);
    this.state = { explainers_items: [], seo: {}, webdocs: [] };
    this.defaultError = "Error while fetching data";
    this.apiPath = "/api/law-explainers/";
    if (props.lang === "hi") {
      this.apiPath = "/api/hi/law-explainers/";
    }
  }
  componentWillMount() {
    this.fetchIniData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.apiPath = "/api/law-explainers/";
    if (nextProps.lang === "hi") {
      this.apiPath = "/api/hi/law-explainers/";
    }
    this.fetchIniData(nextProps);
  }
  fetchIniData() {
    this.setState({ isLoading: true });
    let myHeaders = new Headers();
    if (this.props.lang === "hi") {
      myHeaders.set("Accept-Language", "hi");
    } else {
      myHeaders.set("Accept-Language", "en-us");
    }
    let myInit = {
      headers: myHeaders
    };
    fetch(`${this.props.apiRoot}${this.apiPath}`, myInit)
      .then(response => response.json())
      .then(json => {
        if (!this.hasUnmounted) {
          this.setState({
            isLoading: false,
            explainers_items: json.explainers,
            seo: json.seo
          });
        }
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }
  componentWillUnmount() {
    this.hasUnmounted = true;
  }
  render() {
    if (this.props.lang === "hi") {
      return (
        <SidebarLayout
          content={
            <div>
              <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
              {HindiExplainers(this.state.explainers_items)}
            </div>
          }
        />
      );
    } else {
      return (
        <SidebarLayout
          content={
            <div>
              <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
              {EngExplainers(this.state.explainers_items)}
            </div>
          }
        />
      );
    }
  }
}

export default Explainers;
