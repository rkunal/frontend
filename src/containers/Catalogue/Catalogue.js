import React from "react";
import "./Catalogue.css";

import SidebarLayout from "../../components/Layouts/SidebarLayout";
import SeoTags from "../../components/SeoTags";

import PubSub from "pubsub-js";

import Breadcrumb from "react-bootstrap/lib/Breadcrumb";
import Table from "react-bootstrap/lib/Table";
import { Link } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import Button from "react-bootstrap/lib/Button";
import Badge from "react-bootstrap/lib/Badge";
import api from "../../api/api";

// List of Laws
const listWebDocItems = items =>
  items.map((item, index) => (
    <tr key={index}>
      <td className="catalogue-list-td">
        <Link
          to={item.url}
          className="catalogue-item btn btn-default btn-block"
        >
          <span>&nbsp; &nbsp; &nbsp; &nbsp; </span>
          <span style={{ color: "black" }}>{item.name}</span>
        </Link>
      </td>
    </tr>
  ));

// List of categories or jurisdictions
const listCatalogueCategoryItems = (items, isItemBold) => {
  return items.map((item, index) => {
    const space = isItemBold
      ? <span>&nbsp;</span>
      : <span>&nbsp; &nbsp; &nbsp;</span>;
    const name = isItemBold ? <b>{item.name}</b> : <span>{item.name}</span>;
    return (
      <tr key={index}>
        <td className="catalogue-list-td">
          <LinkContainer to={item.url}>
            <Button className="catalogue-item" block>
              <span style={{ color: "#777" }}>&gt;</span>
              {space}
              <span style={{ color: "black" }}>
                {name}
              </span>
              &nbsp;<Badge>{item.cnt}</Badge>
            </Button>
          </LinkContainer>
        </td>
      </tr>
    );
  });
};

const breadcrumbItems = items =>
  items.map(
    (item, index) =>
      item.url === null
        ? <Breadcrumb.Item active key={index}>
            {item.title}
          </Breadcrumb.Item>
        : <LinkContainer key={index} to={item.url}>
            <Breadcrumb.Item key={index}>
              {item.title}
            </Breadcrumb.Item>
          </LinkContainer>
  );

const tabsHeader = () => (
  <div className="catalogue-header">
    <h1>All Laws</h1>
    <Nav bsStyle="tabs" activeKey={1}>
      <LinkContainer to="/catalogue/category/">
        <NavItem eventKey={1}>By Category</NavItem>
      </LinkContainer>
      <LinkContainer to="/catalogue/jurisdiction/">
        <NavItem eventKey={2} title="By Jurisdiction">By Jurisdiction</NavItem>
      </LinkContainer>
    </Nav>
  </div>
);

const textHeader = headerText => (
  <div className="catalogue-header">
    <h1>{headerText}</h1>
  </div>
);

const renderHeader = (header, headerText) => {
  if (header === "tabs") {
    return tabsHeader();
  } else if (header === "text") {
    return textHeader(headerText);
  } else {
    return null;
  }
};

class Catalogue extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.serverSharedData.catalogueitems !== undefined) {
      const json = this.props.serverSharedData;
      this.state = {
        catalogueitems: json.catalogueitems,
        header: json.header,
        seo: json.seo,
        header_text: json.header_text,
        list_type: json.list_type,
        header_prev_link: json.header_prev_link,
        breadcrumbs: json.breadcrumbs
      };
    } else {
      this.state = {
        catalogueitems: [],
        seo: {},
        header: "",
        header_text: "",
        list_type: "",
        current_url: "",
        breadcrumbs: []
      };
    }
  }

  componentDidMount() {
    if (this.state.catalogueitems.length === 0) {
      this.updateItemList(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    PubSub.publish("SCROLL_CONTAINER_TO_TOP");
    this.updateItemList(nextProps);
  }
  updateItemList(p) {
    let u = p.location.pathname;
    PubSub.publish("LOADER_UPDATE", 10);
    api
      .CataloguePage(u)
      .then(response => response.json())
      .then(json => {
        this.setState(
          {
            isLoading: false,
            catalogueitems: json.catalogueitems,
            header: json.header,
            seo: json.seo,
            header_text: json.header_text,
            list_type: json.list_type,
            header_prev_link: json.header_prev_link,
            breadcrumbs: json.breadcrumbs
          },
          function() {
            PubSub.publish("LOADER_UPDATE", 100);
          }
        );
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }
  componentWillUnmount() {
    this.hasUnmounted = true;
  }
  render() {
    let isItemBold = false;
    if (
      this.props.location.pathname === "/catalogue/category/" ||
      this.props.location.pathname === "/catalogue/jurisdiction/"
    ) {
      isItemBold = true;
    }

    const content = (
      <div>
        <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
        <div>
          {this.state.breadcrumbs.length
            ? <div className={this.props.isMobile ? "" : "container"}>
                <Breadcrumb>
                  {breadcrumbItems(this.state.breadcrumbs)}
                </Breadcrumb>
              </div>
            : null}
          <div className="container">
            {renderHeader(this.state.header, this.state.header_text)}
            <Table responsive hover>
              <thead />
              <tbody>
                {this.state.list_type === "webdoc"
                  ? listWebDocItems(this.state.catalogueitems)
                  : listCatalogueCategoryItems(
                      this.state.catalogueitems,
                      isItemBold
                    )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );

    return <SidebarLayout content={content} hideFooter={true} />;
  }
}

export default Catalogue;
