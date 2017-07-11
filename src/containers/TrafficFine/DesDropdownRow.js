import React from 'react';

import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export default class DesDropdownRow extends React.Component {
// 66 115 20 , 236 236 236
  render() {
    let filteredCityText = 'All-India';
    if(this.props.filteredCity){
      filteredCityText = this.props.filteredCity.name;
    }
    let filteredCategoryText = 'Choose Category';
    if(this.props.filteredCategory){
      filteredCategoryText = this.props.filteredCategory.name;
    }
    const trafficFineCityMenuItems = (
      this.props.trafficFineCities.map((item, index) =>
         <MenuItem key={index}  eventKey={item.id}>{item.name}</MenuItem>
      )
    )
    const trafficFineCategoryMenuItems = (
      this.props.trafficFineCategories.map((item, index) =>
         <MenuItem key={index} eventKey={item.id}>{item.name}</MenuItem>
      )
    )
    return (
      <div className="container desktop-traffic-fine-filters">
        
        <DropdownButton  
          bsStyle="link"
          title={filteredCategoryText}
          onSelect={this.props.onCategoryChange}
          id="traffic-fine-category-dropdown">
          {trafficFineCategoryMenuItems}
        </DropdownButton>
        <span className="desktop-traffic-fine-city-dropdown-parent">
          <DropdownButton 
            bsStyle="link"
            title={filteredCityText} 
            onSelect={this.props.onCityChange}
            id="traffic-fine-city-dropdown"
            >
            {trafficFineCityMenuItems}
          </DropdownButton>
        </span>
      </div>
    );
  }
}

DesDropdownRow.propTypes = {
  trafficFineCategories: React.PropTypes.array.isRequired,
  trafficFineCities: React.PropTypes.array.isRequired,
  filteredCity: React.PropTypes.object,
  filteredCategory: React.PropTypes.object,
  onCityChange: React.PropTypes.func.isRequired,
  onCategoryChange: React.PropTypes.func.isRequired,
};

