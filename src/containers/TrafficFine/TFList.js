import React from 'react';
import TFRow from './TFRow';
import DesTFRow from './DesTFRow';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import NyHR from '../../components/utils/NyHR';


export default class TFList extends React.Component {
// 66 115 20 , 236 236 236
  render() {
    let rows,container;
    if(this.props.isMobile){
      rows = (
        this.props.dataList.map((d, index) =>
          <TFRow dataRow={d} key={index}/>
        )
      );
      container = (
        <div>
          <div className="container">
            <h4 className="section-headline">OFFENCES</h4>
          </div>
          <NyHR height="3px" />
          {rows}
        </div>
      )
    } else {
      rows = (
        this.props.dataList.map((d, index) =>
          <DesTFRow dataRow={d} key={index}/>
        )
      );
      container = (
        <Grid>
          <Row>
            <Col xs={6} sm={6} lg={6} md={6}>
             <h4>OFFENSE</h4>
              <NyHR margin="1px auto"  height="3px"/>
            </Col>
            <Col xs={3} sm={3} lg={3} md={3}>
              <h4>FIRST TIME</h4>
        <NyHR margin="1px auto"  height="3px"/>
            </Col>
            <Col xs={3} sm={3} lg={3} md={3}>
              <h4>SECOND TIME</h4>
        <NyHR margin="1px auto"  height="3px"/>
            </Col>
          </Row>
          
          {rows}
        </Grid>
      )
    }
    
    return (
        <div>
            {container}
        </div>
    );
  }
}

TFList.propTypes = {
  dataList: React.PropTypes.array.isRequired,
};

