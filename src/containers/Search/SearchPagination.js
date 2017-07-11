import React from 'react';

import Pagination from 'react-bootstrap/lib/Pagination';

import { browserHistory } from 'react-router'

export default class SearchPagination extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        activePage: this.props.activePage,
      };
      this.handleSelect = this._handleSelect.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      activePage: nextProps.activePage
    })
  }

    _handleSelect(eventKey) {
      let query_part = '';
      this.setState({
        activePage: eventKey
      });
      if(eventKey !== 1){
        query_part = `?page=${eventKey}`
      }
      browserHistory.push(`/search/${this.props.keywordSlug}/${query_part}`)
    }
  render() {

    if(this.props.numResults){
      return (
        <Pagination
          bsSize="small"
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={this.props.items}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
      );

    } else {
      return (<span></span>);
    }


  }
}

SearchPagination.propTypes = {

};
