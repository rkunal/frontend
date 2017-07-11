import React, { Component } from "react";
import PubSub from "pubsub-js";
import ReactDOM from "react-dom";

import ProgressBar from "../ProgressBar/ProgressBar.js";
import Navigation from "./Navigation.js";
import NavigationMobile from "./NavigationMobile.js";
import SideNavigation from "../Navigation/SideNavigation";
import FooterMobile from "./FooterMobile";
import FooterDesktop from "./FooterDesktop";

import Glyphicon from "react-bootstrap/lib/Glyphicon";

import "./MainLayout.css";

class SidebarLayout extends Component {
  constructor(props) {
    super(props);
    let isMobile = false;
    let width;
    if (typeof window === "undefined") {
      width = 768;
    } else {
      width = window.innerWidth;
    }
    if (width <= 767) {
      isMobile = true;
    }
    this.state = {
      isMobile: isMobile,
      httpStatus: 200,
      progress: -1,
      sideBarLeft: "-300px",
      contentLeft: "0px",
      contentRight: "0px",
      overlayVisibility: "hidden",
      overlayOpacity: "0"
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.scrollContainerToTop = this._scrollContainerToTop.bind(this);
    this.render404 = this._render404.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.httpStatus !== 200) {
      this.setState({ httpStatus: 200 });
    }

    if (this.state.isMobile) {
      this.setState({
        contentLeft: "0px",
        sideBarLeft: "-300px",
        contentRight: "0px",
        overlayVisibility: "hidden",
        overlayOpacity: "0"
      });
    }
  }
  componentWillMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.handleWindowSizeChange);
    }
  }
  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.handleWindowSizeChange);
    }
  }
  componentDidMount() {
    PubSub.subscribe("TOGGLE_SIDEBAR", this.toggleSidebar);
    PubSub.subscribe("SCROLL_CONTAINER_TO_TOP", this.scrollContainerToTop);
  }
  handleWindowSizeChange = () => {
    let width;
    if (typeof window === "undefined") {
      width = 768;
    } else {
      width = window.innerWidth;
    }
    if (width <= 767 && this.state.isMobile !== true) {
      this.setState({ isMobile: true });
    } else if (width > 767 && this.state.isMobile === true) {
      this.setState({ isMobile: false });
    }
  };
  _scrollContainerToTop() {
    const node = ReactDOM.findDOMNode(this.container);
    if (node !== null) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }

  toggleSidebar() {
    if (this.state.contentLeft === "0px") {
      this.setState({
        contentLeft: "300px",
        sideBarLeft: "0px",
        contentRight: "-478px",
        overlayVisibility: "visible",
        overlayOpacity: "1"
      });
    } else {
      this.setState({
        contentLeft: "0px",
        sideBarLeft: "-300px",
        contentRight: "0px",
        overlayVisibility: "hidden",
        overlayOpacity: "0"
      });
    }
  }
  _render404 = () => {
    this.setState({ httpStatus: 404 });
  };

  render() {
    let isMobile = this.state.isMobile;
    let sideBarLeft = this.state.sideBarLeft;
    let contentLeft = this.state.contentLeft;
    let contentRight = this.state.contentRight;
    let sidebar = "";
    let overlayStyle = {
      visibility: this.state.overlayVisibility,
      opacity: this.state.overlayOpacity
    };
    if (isMobile) {
      return (
        <div className="sidelayout">
          <ProgressBar percent={this.state.progress} />
          <div className="sidebar" style={{ left: sideBarLeft }}>
            <SideNavigation
              isMobile={isMobile}
              tableOfContent={this.props.tableOfContent}
            />
          </div>
          <div
            role="presentation"
            className="overlay-main-content-onsidebar"
            style={overlayStyle}
            onClick={this.toggleSidebar}
          >
            <Glyphicon
              glyph="remove"
              style={{
                position: "fixed",
                top: "25px",
                left: "330px",
                color: "white"
              }}
            />
          </div>
          <div
            className="body"
            style={{
              left: contentLeft,
              right: contentRight
            }}
          >
            <div
              ref={el => {
                this.container = el;
              }}
            >
              <NavigationMobile />
              <main>
                {this.props.content}
              </main>
              {!this.props.hideFooter ? <FooterMobile /> : null}
            </div>
          </div>
        </div>
      );
    } else {
      if (this.props.showSidebar) {
        sidebar = (
          <div className="sidebar" style={{ left: "0px" }}>
            <SideNavigation
              isMobile={isMobile}
              tableOfContent={this.props.tableOfContent}
            />
          </div>
        );
        contentLeft = "300px";
        contentRight = "0px";
      }
      return (
        <div className="sidelayout">
          <ProgressBar percent={this.state.progress} />
          {sidebar}
          <div
            className="body"
            style={{
              left: contentLeft,
              right: contentRight
            }}
          >
            <div
              ref={el => {
                this.container = el;
              }}
            >
              <Navigation />
              <main>
                {this.props.content}
              </main>
              {!this.props.hideFooter ? <FooterDesktop /> : null}
            </div>

          </div>

        </div>
      );
    }
  }
}
export default SidebarLayout;
