"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _path = require("./path.js");

var _file = require("./file.js");

const path = require('path');

const mdLinks = (mypath, options) => new Promise(resolve => {
  const routeFile = (0, _path.convertRoute)(mypath);

  if (options.validate === true) {
    resolve((0, _file.validateLinks)(routeFile));
  } else {
    resolve((0, _path.markdownLinks)(routeFile));
  }
});

exports.mdLinks = mdLinks;