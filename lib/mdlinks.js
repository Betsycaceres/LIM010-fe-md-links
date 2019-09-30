"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statsAndValidate = exports.funcionValidate = exports.statsOfLinks = exports.mdLinks = void 0;

var _path = require("./path.js");

var _file = require("./file.js");

// const path = require('path');
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
// Option(--stats)


exports.mdLinks = mdLinks;

const statsOfLinks = arrayLinks => {
  const elementosArray = arrayLinks.map(element => element.href); // eslint-disable-next-line max-len

  const noRepetidos = elementosArray.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const stats = `Total:${elementosArray.length} Unique: ${noRepetidos.length}`;
  return stats;
}; // Option(--validate)


exports.statsOfLinks = statsOfLinks;

const funcionValidate = arrayLinks => {
  const elementosArray = arrayLinks.map(element => `${element.file} ${element.href} ${element.statusText}${element.status} ${element.text}`);
  return elementosArray.join('\n');
}; // Option  (--stats) & (--validate)


exports.funcionValidate = funcionValidate;

const statsAndValidate = arrayLinks => {
  const elementosLinks = arrayLinks.map(element => element.href); // eslint-disable-next-line max-len

  const linksUnique = elementosLinks.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const elementosBroken = arrayLinks.filter(valor => valor.statusText === 'Fail');
  const statsValidate = `Total:${elementosLinks.length} \nUnique: ${linksUnique.length} \nBroken: ${elementosBroken.length}`;
  return statsValidate;
};

exports.statsAndValidate = statsAndValidate;