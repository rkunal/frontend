import React from "react";

export default class SRP extends React.Component {
  _getCategoryText(c) {
    if (c === "crpc-victim-explainer") {
      return "CRPC Guide (Victim)";
    } else if (c === "crpc-accused-explainer") {
      return "CRPC Guide (Accused)";
    } else if (c === "crpc-victim-intro") {
      return "CRPC Guide (Victim)";
    } else if (c === "crpc-accused-intro") {
      return "CRPC Guide (Accused)";
    } else {
      return c;
    }
  }
  render() {
    let rows = "", srp = "", message;
    const rowStyle = {
      paddingTop: "18px",
      paddingBottom: "6px"
    };
    let searchResultsStyle;
    if (this.props.isMobile) {
      searchResultsStyle = {
        width: "100%"
      };
    } else {
      searchResultsStyle = {
        width: "90%"
      };
    }

    if (this.props.results.length) {
      message = (
        <div>
          {this.props.numResults} results found for '{this.props.keyword}'
        </div>
      );
      rows = this.props.results.map((item, index) => (
        <div key={index} style={rowStyle}>
          <div>
            <a href={item.url}>
              <span dangerouslySetInnerHTML={{ __html: item.title }} />
            </a>
            {" "}
            <span>
              <small className="text-muted">
                {this._getCategoryText(item.category)}
              </small>
            </span>
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: item.raw_text.substring(0, 200)
              }}
            />
          </div>
        </div>
      ));
      srp = (
        <div>
          {message}
          {rows}
        </div>
      );
    } else if (this.props.notFound) {
      srp = <span>No results found for '{this.props.keyword}'</span>;
    } /* else {
      srp = <span>Searching for '{this.props.keyword}'...</span>
    }*/
    return (
      <div className="search-results" style={searchResultsStyle}>

        {srp}
      </div>
    );
  }
}

SRP.propTypes = {
  results: React.PropTypes.array.isRequired,
  keyword: React.PropTypes.string.isRequired,
  numResults: React.PropTypes.number.isRequired
};
