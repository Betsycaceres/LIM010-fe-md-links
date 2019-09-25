"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLink = exports.statsOfLinks = exports.mdLinks = void 0;

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
}); // // eslint-disable-next-line max-len
// mdLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'), { validate: false }).then((response) => {
//   console.log(response);
// });
// Option(--stats)


exports.mdLinks = mdLinks;

const statsOfLinks = arrayLinks => {
  const elementosArray = arrayLinks.map(element => element.href);
  const noRepetidos = elementosArray.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const stats = `Total:${elementosArray.length} Unique: ${noRepetidos.length}`;
  return stats;
}; // console.log(statsOfLinks(markdownLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'))));
// Option(--validate)


exports.statsOfLinks = statsOfLinks;

const validateLink = arrayLinks => {
  const elementosArray = arrayLinks.map(element => element.href);
  const noRepetidos = elementosArray.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const broken = elementosArray.filter((statusText, indiceActual, arreglo) => arreglo.statusText === 'Fail');
  const stats = `Total:${elementosArray.length} Unique: ${noRepetidos.length} Broken: ${broken.length}`;
  return stats;
};

exports.validateLink = validateLink;
console.log(validateLink((0, _path.markdownLinks)(path.join(process.cwd(), 'test/pruebas/prueba.md'))));