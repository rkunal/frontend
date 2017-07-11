import React, { Component } from "react";

import { Link } from "react-router";

export default class TocEntry extends Component {
  render() {
    const h2Style = {
      fontFamily: "Fira Sans",
      fontSize: "18px",
      color: "white"
    };

    return (
      <span>
        {this.props.navType === "heading2"
          ? this.props.url
              ? <h2 style={h2Style}>
                  <Link
                    to={{
                      pathname: this.props.url,
                      hash: this.props.hash ? `#${this.props.hash}` : null
                    }}
                  >
                    {this.props.title}
                  </Link>
                </h2>
              : <h2 style={h2Style}>{this.props.title}</h2>
          : this.props.url
              ? <Link
                  to={{
                    pathname: this.props.url,
                    hash: this.props.hash ? `#${this.props.hash}` : null
                  }}
                  activeStyle={this.props.activeStyle}
                >
                  {this.props.title}
                </Link>
              : <span style={{ color: "#b7b7b7" }}>{this.props.title}</span>}
      </span>
    );
  }
}
