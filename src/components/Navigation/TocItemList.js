import React, { Component } from "react";

export default class TocItemList extends Component {
  render() {
    return (
      <ul style={this.props.style} className={this.props.className}>
        {this.props.children}
      </ul>
    );
  }
}
