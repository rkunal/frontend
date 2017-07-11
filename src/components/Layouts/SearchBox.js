import React from "react";

import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { browserHistory } from "react-router";

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.textValue) {
      this.state = {
        textValue: this.props.textValue.replace(/-/g, " ")
      };
    } else {
      this.state = {
        textValue: ""
      };
    }

    this.onKeywordChange = this._onKeywordChange.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.textValue) {
      this.state = {
        textValue: nextProps.textValue.replace(/-/g, " ")
      };
    } else {
      this.state = {
        textValue: ""
      };
    }
  }
  _onKeywordChange(e) {
    this.setState({ textValue: e.target.value });
  }
  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      e.preventDefault();
      let slug = this._slugify(e.target.value);
      if (slug.length) {
        browserHistory.push(`/search/${slug}/`);
      } else {
        browserHistory.push(`/search/`);
      }
    }
  }
  _slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "") // Trim - from end of text
      .replace(/[\s_-]+/g, "-");
  }
  render() {
    return (
      <form>
        <FormGroup controlId="top-nav-search" bsSize="small">
          <FormControl
            type="text"
            placeholder="Search Nyaaya"
            onChange={this.onKeywordChange}
            onKeyDown={this.onLinkInputKeyDown}
            value={this.state.textValue}
          />
          <FormControl.Feedback>
            <Glyphicon glyph="search" />
          </FormControl.Feedback>
        </FormGroup>
      </form>
    );
  }
}

SearchBox.propTypes = {};
