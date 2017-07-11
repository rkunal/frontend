import React, { Component } from "react";
import { Link } from "react-router";
import ToggleNavEntry from "../ToggleNavEntry/ToggleNavEntry";

export default class SideNavigation extends Component {
  constructor(props) {
    super(props);
    let mainnavopen = true;
    if (typeof props.tableOfContent !== "undefined") {
      mainnavopen = false;
    }
    this.state = {
      tocs: [],
      mainnavopen: mainnavopen
    };
  }

  render() {
    return (
      <nav role="navigation">
        {this.props.isMobile
          ? <nav role="navigation">
              <ul style={{ backgroundColor: "#3E5C19" }} className="main-nav">
                <li>
                  <ToggleNavEntry
                    open={this.state.mainnavopen}
                    title="Nyaaya"
                    titleStyle={{
                      fontSize: "19px",
                      lineHeight: "24px"
                    }}
                    style={{
                      padding: "14px 10px",
                      borderBottom: "#437414 2px solid",
                      lineHeight: "32px",
                      fontSize: "1.5rem",
                      fontFamily: "Fira Sans"
                    }}
                  >
                    <ul style={{ paddingTop: "12px" }}>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/law-explainers/">Law Explainers</Link>
                      </li>
                      <li>
                        <Link to="/guides/">Guides</Link>
                      </li>
                      <li>
                        <Link to="/traffic-fine/">Traffic Fine App</Link>
                      </li>
                      <li>
                        <Link to="/catalogue/category/">Catalogue</Link>
                      </li>
                      <li>
                        <ToggleNavEntry
                          open={false}
                          title="About Us"
                          style={{
                            padding: "10px",
                            borderBottom: "#437414 2px solid",
                            color: "#D3EA75",
                            lineHeight: "32px",
                            fontSize: "1.5rem",
                            fontFamily: "Fira Sans"
                          }}
                        >
                          <ul style={{ paddingTop: "12px" }}>
                            <li>
                              <Link to="/mission/">Mission</Link>
                            </li>
                            <li>
                              <Link to="/aboutus/">Team</Link>
                            </li>
                            <li>
                              <Link to="/contributors/">Contributors</Link>
                            </li>
                          </ul>
                        </ToggleNavEntry>
                      </li>
                    </ul>
                  </ToggleNavEntry>
                </li>
              </ul>
            </nav>
          : null}
        {this.props.tableOfContent ? this.props.tableOfContent : null}
      </nav>
    );
  }
}
