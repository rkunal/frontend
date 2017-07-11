import React from 'react';


//import Button from 'react-bootstrap/lib/Button';
//import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

//import { LinkContainer } from 'react-router-bootstrap';
import BigSearchBox from './BigSearchBox';

export default class PopularSearchQueries extends React.Component {
/*
<br/>
<span>
<i style={{color:'grey'}}>Popular Searches on Nyaaya</i>
  <br/>

  <ButtonToolbar>
      <Button bsStyle="warning"  >Laws</Button>
<LinkContainer to='/search/constitution/'><Button bsStyle="link">Indian Constitution</Button></LinkContainer>
<LinkContainer to='/search/377/'><Button bsStyle="link">377</Button></LinkContainer>
<LinkContainer to='/search/easement-act/'><Button bsStyle="link">Easement Act</Button></LinkContainer>
<LinkContainer to='/search/traffic/'><Button bsStyle="link">traffic fines</Button></LinkContainer>
<LinkContainer to='/search/345-a/'><Button bsStyle="link">345 A</Button></LinkContainer>
  </ButtonToolbar>
  <br/>
  <ButtonToolbar >
<LinkContainer to='/search/crpc/'><Button bsStyle="danger">CRPC</Button></LinkContainer>
<LinkContainer to='/search/ipc/'><Button bsStyle="link">IPC</Button></LinkContainer>
<LinkContainer to='/search/sexual-harrasement/'><Button bsStyle="link">Sexual Harrasment</Button></LinkContainer>
<LinkContainer to='/search/fine-in-delhi/'><Button bsStyle="link">Fine in delhi for drunk driving</Button></LinkContainer>
<LinkContainer to='/search/traffic/'><Button bsStyle="link">traffic fines</Button></LinkContainer>
<LinkContainer to='/search/how-to-file-fir/'><Button bsStyle="link">How to file FIR</Button></LinkContainer>
  </ButtonToolbar>
  <br/>

</span>
*/
  render() {

    return (
      <BigSearchBox />
    );
  }
}

PopularSearchQueries.propTypes = {
};
