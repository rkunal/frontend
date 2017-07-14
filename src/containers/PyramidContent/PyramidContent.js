import React, { Component } from "react";
import PubSub from "pubsub-js";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { LinkContainer } from "react-router-bootstrap";

import SidebarLayout from "../../components/Layouts/SidebarLayout";
import ContentCard from "../../components/ContentCard/ContentCard";
import SeoTags from "../../components/SeoTags";
import Toc from "../../components/Navigation/Toc.js";
import TocItemList from "../../components/Navigation/TocItemList.js";
import TocItem from "../../components/Navigation/TocItem.js";
import "./PyramidContent.css";
import Config from "./Config.js";

const NavButton = (url, title, cn) => (
  <LinkContainer to={url}>
    <Button bsStyle="link" className="arrow-navigation">
      <Glyphicon glyph={cn} /> {title}{" "}
    </Button>
  </LinkContainer>
);

export const renderPublishedDate = articlePublishedDate => {
  const date = new Date(articlePublishedDate);
  const date_s = date.toDateString();
  const date_arr = date_s.split(" ");
  if (date_arr.length === 4) {
    articlePublishedDate = `${date_arr[1]} ${date_arr[2]}, ${date_arr[3]}`;
  }
  return (
    <p className="article-published-date">
      Published on: {articlePublishedDate}
    </p>
  );
};

const renderTocList = (node, index) => (
  <TocItem
    key={index}
    title={node.name}
    navType={node.level === 0 ? "heading2" : "default"}
    url={node.has_pyramid ? node.url : null}
    activeStyle={{ color: "#D3EA75" }}
    style={{ paddingTop: "4px", paddingBottom: "4px" }}
  >
    {node.children
      ? <TocItemList>
          {node.children.map((n, i) => renderTocList(n, i))}
        </TocItemList>
      : null}
  </TocItem>
);

const renderToc = (showSidebar, navs) => {
  if (showSidebar) {
    return (
      <Toc>
        <TocItemList>
          {navs.map((node, index) => renderTocList(node, index))}
        </TocItemList>
      </Toc>
    );
  } else {
    return null;
  }
};

class PyramidContent extends Component {
  constructor(props) {
    super(props);

    const urls = {
      current: null,
      next: null,
      prev: null
    };
      this.state = {
        app: {},
        tocs: [],
        doc: null,
        html: "",
        urls: urls,
        seo: null,
        related_content: []
      };
    this.app_pathname = props.location.pathname;
    if (this.app_pathname.split("/")[1] === props.lang) {
      this.app_pathname = props.location.pathname.substr(3);

      this.apiPath = "api/" + props.lang + "/app" + this.app_pathname;
    } else {
      this.apiPath = "api/app" + this.app_pathname;
    }
  }
  componentDidMount() {
    if (this.state.doc === null) {
      this.fetchIniData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    PubSub.publish("SCROLL_CONTAINER_TO_TOP");
    this.app_pathname = nextProps.location.pathname;
    if (this.app_pathname.split("/")[1] === nextProps.lang) {
      this.app_pathname = nextProps.location.pathname.substr(3);
      this.apiPath = "api/" + nextProps.lang + "/app" + this.app_pathname;
    } else {
      this.apiPath = "api/app" + this.app_pathname;
    }
    this.fetchIniData(nextProps);
  }
  componentWillUnmount() {
    this.hasUnmounted = true;
  }

  fetchIniData(props) {
    PubSub.publish("LOADER_UPDATE", 10);
    let myHeaders = new Headers();
    if(this.props.lang === "hi")
      myHeaders.set("Accept-Language", "hi");
    else
      myHeaders.set("Accept-Language", "en-us");
    let myInit = {
               headers: myHeaders,
    };
    fetch(`${this.props.apiRootUrl}/${this.apiPath}`, myInit)
      .then(response => {
        if (response.status === 200) {
          PubSub.publish("LOADER_UPDATE", 80);
          return response.json();
        } else if (response.status === 404) {
          PubSub.publish("LOADER_UPDATE", 100);
          this.props.onPageNotFound();
        }
      })
      .then(json => {
        if (!this.hasUnmounted) {
          const html = json.doc.plain_text;
          this.setState(
            {
              doc: json.doc,
              app: json.app,
              tocs: json.tocs,
              html: html,
              urls: json.urls,
              seo: json.seo,
              related_content: json.related_content
            },
            function() {
              PubSub.publish("LOADER_UPDATE", 100);
            }
          );
        }
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }

  render() {
    if (this.state.app && this.state.doc) {
      const config = Config(this.state.app.theme);
      let content = (
        <div>
          <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
          <Grid
            className={
              `nyaaya-apps-container-${this.state.app.lang.toLowerCase()}`
            }
          >
            <Row>
              <Col
                className="nyaaya-apps-content"
                xs={12}
                lg={12}
                md={12}
                sm={12}
              >
                <div className="nyaaya-app-content-container">
                  <article>
                    <div>
                      <h1>{this.state.doc.title}</h1>
                      {config.showPublishedDate
                        ? renderPublishedDate(
                            this.state.doc.article_published_date
                          )
                        : null}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: this.state.html }}
                    />
                  </article>
                </div>
                {config.showPrevNext
                  ? <Row>
                      {this.state.urls.prev
                        ? NavButton(
                            this.state.urls.prev.url,
                            this.state.urls.prev.name,
                            "arrow-left"
                          )
                        : null}
                      {this.state.urls.next
                        ? NavButton(
                            this.state.urls.next.url,
                            this.state.urls.next.name,
                            "arrow-right"
                          )
                        : null}
                    </Row>
                  : null}
                {this.state.related_content.length
                  ? <div className="text-center">
                      <h6 className="section-headline">Related Content</h6>
                      {this.state.related_content.map((item, index) => (
                        <ContentCard
                          key={index}
                          Title={item.name}
                          Url={item.url}
                          imageUrl={item.illustration}
                        />
                      ))}
                    </div>
                  : null}
              </Col>
            </Row>
          </Grid>
        </div>
      );

      return (
        <SidebarLayout
          content={content}
          tableOfContent={renderToc(config.showSidebar, this.state.tocs)}
          showSidebar={config.showSidebar}
          hideFooter={config.hideFooter}
        />
      );
    } else {
      return <SidebarLayout content={null} hideFooter={true} />;
    }
  }
}

export default PyramidContent;
