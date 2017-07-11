import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';




export default class TFSelectorCity extends React.Component {


  render() {
    let isSelected,cities;

    isSelected=false;
    cities = this.props.trafficFineCities.map((item, index) => {
      if(this.props.filteredCity){
        isSelected = (this.props.filteredCity.id === item.id);
      }
      let styleCity = {};
      if(isSelected){
        styleCity.border = "4px solid #B20220"
      } else {
        styleCity.border = "4px solid transparent";
      }
      
      return (
       <Col xs={6} md={4} sm={3} lg={2} key={index}>
        <Button className="traffic-fine-selector-button" style={styleCity} bsStyle="link" onClick={this.props.onCityChange.bind(this, item.id, isSelected)}>
    <Image src={item.icon} alt={item.name} responsive />
          <div className="traffic-fine-selector-name">{item.name}</div>
        </Button>
      </Col>
    )
    });
    
    return (
      <div>
        <h5 >Which city are you in?</h5>
        <Row>
          {cities}
        </Row>
      </div>
    );
  }
}

TFSelectorCity.propTypes = {
  isMobile: React.PropTypes.bool.isRequired,
  trafficFineCities: React.PropTypes.array.isRequired,
  onCityChange: React.PropTypes.func.isRequired,
  filteredCity: React.PropTypes.object,
};

