import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";
import { home_page } from "./fixtures";

it("renders without crashing while picking from serverSharedData", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Home
      apiRoot=""
      apiRootUrl=""
      serverSharedData={home_page}
    />,
    div
  );
});
