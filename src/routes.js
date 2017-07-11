import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { gaID } from "./config";
import BaseLayout from "./components/Layouts/BaseLayout";

import Home from "./containers/Home/Home";
import AboutUs from "./containers/AboutUs/AboutUs";
import Catalogue from "./containers/Catalogue/Catalogue";
import Explainers from "./containers/Explainers/Explainers";
import Intro from "./containers/Explainers/Intro";
import PyramidContent from "./containers/PyramidContent/PyramidContent";
import Laws from "./containers/Laws/Laws";
import TrafficFine from "./containers/TrafficFine/TrafficFine";
import Search from "./containers/Search/Search";
import Guides from "./containers/Guides/Guides";
import ContactUs from "./containers/ContactUs/ContactUs";

let ReactGA = require("react-ga");
ReactGA.initialize(gaID);

const LogPageView = () => {
  ReactGA.set({
    page: window.location.pathname +
      window.location.search +
      window.location.hash
  });
  ReactGA.pageview(window.location.pathname);
};

const Routes = props => (
  <Router onUpdate={LogPageView} {...props}>

    <Route path="/" component={BaseLayout}>
      <IndexRoute component={Home} />
      <Route path="guides/" component={Guides} />
      <Route path="aboutus/" component={AboutUs} />
      <Route path="write-to-us/" component={ContactUs} />
      <Route path="catalogue/category/" component={Catalogue} />
      <Route
        path="catalogue/category/:catalogue_id/:catalogue_slug/"
        component={Catalogue}
      />
      <Route
        path="catalogue/category/:catalogue_id/:catalogue_slug/jurisdiction/:jurisdiction_id/:jurisdiction_slug/"
        component={Catalogue}
      />
      <Route path="catalogue/jurisdiction/" component={Catalogue} />
      <Route
        path="catalogue/jurisdiction/:jurisdiction_id/:jurisdiction_slug/"
        component={Catalogue}
      />
      <Route
        path="catalogue/jurisdiction/:jurisdiction_id/:jurisdiction_slug/category/:catalogue_id/:catalogue_slug/"
        component={Catalogue}
      />

      <Route path="/law/:law_id/:law_slug/" component={Laws} />
      <Route path="/traffic-fine/" component={TrafficFine} />
      <Route path="/traffic-fine/:slug/" component={TrafficFine} />

      <Route path="search/" component={Search} />
      <Route path="search/:keyword/" component={Search} />

      <Route path="law-explainers/" component={Explainers} />
      <Route path=":lang/law-explainers/" component={Explainers} />
      <Route path="law-explainers/:webdoc_id/:slug/" component={Intro} />

      <Route path="hi/:app_slugs/*" component={PyramidContent} />
      <Route path=":app_slugs/*" component={PyramidContent} />
    </Route>

  </Router>
);

export default Routes;
