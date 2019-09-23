"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLinks = exports.markdownLinks = exports.readFilesSync = exports.readDirectory = exports.fileMd = exports.validateFile = exports.convertRoute = void 0;

const path = require('path');

const fs = require('fs');

const marked = require('marked');

const fetch = require('node-fetch');

const convertRoute = route => {
  const absolutePath = path.isAbsolute(route);

  if (!absolutePath) {
    return path.resolve(route);
  }

  return route;
}; // eslint-disable-next-line max-len
// console.log(convertRoute(path.join(process.cwd(), 'test/pruebas/prueba.md')));
// Existe archivo


exports.convertRoute = convertRoute;

const validateFile = route => fs.statSync(route).isFile(); // eslint-disable-next-line max-len
// console.log(validateFile(path.join(process.cwd(), 'test/pruebas/prueba.md')));
// Es un archivo .md


exports.validateFile = validateFile;

const fileMd = route => {
  const extName = path.extname(route).toLowerCase() === '.md';
  return extName;
}; // eslint-disable-next-line max-len
// console.log(fileMd(path.join(process.cwd(), 'test/pruebas/prueba.md')));
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
}; // console.log(readDirectory(path.join(process.cwd(), 'test/pruebas/prueba.md')));
// Lee el contenido de  archivo .md


exports.readDirectory = readDirectory;

const readFilesSync = route => fs.readFileSync(route, 'utf8'); // eslint-disable-next-line max-len
// console.log(readFilesSync(path.join(process.cwd(), 'test/pruebas/prueba.md')));
// Leer y recorrer los links de archivos .md


exports.readFilesSync = readFilesSync;

const markdownLinks = route => {
  const links = [];
  const arrayArchivos = readDirectory(route);
  arrayArchivos.forEach(element => {
    const readFile = readFilesSync(element);
    const render = new marked.Renderer();

    render.link = (href, title, text) => {
      links.push({
        href,
        path: element,
        text
      });
    };

    marked(readFile, {
      renderer: render
    });
  });
  return links;
}; // console.log(markdownLinks(path.join(process.cwd(), 'test/pruebas/prueba.md')));
// Obteniendo el estado de los links (válido o no)


exports.markdownLinks = markdownLinks;

const validateLinks = route => {
  const arrayObj = markdownLinks(route);
  const urlMd = arrayObj.map(element => new Promise(resolve => fetch(element.href).then(res => {
    const result = { ...element
    }; // Object.assign({}, element)

    if (res.status > 199 && res.status < 400) {
      result.status = res.status;
      result.statusText = res.statusText;
      resolve(result);
    } else {
      result.status = res.status;
      result.statusText = res.statusText;
      resolve(result);
    }
  })));
  return Promise.all(urlMd);
};

exports.validateLinks = validateLinks;
console.log(validateLinks(path.join(process.cwd(), 'test/pruebas/prueba.md')).then(res => {
  console.log(res);
}));