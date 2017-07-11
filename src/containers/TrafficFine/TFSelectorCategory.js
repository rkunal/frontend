import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';




export default class TFSelectorCategory extends React.Component {


  render() {
    let isSelected,categories;

    isSelected=false;

    categories = this.props.trafficFineCategories.map((item, index) => {
      if(this.props.filteredCategory){
        isSelected = (this.props.filteredCategory.id === item.id);
      }
      let styleCity = {};
      if(isSelected){
        styleCity.border = "4px solid #B20220"
      } else {
        styleCity.border = "4px solid transparent";
      }
      
      return (
       <Col xs={6} md={4} sm={3} lg={2} key={index}>
        <Button className="traffic-fine-selector-button" style={styleCity} bsStyle="link" onClick={this.props.onCategoryChange.bind(this, item.id, isSelected)}>
    <Image src={item.icon} alt={item.name} responsive />
          <div className="traffic-fine-selector-name">{item.name}</div>
        </Button>
      </Col>
    )
    });
    
    return (
      <div>
        <h5 >What are you in trouble for?</h5>
        <Row>
          {categories}
        </Row>
      </div>
    );
  }
}

TFSelectorCategory.propTypes = {
  isMobile: React.PropTypes.bool.isRequired,
  trafficFineCategories: React.PropTypes.array.isRequired,
  onCategoryChange: React.PropTypes.func.isRequired,
  filteredCategory: React.PropTypes.object,
};

