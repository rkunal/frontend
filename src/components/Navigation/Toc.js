import React, { Component } from "react";

export default class Toc extends Component {
  render() {
    return (
      <nav
        role="navigation"
        style={this.props.style}
        className={this.props.className}
      >
        {this.props.children}
      </nav>
    );
  }
}
