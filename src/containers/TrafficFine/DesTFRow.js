import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import DesTFRowFine from './DesTFRowFine';

import NyHR from '../../components/utils/NyHR';
import './TFRow.css';


export default class DesTFRow extends React.Component {

  render() {
    let targetBlank = '_blank';
    const simplified = this.props.dataRow.simplified.replace(/(?:\r\n|\r|\n)/g, '<br />');

    if(this.props.dataRow.hyperlink.substring(0,16) ==='http://nyaaya.in') {
      targetBlank = '';
    }
    return (
      <div>
      <Row className="tfrow">
        <Col xs={6} sm={6} lg={6} md={6}>
          <b>{this.props.dataRow.traffic_offense}</b>
          <div className="text-muted" dangerouslySetInnerHTML={ {__html: simplified }} />
          <div className="hyperlink" >
            <a href={this.props.dataRow.hyperlink} target={targetBlank}>
              {this.props.dataRow.text_of_hyperlink}
            </a>
          </div>
        </Col>
        <Col xs={3} sm={3} lg={3} md={3}>
          
          <DesTFRowFine whichTime="1st Time" fineOffense={this.props.dataRow.fine_first_offense} jailOffense={this.props.dataRow.jail_first_offense} />
        </Col>
        <Col xs={3} sm={3} lg={3} md={3}>
          <DesTFRowFine whichTime="2nd Time" fineOffense={this.props.dataRow.fine_second_offense} jailOffense={this.props.dataRow.jail_second_offense} />
        </Col>
      </Row>
      <NyHR margin="5px auto"  height="1px"/>
      </div>

    );
  }
}

DesTFRow.propTypes = {
  dataRow: React.PropTypes.object.isRequired,
};
