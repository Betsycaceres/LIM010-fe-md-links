"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readDirectory = exports.fileMd = exports.validateFile = exports.convertRoute = void 0;

/* eslint-disable eol-last */
const path = require('path');

const fs = require('fs');

const marked = require('marked');

console.log(marked('#hello world of mark down!'));

const convertRoute = route => {
  const absolutePath = path.isAbsolute(route);

  if (!absolutePath) {
    return path.resolve(route);
  }

  return route;
}; // eslint-disable-next-line max-len
// console.log(convertRoute('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));
// Existe archivo


exports.convertRoute = convertRoute;

const validateFile = route => fs.statSync(route).isFile(); // eslint-disable-next-line max-len
// console.log(validateFile('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));
// Es un archivo .md


exports.validateFile = validateFile;

const fileMd = route => {
  const extName = path.extname(route).toLowerCase() === '.md';
  return extName;
}; // eslint-disable-next-line max-len
// console.log(fileMd('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));
// Leer los archivos de una carpeta


exports.fileMd = fileMd;

const readDirectory = route => {
  let directory = [];
  const routeFile = convertRoute(route);

  if (validateFile(routeFile)) {
    if (fileMd(routeFile)) {
      directory.push(routeFile);
    }
  } else {
    const folder = fs.readdirSync(routeFile);
    folder.forEach(element => {
      const arrFolder = readDirectory(path.join(routeFile, element));
      directory = directory.concat(arrFolder);
    });
  }

  return directory;
}; // console.log(readDirectory('./test/pruebas'));
// Lee el contenido de  archivo .md
// export const readFilesSync = (route) => fs.readFileSync(route, 'utf8');
// eslint-disable-next-line max-len
// console.log(readFilesSync('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));


exports.readDirectory = readDirectory;