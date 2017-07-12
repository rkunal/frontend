import React from "react";
import ReactDOM from "react-dom";
import Guides from "./Guides";

it("renders without crashing while picking from serverSharedData", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Guides
      apiRoot=""
      apiRootUrl=""
    />,
    div
  );
});
