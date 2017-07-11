import React from "react";
import ReactDOM from "react-dom";
import { useScroll } from "react-router-scroll";
import { applyRouterMiddleware, browserHistory } from "react-router";
import Routes from "./routes";

ReactDOM.render(
  <Routes
    history={browserHistory}
    render={applyRouterMiddleware(useScroll())}
  />,
  document.getElementById("root")
);
