import React from 'react';

import TFRowFine from './TFRowFine';
import NyHR from '../../components/utils/NyHR';
import './TFRow.css';


export default class TFRow extends React.Component {

  render() {
    const simplified = this.props.dataRow.simplified.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return (
      <div>
      <div className="container">
      <div className="tfrow">
        <div>
          <h4>{this.props.dataRow.traffic_offense}</h4>
        </div>
        <div className="text-muted" dangerouslySetInnerHTML={ {__html: simplified }} />

        <NyHR margin="5px auto" />
        <TFRowFine whichTime="1st Time" fineOffense={this.props.dataRow.fine_first_offense} jailOffense={this.props.dataRow.jail_first_offense} />
        <TFRowFine whichTime="2nd Time" fineOffense={this.props.dataRow.fine_second_offense} jailOffense={this.props.dataRow.jail_second_offense} />
        <div className="hyperlink">
          <a href={this.props.dataRow.hyperlink}>
            {this.props.dataRow.text_of_hyperlink}
          </a>
        </div>
      </div>
      </div>
      <NyHR height="3px"  />
      </div>
    );
  }
}

TFRow.propTypes = {
  dataRow: React.PropTypes.object.isRequired,
};
