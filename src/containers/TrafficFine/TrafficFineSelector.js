import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';

import { LinkContainer } from 'react-router-bootstrap';

import TFSelectorCity from './TFSelectorCity';
import TFSelectorCategory from './TFSelectorCategory';

export default class TrafficFineSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: {},
      filteredCategory: null,
      filteredCity: null,
      nextUrl: '#',
    };
    this.onCityChange = this._onCityChange.bind(this);
    this.onCategoryChange  = this._onCategoryChange.bind(this);

  }
  componentDidUpdate(prevProp, prevState) {
    if(this.props.isMobile){
      if(this.state.nextUrl !== this.prevState.nextUrl){
        window.scrollTo(0, 0);
      }
    }

  }
  _getNextUrl(city,category){
    let slug=[],q=[],url_array=[];
    if(city){
      slug.push(city.name);
      q['city'] = String(city.id);
    }
    else if(this.state.filteredCity){
      slug.push(this.state.filteredCity.name);
      q['city'] = String(this.state.filteredCity.id);
    }
    if(category){
      slug.push(category.name);
      q['category'] = String(category.id);
    }
    else if(this.state.filteredCategory){
      slug.push(this.state.filteredCategory.name);
      q['category'] = String(this.state.filteredCategory.id);
    }
    Object.keys(q).forEach(function(key,index) {
      url_array.push(`${key}=${q[key]}`);
    });
    let url = '/traffic-fine/'+this.props.slugifyFn(slug.join(' ')) + '/?'+ url_array.join('&');
    //this.setState({nextUrl: url});
    return url;
  }
  _onCityChange(id,e) {
    let isSelected;
    if(this.state.filteredCity){
      isSelected = (this.state.filteredCity.id === id);
    }
    if(isSelected){
      this.setState({filteredCity: null,nextUrl:this._getNextUrl(null,null)});
    }
    else {
      this.props.trafficFineCities.forEach((element, index) => {
          if(String(element.id) === String(id)) {
            this.setState({filteredCity: element, nextUrl:this._getNextUrl(element,null)});
          }
      });
    }
  }
  _onCategoryChange(id,e){
    let isSelected;
    if(this.state.filteredCategory){
      isSelected = (this.state.filteredCategory.id === id);
    }
    if(isSelected){
      this.setState({filteredCategory: null,nextUrl:this._getNextUrl(null,null)});
    }
    else {
      this.props.trafficFineCategories.forEach((element, index) => {
          if(String(element.id) === String(id)) {
            this.setState({filteredCategory: element, nextUrl:this._getNextUrl(null,element)} )
          }
      });
    }
  }
  render() {

    let selector = '';
    if(this.props.isMobile){


      if(!this.state.filteredCity){
        selector = (
        <TFSelectorCity
          isMobile={this.props.isMobile}
          trafficFineCities={this.props.trafficFineCities}
          onCityChange={this.onCityChange}
          filteredCity={this.state.filteredCity}
        />
        )
      } else if(!this.state.filteredCategory) {
        selector = (
          <TFSelectorCategory
            isMobile={this.props.isMobile}
            trafficFineCategories={this.props.trafficFineCategories}
            onCategoryChange={this.onCategoryChange}
            filteredCategory={this.state.filteredCategory}
          />
          )
        }else {
          selector = (
            <div className="text-center">
              <LinkContainer to={this.state.nextUrl}>
                <Button bsStyle="primary" bsSize="large" block >Know your fine</Button>
                </LinkContainer>
            </div>
        )
      }

    } else {

      selector = (
        <div>
          <TFSelectorCity
            isMobile={this.props.isMobile}
            trafficFineCities={this.props.trafficFineCities}
            onCityChange={this.onCityChange}
            filteredCity={this.state.filteredCity}
          />
          <TFSelectorCategory
            isMobile={this.props.isMobile}
            trafficFineCategories={this.props.trafficFineCategories}
            onCategoryChange={this.onCategoryChange}
            filteredCategory={this.state.filteredCategory}
          />
            <br/>
          <div className="text-center">
              <LinkContainer to={this.state.nextUrl}>
              <Button bsStyle="primary" bsSize="large" >Know your fine</Button>
              </LinkContainer>
          </div>

        </div>
      )
    }



    return (
        <Grid className="container">
          <div className="traffic-fine-selector">
            <h3>Know your traffic fine</h3>
            <div>
              In trouble on the road and wondering what fine you should actually pay? Don't worry, we'll tell you
            </div>
            <br/><br/>
            {selector}
          </div>
          <hr/><br/>
          <div>
            <p>Want to know more about traffic rules, regulations and violations in India?</p>
              <LinkContainer to="/guide-to-traffic-rules/">
                <Button bsStyle="info" >View related laws</Button>
              </LinkContainer>
          </div>
        </Grid>
    );
  }
}

TrafficFineSelector.propTypes = {
  isMobile: React.PropTypes.bool.isRequired,
  trafficFineCategories: React.PropTypes.array,
  trafficFineCities: React.PropTypes.array,
  slugifyFn: React.PropTypes.func,
};
