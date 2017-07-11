import React, { Component } from "react";

import TocEntry from "./TocEntry";
import ToggleNavEntry from "../ToggleNavEntry/ToggleNavEntry";

export default class TocItem extends Component {
  render() {
    if (this.props.collapsible) {
      return (
        <li className={this.props.className}>
          <ToggleNavEntry
            open={this.props.open}
            title={this.props.title}
            style={{
              padding: "10px",
              borderBottom: "#437414 2px solid",
              color: "white",
              lineHeight: "32px",
              fontSize: "1.5rem",
              fontFamily: "Fira Sans"
            }}
          >
            {this.props.children}
          </ToggleNavEntry>
        </li>
      );
    } else {
      return (
        <li style={this.props.style} className={this.props.className}>
          <TocEntry
            title={this.props.title}
            open={this.props.open}
            url={this.props.url}
            hash={this.props.hash}
            activeStyle={this.props.activeStyle}
            navType={this.props.navType}
          />
          {this.props.children}
        </li>
      );
    }
  }
}
