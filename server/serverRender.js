import path from "path";
import fs from "fs";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { match, RouterContext } from "react-router";
import routes from "./serverRoutes";
import DataProvider from "./dataProvider";
import ga from "./ga";

module.exports = function serverRender(req, res, next) {
  if (res.locals.fetcherr) {
    return res.status(500).end();
  }

  const filePath = path.resolve(__dirname, "..", "build", "index.html");
  fs.readFile(filePath, "utf8", (err, htmlData) => {
    htmlData = htmlData.replace('{% include "./seo_tags.html" %}', "");
    if (err) {
      console.error("read err", err);
      return res.status(404).end();
    }
    match(
      { routes: routes, location: req.url },
      (error, redirectLocation, renderProps) => {
        if (error) {
          return res.status(500).send(error.message);
        }
        if (redirectLocation) {
          return res.redirect(
            302,
            redirectLocation.pathname + redirectLocation.search
          );
        }
        let markup;
        if (renderProps) {
          ga.pageview("Track Page");
          markup = renderToStaticMarkup(
            <DataProvider {...renderProps} ssrData={res.locals.ssrData} />
          );
        } else {
          markup = renderToStaticMarkup(<div>Not Found</div>);
          res.status(404);
        }
        const RenderedApp = htmlData.replace(
          /\bbody\>[\s\S]*\/body\b/g,
          "body>" + markup + "</body"
        );
        res.send(RenderedApp);
      }
    );
  });
};
