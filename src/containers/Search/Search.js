import React, { Component } from "react";
import SidebarLayout from "../../components/Layouts/SidebarLayout";
import SeoTags from "../../components/SeoTags";

import PubSub from "pubsub-js";

import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";

import Row from "react-bootstrap/lib/Row";

import PopularSearchQueries from "./PopularSearchQueries";
import SearchPagination from "./SearchPagination";
import SRP from "./SRP";

class Search extends Component {
  constructor(props) {
    super(props);
    let page = 1;
    let keyword = "";
    if (this.props.location.query.page) {
      const _page = parseInt(this.props.location.query.page, 10);
      if (_page && !isNaN(_page) && _page !== 0) {
        page = _page;
      }
    }
    if (this.props.params.keyword) {
      keyword = this.props.params.keyword.replace(/-/g, " ");
    }
    this.state = {
      seo: {},
      results: [],
      page: page,
      num_results: 0,
      not_found: false,
      keyword: keyword
    };
  }

  componentDidMount() {
    PubSub.publish("LOADER_UPDATE", 10);
    if (this.props.params.keyword) {
      this.fetchIniData(this.props, this.state);
    } else {
      PubSub.publish("LOADER_UPDATE", 100);
    }
  }
  componentWillUnmount() {
    this.hasUnmounted = true;
  }
  componentWillReceiveProps(nextProps) {
    PubSub.publish("SCROLL_CONTAINER_TO_TOP");
    PubSub.publish("LOADER_UPDATE", 10);
    //Update only if URL changed or Layout got resized to mobile/desktop
    if (
      nextProps.location.pathname === this.props.location.pathname &&
      nextProps.location.query.page === this.props.location.query.page &&
      nextProps.isMobile === this.props.isMobile
    ) {
      PubSub.publish("LOADER_UPDATE", 100);
    } else {
      if (nextProps.params.keyword) {
        /*this.setState({
          results: [],
          num_results : 0,
          not_found: false
        },function(){
          PubSub.publish('LOADER_UPDATE', 100 );
        });*/

        this.fetchIniData(nextProps);
      } else {
        this.setState(
          {
            results: [],
            num_results: 0,
            not_found: false,
            keyword: ""
          },
          function() {
            PubSub.publish("LOADER_UPDATE", 100);
          }
        );
      }
    }
  }
  fetchIniData(props, state) {
    //this.setState({ isLoading: true });

    let page_query = "";
    let page_num = parseInt(props.location.query.page, 10);
    if (isNaN(page_num)) {
      page_num = 1;
    }
    if (page_num && page_num !== 1 && page_num !== 0) {
      page_query = `pageno=${page_num}&`;
    }
    PubSub.publish("LOADER_UPDATE", 20);

    fetch(`${props.apiRoot}/search/${props.params.keyword}/?${page_query}json`)
      .then(response => {
        PubSub.publish("LOADER_UPDATE", 90);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          if (!this.hasUnmounted) {
            this.setState({
              results: [],
              num_results: 0,
              not_found: true,
              page: page_num,
              keyword: props.params.keyword.replace(/-/g, " ")
            });
          }
          throw Error("no results found");
        }
      })
      .then(json => {
        if (!this.hasUnmounted) {
          this.setState(
            {
              results: json.srp.results,
              num_results: json.srp.count,
              not_found: false,
              page: page_num,
              keyword: props.params.keyword.replace(/-/g, " ")
            },
            function() {
              PubSub.publish("LOADER_UPDATE", 100);
            }
          );
        }
      })
      .catch(function(ex) {
        PubSub.publish("LOADER_UPDATE", 100);
        //console.log('parsing failed', ex)
      });
  }

  render() {
    let results;
    const num_pages = Math.ceil(this.state.num_results / 10);

    if (this.state.keyword !== "") {
      results = (
        <SRP
          isMobile={this.props.isMobile}
          results={this.state.results}
          keyword={this.state.keyword}
          numResults={this.state.num_results}
          notFound={this.state.not_found}
        />
      );
    } else {
      results = <PopularSearchQueries />;
    }
    const content = (
      <div>
        <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
        <Grid className="container">
          <Row>
            <Col lg={12} xs={12}>
              {results}
            </Col>
            <Col>
              <SearchPagination
                activePage={this.state.page}
                items={num_pages}
                numResults={this.state.num_results}
                keywordSlug={this.state.keyword.replace(/ /g, "-")}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
    return (
      <SidebarLayout
        content={content}
        showSidebar={false}
        tocs={[]}
        hideFooter={true}
      />
    );
  }
}

export default Search;
