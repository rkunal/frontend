import React from 'react';

export default class DesTFRowFine extends React.Component {
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
            <br/>
            <span className="offense"><b>{this.props.jailOffense}</b></span>
            <span> in prison</span>
          </span>
        )
      } 
      return (
        <span className="fines">
            <span className="offense">
              <b>&#8377; {this.props.fineOffense}</b>
            </span>
            <span> Fine </span>
            {col_trail} 
        </span>
        )
    }
  }
}

DesTFRowFine.propTypes = {
  fineOffense: React.PropTypes.string,
  jailOffense: React.PropTypes.string,
  whichTime: React.PropTypes.string,
};

