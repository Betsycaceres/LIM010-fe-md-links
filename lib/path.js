"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markdownLinks = exports.readFilesSync = exports.readDirectory = exports.fileMd = exports.validateFile = exports.convertRoute = exports.isroute = void 0;

const path = require('path');

const fs = require('fs');

const marked = require('marked'); // Si existe la ruta.


const isroute = route => fs.existsSync(route); // console.log(isroute(path.join(process.cwd(), 'test/pruebas/prueba.md')));


exports.isroute = isroute;

const convertRoute = route => {
  const absolutePath = path.isAbsolute(route);

  if (!absolutePath) {
    return path.resolve(route);
  }

  return route;
}; // Existe archivo


exports.convertRoute = convertRoute;

const validateFile = route => fs.statSync(route).isFile(); // Es un archivo .md


exports.validateFile = validateFile;

const fileMd = route => {
  const extName = path.extname(route).toLowerCase() === '.md';
  return extName;
};

exports.fileMd = fileMd;
console.log(fileMd(path.join(process.cwd(), 'test/pruebas/prueb.m'))); // Leer los archivos de una carpeta

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
}; // Lee el contenido de  archivo .md


exports.readDirectory = readDirectory;

const readFilesSync = route => fs.readFileSync(route, 'utf8'); // Leer y recorrer los links de archivos .md


exports.readFilesSync = readFilesSync;

const markdownLinks = route => {
  const links = [];
  const arrayArchivos = readDirectory(route);
  arrayArchivos.forEach(elemento => {
    const readFile = readFilesSync(elemento);
    const render = new marked.Renderer();

    render.link = (href, title, text) => {
      links.push({
        href,
        file: elemento,
        text
      });
    };

    marked(readFile, {
      renderer: render
    });
  });
  return links;
};

exports.markdownLinks = markdownLinks;