import React from 'react';

import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { browserHistory } from 'react-router'

export default class BigSearchBox extends React.Component {
  constructor(props) {
    super(props);
  this.onKeywordChange = this._onKeywordChange.bind(this);
  this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
}
_onKeywordChange(e) {
  //console.log(this);
  //let keyword = this._slugify(e.target.value);

}
_onLinkInputKeyDown(e) {

  //console.log(e.which);
  if (e.which === 13) {
    e.preventDefault();
    let slug = this._slugify(e.target.value);
      if(slug.length){
	  browserHistory.push(`/search/${slug}/`)
      }
  }
}
_slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text
      .replace(/[\s_-]+/g, '-');
}
  render() {

    return (
      <form>
        <FormGroup controlId="searchNyaayaText" bsSize="large">
          <FormControl
            type="text"
            placeholder="Search Nyaaya"
            onChange={this.onKeywordChange}
            onKeyDown={this.onLinkInputKeyDown}
            //value={textValue}
            />
          <FormControl.Feedback>
            <Glyphicon glyph="search" />
          </FormControl.Feedback>
        </FormGroup>
      </form>

    );
  }
}

BigSearchBox.propTypes = {
};
