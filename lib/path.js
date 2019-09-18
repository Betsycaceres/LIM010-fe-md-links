"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFilesSync = exports.readDirectory = exports.fileMd = exports.validateFile = exports.convertRoute = void 0;

/* eslint-disable eol-last */
const path = require('path');

const fs = require('fs');

const convertRoute = route => {
  const absolutePath = path.isAbsolute(route);

  if (!absolutePath) {
    return path.resolve(route);
  }

  return route;
};

exports.convertRoute = convertRoute;
console.log(convertRoute('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md')); // Existe archivo

const validateFile = route => fs.statSync(route).isFile();

exports.validateFile = validateFile;
console.log(validateFile('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md')); // Es un archivo .md

const fileMd = route => {
  const extName = path.extname(route).toLowerCase() === '.md';
  return extName;
};

exports.fileMd = fileMd;
console.log(fileMd('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md')); // Leer los archivos de una carpeta

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
};

exports.readDirectory = readDirectory;
console.log(readDirectory('./test/pruebas')); // Lee archivo .md

const readFilesSync = route => fs.readFileSync(route, 'utf8'); // eslint-disable-next-line max-len


exports.readFilesSync = readFilesSync;
console.log(readFilesSync('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));