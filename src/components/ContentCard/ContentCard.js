import React, { Component } from "react";
import Col from "react-bootstrap/lib/Col";
import Image from "react-bootstrap/lib/Image";
import "./ContentCard.css";
import { Link } from "react-router";

export default class ContentCard extends Component {
  render() {
    const styleHeader = {
      color: "#7ED321"
    };
    const styletext = {
      color: "#B7B7B7"
    };
    const imageStyle = {
      border: "1px solid #B7B7B7"
    };

    return (
      <Col xs={12} sm={6} md={3} lg={3}>
        <div style={imageStyle}>
          <Link to={this.props.Url}>
            <Image
              src={this.props.imageUrl}
              alt={this.props.Title}
              responsive
            />
          </Link>
        </div>
        <div>
          <Link to={this.props.Url}>
            <h3 style={styleHeader}> {this.props.Title} </h3>
          </Link>
          {this.props.shortTitle
            ? <Link to={this.props.Url} style={styletext}>
                {this.props.shortTitle}
              </Link>
            : null}
        </div>
      </Col>
    );
  }
}

ContentCard.propTypes = {
  Title: React.PropTypes.string.isRequired,
  Url: React.PropTypes.string.isRequired,
  imageUrl: React.PropTypes.string.isRequired,
  shortTitle: React.PropTypes.string
};
