import React from "react";
import ReactDOM from "react-dom";
import Explainers from "./Explainers";

it("renders without crashing while picking from serverSharedData", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Explainers
      lang="en"
      apiRoot=""
      apiRootUrl=""
    />,
    div
  );
});
