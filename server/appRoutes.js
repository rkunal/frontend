import Express from "express";
import serverRender from "./serverRender";
import api from "../src/api/api";
var router = Express.Router();

router.get(
  "/",
  function(req, res, next) {
    api
      .HomePage()
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

router.get(
  "/guides/",
  function(req, res, next) {
    api
      .GuidePage()
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

router.get(
  "/law/:id/:slug/",
  function(req, res, next) {
    api
      .LawPage(req.params.id)
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

router.get(
  "/law-explainers/",
  function(req, res, next) {
    api
      .LawExplainersPage()
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

router.get(
  "/:lang/law-explainers/",
  function(req, res, next) {
    api
      .LawExplainersPage(req.params.lang)
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

router.get(
  "/catalogue/*",
  function(req, res, next) {
    api
      .CataloguePage(req.url)
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

router.get(
  "/:lang/*",
  function(req, res, next) {
    let url = req.url;
    if (req.params.lang === "hi") {
      url = req.url.substr(3);
    }
    api
      .PyramidContent("/app" + url, req.params.lang)
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

module.exports = router;
