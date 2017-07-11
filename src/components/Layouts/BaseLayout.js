import React, { Component } from "react";
import NotFound from "../NotFound.js";
import { apiRoot } from "../../config";

class BaseLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.serverSharedData = {};
    let width;
    this.apiRoot = apiRoot;
    if (typeof window === "undefined") {
      this.serverSharedData = this.context.ssrData;
      //@TODO fetch isMobile from server
      width = "768";
    } else {
      if (window.__SHARED_DATA__ !== undefined) {
        this.serverSharedData = window.__SHARED_DATA__;
        window.__SHARED_DATA__ = {};
      }
      width = window.innerWidth;
    }

    this.apiRootUrl = this.apiRoot;

    this.lang = "en";
    if (props.params.lang) {
      this.lang = props.params.lang;
    } else if (props.location.pathname.split("/")[1] === "hi") {
      this.lang = "hi";
    }
    this.state = {
      isMobile: width <= 767 ? true : false,
      httpStatus: 200
    };
    this.render404 = this._render404.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.lang = "en";
    if (nextProps.params.lang) {
      this.lang = nextProps.params.lang;
    } else if (nextProps.location.pathname.split("/")[1] === "hi") {
      this.lang = "hi";
    }
    if (this.state.httpStatus !== 200) {
      this.setState({ httpStatus: 200 });
    }
  }

  _render404 = () => {
    this.setState({ httpStatus: 404 });
  };

  render() {
    if (this.state.httpStatus === 404) {
      return <NotFound />;
    } else {
      return React.cloneElement(this.props.children, {
        lang: this.lang,
        apiRoot: this.apiRoot,
        apiRootUrl: this.apiRootUrl,
        serverSharedData: this.serverSharedData,
        isMobile: this.state.isMobile,
        onPageNotFound: this.render404
      });
    }
  }
}

BaseLayout.contextTypes = {
  ssrData: React.PropTypes.object
};

export default BaseLayout;
