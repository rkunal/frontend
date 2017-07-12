import React from "react";
import ReactDOM from "react-dom";
import Laws from "./Laws";
import { laws } from "./fixtures";

it("renders without crashing while picking from serverSharedData", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Laws
      apiRootUrl=""
      serverSharedData={laws}
      location={{
        pathname: "/law/1411/the-shree-sai-baba-sansthan-trust-shirdi-act-2004/"
      }}
    />,
    div
  );
});
