import React from "react";
import ReactDOM from "react-dom";
import PyramidContent from "./PyramidContent";
import { senior_citizens } from "./fixtures";

it("renders without crashing while picking from serverSharedData", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <PyramidContent
      lang="en"
      apiRoot=""
      apiRootUrl=""
      serverSharedData={senior_citizens}
      isMobile={false}
      location={{
        pathname: "/law-explainers/special-law-on-maintenance-for-senior-citizens/"
      }}
    />,
    div
  );
});
