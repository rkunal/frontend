import React from "react";

import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Image from "react-bootstrap/lib/Image";

import NyHR from "../../components/utils/NyHR";
import SidebarLayout from "../../components/Layouts/SidebarLayout";

class AboutUs extends React.Component {
  render() {
    return <SidebarLayout content={this.renderContent()} />;
  }
  renderContent() {
    const centerStyle = {
      float: "none",
      margin: "0 auto"
    };
    const imageStyle = {
      margin: "0 auto",
      width: "100px"
    };
    const nameStyle = {
      marginBottom: "0px",
      marginTop: "0px"
    };
    const introStyle = {
      paddingTop: "10px",
      paddingBottom: "10px"
    };
    const linkStyle = {
      color: "black"
    };
    return (
      <div>
        <Grid>
          <Row className="container">
            <Col className="text-center" style={centerStyle}>
              <h1 className="text-center">Support</h1>
              Nyaaya is made possible with generous support and inspiration from Rohini Nilekani and Vikram Lal. It is incubated at the Vidhi Centre for Legal Policy.
              <br /><br /><br /><NyHR height="1.5px" />
            </Col>
          </Row>
          <Row className="container">
            <Col className="text-center" style={centerStyle}>
              <h1 className="text-center">Team</h1>
            </Col>
            <br />
            <Col lg={4} md={4} sm={4} xs={12}>
              <Image
                style={imageStyle}
                src="http://nyaaya.in/assets/images/staticpages_images/srijonisen.jpg"
                responsive
                circle
              />
              <br />
              <h3 style={nameStyle} className="text-center">
                <a
                  style={linkStyle}
                  target="_blank"
                  href="https://in.linkedin.com/in/srijoni-sen-504a632a"
                >
                  Srijoni Sen
                </a>
              </h3>
              <div className="text-center"><small>CEO</small></div>
              <div style={introStyle}>
                Worked at Vidhi Centre, McKinsey. Studied at Columbia & NLSIU. Srijoni wants to make new connections between law, technology and the non-profit space in India. She will bore you to death on all three, given half a chance.
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12}>
              <Image
                style={imageStyle}
                src="http://nyaaya.in/assets/images/staticpages_images/kunalrachhoya.jpeg"
                responsive
                circle
              />
              <br />
              <h3 style={nameStyle} className="text-center">
                <a
                  style={linkStyle}
                  target="_blank"
                  href="https://in.linkedin.com/in/kunalrachhoya"
                >
                  Kunal Rachhoya
                </a>
              </h3>
              <div className="text-center"><small>CTO</small></div>
              <div style={introStyle}>
                Worked at Myntra, InfoEdge. Studied at IIT Kharagpur. Kunal wants to work on making technology more open and accessible. He has learnt more about laws in 3 months than he wanted to in a lifetime.
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12}>
              <Image
                style={imageStyle}
                src="http://nyaaya.in/assets/images/staticpages_images/nidhishaphilip.jpg"
                responsive
                circle
              />
              <br />
              <h3 style={nameStyle} className="text-center">
                <a
                  style={linkStyle}
                  target="_blank"
                  href="https://in.linkedin.com/in/nidhisha-philip-98678719"
                >
                  Nidhisha Philip
                </a>
              </h3>
              <div className="text-center"><small>Content Lead</small></div>
              <div style={introStyle}>
                Worked at S&R Associates. Studied at NLSIU. Nidhisha is interested in learning how technology can be used to better access to legal systems and open the path for inclusive citizen participation.
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Image
                style={imageStyle}
                src="http://nyaaya.in/assets/images/staticpages_images/sumeyshsrivastava.jpg"
                responsive
                circle
              />
              <br />
              <h3 style={nameStyle} className="text-center">
                <a
                  style={linkStyle}
                  target="_blank"
                  href="https://in.linkedin.com/in/sumeysh-srivastava-749467126"
                >
                  Sumeysh Srivastava
                </a>
              </h3>
              <div className="text-center"><small>Outreach Lead</small></div>
              <div style={introStyle}>
                Worked at Centre for Social Justice. Studied at Symbiosis. Sumeysh identifies himself as a social justice lawyer and believes that making laws easier to understand acts as a game-changer in helping people understand their legal rights and duties.
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Image
                style={imageStyle}
                src="http://nyaaya.in/assets/images/staticpages_images/ashishtandi.jpg"
                responsive
                circle
              />
              <br />
              <h3 style={nameStyle} className="text-center">
                <a
                  style={linkStyle}
                  target="_blank"
                  href="https://in.linkedin.com/in/ashishblessing"
                >
                  Ashish Tandi
                </a>
              </h3>
              <div className="text-center">
                <small>Software Engineer</small>
              </div>
              <div style={introStyle}>
                Worked at NCETIS. Studied at IIT Bombay. Ashish is a promoter of the Semantic Web and Open Data Technologies. He wants to make legal data more accessible through the adoption of Semantic Web standards.
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AboutUs;
