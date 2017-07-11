import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import NyHR from '../../components/utils/NyHR';

export default class TFRowFine extends React.Component {
// 66 115 20 , 236 236 236
  render() {
    let col_trail = '';
    if(!this.props.fineOffense) {
      return null
    } else {
      if(this.props.jailOffense) {
        col_trail = (
          <span>
            <span className="text-muted"> and/or </span>
            <span className="offense"><b>{this.props.jailOffense}</b></span>
            <span> in prison</span>
          </span>
        )
      } 
      return (
        <span>
          <Grid className="fines">
            <Row>
              <Col xs={4} md={4}>
                <b>{this.props.whichTime}</b>
              </Col>
              <Col xs={8} md={8}>
                <span className="offense">
                  <b>&#8377; {this.props.fineOffense}</b>
                </span>
                <span> Fine </span>
                {col_trail}
              </Col>
            </Row>
          </Grid>
          <NyHR margin="5px auto" />
        </span>
        )
    }
  }
}

TFRowFine.propTypes = {
  fineOffense: React.PropTypes.string,
  jailOffense: React.PropTypes.string,
  whichTime: React.PropTypes.string,
};

