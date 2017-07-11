import React, { Component } from "react";
import Collapse from "react-bootstrap/lib/Collapse";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

export default class ToggleNavEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tocs: [],
      open: props.open
    };
  }
  toggleChildren = () => {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  };
  render() {
    return (
      <div>
        <div style={this.props.style} onClick={this.toggleChildren}>
          <span style={this.props.titleStyle}>
            {this.props.title}
          </span>
          <span
            style={{
              color: "#d3ea75",
              float: "right"
            }}
          >
            <Glyphicon
              glyph={this.state.open ? "chevron-up" : "chevron-down"}
            />
          </span>
        </div>
        <Collapse in={this.state.open} unmountOnExit={true}>
          {this.props.children}
        </Collapse>
      </div>
    );
  }
}
