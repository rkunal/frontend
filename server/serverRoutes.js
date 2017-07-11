import React from "react";
import { Router, Route, IndexRoute } from "react-router";

import BaseLayout from "../src/components/Layouts/BaseLayout";

import Home from "../src/containers/Home/Home";
import AboutUs from "../src/containers/AboutUs/AboutUs";
import Catalogue from "../src/containers/Catalogue/Catalogue";
import Explainers from "../src/containers/Explainers/Explainers";
import Guides from "../src/containers/Guides/Guides";

import Intro from "../src/containers/Explainers/Intro";
import PyramidContent from "../src/containers/PyramidContent/PyramidContent";

import TrafficFine from "../src/containers/TrafficFine/TrafficFine";
import Search from "../src/containers/Search/Search";

export default (
  <Router>
    <Route path="/" component={BaseLayout}>
      <IndexRoute component={Home} />
      <Route path="guides/" component={Guides} />
      <Route path="aboutus/" component={AboutUs} />

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

      <Route path="traffic-fine/" component={TrafficFine} />
      <Route path="traffic-fine/:slug/" component={TrafficFine} />

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
