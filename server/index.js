import path from "path";
import fs from "fs";
import { Server } from "http";
import Express from "express";
import cookieParser from "cookie-parser";
import ua from "universal-analytics";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { match, RouterContext } from "react-router";
import appRoutes from "./appRoutes";
const util = require("util");

const app = new Express();

app.use(
  "/static",
  Express.static(path.resolve(__dirname, "..", "build", "static"))
);

require("es6-promise").polyfill();
require("isomorphic-fetch");

app.use(cookieParser());
app.use(ua.middleware("UA-86500535-1", { cookieName: "_ga" }));
app.use("/", appRoutes);

const server = new Server(app);

const port = process.env.PORT || 9000;
const env = process.env.NODE_ENV || "development";
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
