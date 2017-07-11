import React, { Component } from "react";

import { browserHistory } from "react-router";

import SidebarLayout from "../../components/Layouts/SidebarLayout";
import SeoTags from "../../components/SeoTags";

import MobDropdownRow from "./MobDropdownRow";
import DesDropdownRow from "./DesDropdownRow";
import TrafficFineSelector from "./TrafficFineSelector";
import TFList from "./TFList";
import "./TrafficFine.css";

class TrafficFine extends Component {
  constructor(props) {
    super(props);

    if (this.props.serverSharedData.trafficFines !== undefined) {
      const json = this.props.serverSharedData;
      this.state = {
        seo: {},
        trafficFines: json.trafficFines.results,
        trafficFineCategories: json.trafficFineCategories,
        trafficFineCities: json.trafficFineCities,
        filteredCategory: null,
        filteredCity: null
      };
    } else {
      this.state = {
        seo: {},
        trafficFines: [],
        trafficFineCities: [],
        trafficFineCategories: [],
        filteredCategory: null,
        filteredCity: null
      };
    }
    this.onCityChange = this._onCityChange.bind(this);
    this.onCategoryChange = this._onCategoryChange.bind(this);
  }

  componentDidMount() {
    if (this.props.serverSharedData.trafficFines === undefined) {
      this.fetchLoadData(this.props, this.state);
    }
  }
  componentWillReceiveProps(nextProps) {
    //if(nextProps.location.query.category !== this.props.location.query.category || nextProps.location.query.city !== this.props.location.query.city || nextProps.location.query.id !== this.props.location.query.id) {
    this.fetchLoadData(nextProps);
    //}
  }
  componentWillUnmount() {
    this.hasUnmounted = true;
  }
  /*componentWillUpdate(nextProps, nextState) {
    if(nextState.filteredCity && nextState.filteredCategory && (
      nextState.filteredCity !== this.state.filteredCity || nextState.filteredCategory !== this.state.filteredCategory))
       {
      //this.fetchUpdateData(nextProps,nextState);
    }
  }*/

  fetchUpdateData(props, state) {
    let city, category;
    if (state) {
      if (state.filteredCity) {
        city = state.filteredCity.id;
      }
      if (state.filteredCategory) {
        category = state.filteredCategory.id;
      }
    }
    this.fetchIniData(props, state, city, category);
  }

  fetchLoadData(props, state) {
    let city, category;
    if (props.location.query) {
      city = props.location.query.city;
    }
    if (props.location.query) {
      category = props.location.query.category;
    }

    this.fetchIniData(props, state, city, category);
  }

  fetchIniData(props, state, city, category) {
    let q = "";

    if (city) {
      q = q + "?city=" + city;
    }
    if (category) {
      if (q) {
        q = q + "&category=" + category;
      } else {
        q = q + "?category=" + category;
      }
    }

    fetch(`${this.props.apiRoot}/api/traffic-fine/${q}`)
      .then(response => response.json())
      .then(json => {
        if (!this.hasUnmounted) {
          let filteredCity = null;
          let filteredCategory = null;
          if (category && json.trafficFineCategories) {
            json.trafficFineCategories.forEach((element, index) => {
              if (String(element.id) === String(category)) {
                filteredCategory = element;
              }
            });
          }
          if (city && json.trafficFineCities) {
            json.trafficFineCities.forEach((element, index) => {
              if (String(element.id) === String(city)) {
                filteredCity = element;
              }
            });
          }

          this.setState({
            trafficFines: json.trafficFines.results,
            trafficFineCategories: json.trafficFineCategories,
            trafficFineCities: json.trafficFineCities,
            filteredCity: filteredCity,
            filteredCategory: filteredCategory,
            seo: json.seo
          });
        }
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
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
  _pushToUrlOnChangeFilter(new_query) {
    let q = this.props.location.query;
    let url = "", slug = [];
    let url_array = [];
    if (this.state.filteredCity) {
      slug.push(this.state.filteredCity.name);
    }
    if (new_query["city"]) {
      q["city"] = String(new_query["city"].id);
      slug.pop();
      slug.push(new_query["city"].name);
    }
    if (this.state.filteredCategory) {
      slug.push(this.state.filteredCategory.name);
    }
    if (new_query["category"]) {
      q["category"] = String(new_query["category"].id);
      slug.pop();
      slug.push(new_query["category"].name);
    }
    Object.keys(q).forEach(function(key, index) {
      url_array.push(`${key}=${q[key]}`);
      //slug.push(new_query['city'].name);
    });
    url = url_array.join("&");
    slug = "/" + this._slugify(slug.join(" "));
    browserHistory.push(`/traffic-fine${slug}/?${url}`);
  }
  _onCityChange(e, k) {
    let filteredCity;
    this.state.trafficFineCities.forEach((element, index) => {
      if (element.id === e) {
        filteredCity = element;
      }
    });
    if (filteredCity) {
      this._pushToUrlOnChangeFilter({ city: filteredCity });
    }
  }
  _onCategoryChange(e, k) {
    let filteredCategory;
    this.state.trafficFineCategories.forEach((element, index) => {
      if (element.id === e) {
        filteredCategory = element;
      }
    });
    if (filteredCategory) {
      this._pushToUrlOnChangeFilter({ category: filteredCategory });
    }
  }
  renderContent() {
    let dropdownrow;
    if (
      (this.props.location.query.category ||
        this.props.location.query.city ||
        this.props.location.query.id) &&
      this.props.params.slug
    ) {
      if (this.props.isMobile) {
        dropdownrow = (
          <MobDropdownRow
            trafficFineCategories={this.state.trafficFineCategories}
            trafficFineCities={this.state.trafficFineCities}
            filteredCity={this.state.filteredCity}
            filteredCategory={this.state.filteredCategory}
            onCityChange={this.onCityChange}
            onCategoryChange={this.onCategoryChange}
          />
        );
      } else {
        dropdownrow = (
          <DesDropdownRow
            trafficFineCategories={this.state.trafficFineCategories}
            trafficFineCities={this.state.trafficFineCities}
            filteredCity={this.state.filteredCity}
            filteredCategory={this.state.filteredCategory}
            onCityChange={this.onCityChange}
            onCategoryChange={this.onCategoryChange}
          />
        );
      }
      return (
        <div>
          <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
          <div>
            {dropdownrow}
          </div>
          <br />
          <div>
            <TFList
              isMobile={this.props.isMobile}
              dataList={this.state.trafficFines}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <SeoTags seo={this.state.seo} apiRoot={this.props.apiRootUrl} />
          <TrafficFineSelector
            slugifyFn={this._slugify}
            isMobile={this.props.isMobile}
            trafficFineCategories={this.state.trafficFineCategories}
            trafficFineCities={this.state.trafficFineCities}
          />
        </div>
      );
    }
  }
  render() {
    return <SidebarLayout content={this.renderContent()} />;
  }
}

export default TrafficFine;
