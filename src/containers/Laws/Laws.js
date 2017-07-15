import React from "react";
import SidebarLayout from "../../components/Layouts/SidebarLayout";
import Toc from "../../components/Navigation/Toc.js";
import TocItemList from "../../components/Navigation/TocItemList.js";
import TocItem from "../../components/Navigation/TocItem.js";
import SeoTags from "../../components/SeoTags";
import "./Laws.css";

import PubSub from "pubsub-js";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Grid from "react-bootstrap/lib/Grid";
import Button from "react-bootstrap/lib/Button";

const renderPublishedDate = lawPublishedDate => {
  const date = new Date(lawPublishedDate);
  const date_s = date.toDateString();
  const date_arr = date_s.split(" ");
  if (date_arr.length === 4) {
    return (
      <p className="text-center updated">
        Updated till: {date_arr[1]} {date_arr[2]}, {date_arr[3]}
      </p>
    );
  } else {
    return null;
  }
};

const renderTocList = (node, index, url) => (
  <TocItem
    key={index}
    title={node.title}
    url={url}
    hash={node.hash}
    collapsible={node.children ? true : false}
    open={false}
    toggleChildren={node.children ? true : false}
    style={{ paddingTop: "8px", paddingBottom: "8px" }}
  >
    {node.children
      ? <TocItemList>
          {node.children.map((n, i) => renderTocList(n, i, url))}
        </TocItemList>
      : null}
  </TocItem>
);

class Laws extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.serverSharedData.title !== undefined) {
      const json = this.props.serverSharedData;
      this.state = {
        html: json.html,
        intro: json.intro,
        toc: json.nav_toc,
        is_stub: json.is_stub,
        title: json.title,
        updated_at: json.updated_at,
        seo: json.seo
      };
    } else {
      this.state = {
        html: "",
        intro: "",
        toc: [],
        is_stub: null,
        title: "",
        updated_at: null,
        seo: {}
      };
    }
  }

  componentDidMount() {
    if (this.state.html.length === 0) {
      this.fetchIniData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.fetchIniData(nextProps);
    }
  }

  fetchIniData(props) {
    PubSub.publish("LOADER_UPDATE", 10);
    fetch(`${props.apiRootUrl}/api/law/${props.params.law_id}/`)
      .then(response => response.json())
      .then(json => {
        if (!this.hasUnmounted) {
          this.setState(
            {
              html: json.html,
              intro: json.intro,
              toc: json.nav_toc,
              is_stub: json.is_stub,
              title: json.title,
              updated_at: json.updated_at,
              seo: json.seo
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
  componentWillUnmount() {
    this.hasUnmounted = true;
  }

  renderToc() {
    return (
      <Toc>
        <TocItemList>
          <TocItem
            title={this.state.title}
            navType={"heading2"}
            url={`${this.props.location.pathname}`}
            hash={"doc"}
          />

          {this.state.toc.map((node, index) =>
            renderTocList(node, index, this.props.location.pathname))}
        </TocItemList>
      </Toc>
    );
  }

  render() {
    let docHeader = (
      <div className="text-center">
        {this.state.is_stub
          ? <p className="text-center incomplete">
              <a href="/write-to-us/">This law needs updating. Help us out.</a>
            </p>
          : this.state.updated_at
              ? renderPublishedDate(this.state.updated_at)
              : null}
      </div>
    );

    let content = (
      <div>
        <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
        <div>
          {this.state.intro
            ? <div>
                <Grid className="intro">
                  <Row>
                    <Col className="text-center" xs={12} sm={6} md={6} lg={6}>
                      <h1> {this.state.title}</h1>
                      <a href="#doc">
                        <Button bsStyle="primary">Explore</Button>
                      </a>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <div
                        dangerouslySetInnerHTML={{ __html: this.state.intro }}
                      />
                    </Col>
                  </Row>
                </Grid>
              </div>
            : null}
          <div className="akoma-ntoso container">
            {docHeader}
            <div
              id="doc"
              className="akoma-ntoso"
              dangerouslySetInnerHTML={{ __html: this.state.html }}
            />
          </div>
        </div>
      </div>
    );
    return (
      <SidebarLayout
        content={content}
        tableOfContent={this.renderToc(true)}
        showSidebar={true}
        hideFooter={false}
      />
    );
  }
}

export default Laws;
