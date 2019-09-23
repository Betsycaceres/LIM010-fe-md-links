"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLinks = exports.markdownLinks = exports.readFilesSync = exports.readDirectory = exports.fileMd = exports.validateFile = exports.convertRoute = void 0;

/* eslint-disable eol-last */
const path = require('path');

const fs = require('fs');

const marked = require('marked');

const fetch = require('node-fetch'); // console.log(marked('#hello world of mark down!'));


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
// Obteniendo el estado de los links


exports.markdownLinks = markdownLinks;

const validateLinks = array => {
  const urlMd = array.map(obj => {
    return fetch(obj.href).then(result => {
      if (result.status > 200 && result.status < 400) {
        obj.status = result.status;
        obj.statusText = result.statusText;
      } else {
        obj.ok = 'fail';
      }

      return obj;
    }); // .catch((error) => {
    //   obj.status = 'no existe link';
    //   obj.ok = 'fail';
    //   return obj;
    // });
  });
  return Promise.all(urlMd);
};

exports.validateLinks = validateLinks;
console.log(validateLinks.join(process.cwd(), 'test/pruebas/prueba.md')); // export const validateLinks = (array) => {
//   const urlMd = array.map((key) => {
//     return fetch(key.href)
//       .then((res) => {
//         if (res.status > 200 && res.status < 400) {
//           key.status = res.status;
//           key.statusText = res.statusText;
//         } else {
//           key.status = res.status;
//           key.statusText = res.statusText;
//           return key;
//         }
//       });
//   });
//   return Promise.all(urlMd);
// };