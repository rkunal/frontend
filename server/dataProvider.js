import React, { Component } from "react";
import { RouterContext } from "react-router";

class DataProvider extends Component {
  getChildContext() {
    return { ssrData: this.props.ssrData };
  }
  render() {
    return <RouterContext {...this.props} />;
  }
}

DataProvider.propTypes = {
  ssrData: React.PropTypes.object
};

DataProvider.childContextTypes = {
  ssrData: React.PropTypes.object
};

export default DataProvider;
