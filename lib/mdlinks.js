"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _path = require("./path.js");

var _file = require("./file.js");

// const path = require('path');
const mdLinks = (mypath, options) => new Promise((resolve, reject) => {
  if ((0, _path.isroute)(mypath)) {
    if (options && options.validate) {
      resolve((0, _file.validateLinks)(mypath));
    } else {
      resolve((0, _path.markdownLinks)(mypath));
    }
  } else {
    reject(new Error('fail'));
  }
}); // console.log(path.join(process.cwd(), 'test/pruebas/prueba.md'));
// mdLinks(path.join(process.cwd(), 'test/pruebas/prueba/.md'), { validate: true })
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));


exports.mdLinks = mdLinks;