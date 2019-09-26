"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statsAndValidate = exports.funcionValidate = exports.statsOfLinks = exports.mdLinks = void 0;

var _path = require("./path.js");

var _file = require("./file.js");

// const path = require('path');
// const outputprueba = [{
//   href: 'https://www.laboratoria.la',
//   file:
//     'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md',
//   text: 'laboratoria',
//   status: 200,
//   statusText: 'OK',
// },
// {
//   href: 'https://www.google.com/gr',
//   file:
//     'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md',
//   text: 'google',
//   status: 404,
//   statusText: 'Fail',
// },
// ];
const mdLinks = (mypath, options) => new Promise(resolve => {
  if (options && options.validate) {
    resolve((0, _file.validateLinks)(mypath));
  } else {
    resolve((0, _path.markdownLinks)(mypath));
  }
}); // // eslint-disable-next-line max-len
// eslint-disable-next-line max-len
//  mdLinks(path.join(process.cwd(), 'test/pruebas/prueba.md')).then((response) => {
//   console.log(response);
// });
// Option(--stats)


exports.mdLinks = mdLinks;

const statsOfLinks = arrayLinks => {
  const elementosArray = arrayLinks.map(element => element.href); // eslint-disable-next-line max-len

  const noRepetidos = elementosArray.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const stats = `Total:${elementosArray.length} Unique: ${noRepetidos.length}`;
  return stats;
}; // console.log(statsOfLinks(markdownLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'))));
// Option(--validate)


exports.statsOfLinks = statsOfLinks;

const funcionValidate = arrayLinks => {
  const elementosArray = arrayLinks.map(element => `${element.file} ${element.href} ${element.statusText}${element.status} ${element.text}`);
  return elementosArray;
}; // console.log(funcionValidate(outputprueba));
// Option  (--stats) & (--validate)


exports.funcionValidate = funcionValidate;

const statsAndValidate = arrayLinks => {
  const elementosLinks = arrayLinks.map(element => element.href); // eslint-disable-next-line max-len

  const linksUnique = elementosLinks.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const elementosBroken = arrayLinks.filter(valor => valor.statusText === 'Fail');
  const statsValidate = `Total:${elementosLinks.length} Unique: ${linksUnique.length} Broken: ${elementosBroken.length}`;
  return statsValidate;
}; // console.log(statsAndValidate(outputprueba));
// console.log(statsAndValidate(markdownLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'))));


exports.statsAndValidate = statsAndValidate;