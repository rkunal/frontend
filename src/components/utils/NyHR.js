import React from 'react';

export default class NyHR extends React.Component {

  render() {
    let hgth = '1px';
    let margin = '0px auto';
    
    if(this.props.height){
      hgth = this.props.height
    }
    if(this.props.margin){
      margin = this.props.margin
      
    }
    const HRStyle = {
      //width: '90%',
      border: '0',
      height: hgth,
      backgroundColor: '#B7B7B7',
      color: '#ECECEC',
      opacity: '0.2',
      textAlign: 'center',
      margin: margin,
    }
    return (
      <hr style={HRStyle}/>
    );
  }
}

