import React, { Component } from "react";
import "./Intro.css";
import SidebarLayout from "../../components/Layouts/SidebarLayout";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

import PubSub from "pubsub-js";

class Intro extends Component {
  constructor(props) {
    super(props);
    if (this.props.serverSharedData.guide_intro_data !== undefined) {
      const json = this.props.serverSharedData;
      this.state = {
        guide_intro_data: json.guide_intro_data,
        webdoc_id: this.props.params.webdoc_id,
        webdoc_title: json.webdoc_title,
        webdoc_url: json.webdoc_url,
        seo: json.seo
      };
    } else {
      this.state = {
        guide_intro_data: "",
        webdoc_id: this.props.params.webdoc_id,
        webdoc_title: "",
        webdoc_url: "",
        seo: {}
      };
    }
    this.defaultError = "Error while fetching data";
  }

  componentDidMount() {
    if (this.state.guide_intro_data === "") {
      this.fetchIniData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    PubSub.publish("SCROLL_CONTAINER_TO_TOP");
    this.fetchIniData(nextProps);
  }
  fetchIniData() {
    this.setState({ isLoading: true });
    fetch(
      `${this.props.apiRoot}/law-explainers/${this.state.webdoc_id}/json/?json`
    )
      .then(response => response.json())
      .then(json => {
        if (!this.hasUnmounted) {
          this.setState(
            {
              isLoading: false,
              guide_intro_data: json.guide_intro_data,
              webdoc_title: json.webdoc_title,
              webdoc_url: json.webdoc_url,
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

  createMarkup(data) {
    return { __html: data };
  }
  render() {
    let content = (
      <div>
        <Grid>
          <Row>
            <Col>
              <h2 className="text-left">
                {this.state.webdoc_title} &nbsp; &nbsp; &nbsp;
                <Button bsStyle="info" href={this.state.webdoc_url}>
                  Read the act &gt;
                </Button>

              </h2>

            </Col>
          </Row>

          <Row>
            <Col className="web-intro-text-container">
              <div
                dangerouslySetInnerHTML={this.createMarkup(
                  this.state.guide_intro_data
                )}
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );

    return <SidebarLayout content={content} showSidebar={false} tocs={[]} />;
  }
}

export default Intro;
