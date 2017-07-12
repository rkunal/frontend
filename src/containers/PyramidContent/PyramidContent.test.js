import React from "react";
import ReactDOM from "react-dom";
import PyramidContent from "./PyramidContent";
import { senior_citizens, marriage_issues } from "./fixtures";
import { renderPublishedDate } from "./PyramidContent";
import { shallow, mount, render } from "enzyme";
const assert = require("assert");

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
        pathname:
          "/law-explainers/special-law-on-maintenance-for-senior-citizens/"
      }}
    />,
    div
  );
});

it("renders without crashing while picking from serverSharedData", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <PyramidContent
      lang="en"
      apiRoot=""
      apiRootUrl=""
      serverSharedData={marriage_issues}
      isMobile={false}
      location={{
        pathname: "/guide-to-marriage-divorce-and-maintenance/"
      }}
    />,
    div
  );
});

it("Published Date is rendered correctly", () => {
  const wrapper = render(
    <div>
      {" "}{renderPublishedDate("2017-06-13T12:49:57.870530Z")}
    </div>
  );
  assert.equal(wrapper.find("p").text(), "Published on: Jun 13, 2017");
});
