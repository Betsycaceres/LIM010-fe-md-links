"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markdownLinks = exports.readFilesSync = exports.readDirectory = exports.fileMd = exports.validateFile = exports.convertRoute = exports.isroute = void 0;

// path (Módulo que proporciona utilidades para trabajar con rutas de archivos y directorios.
// fs (Módulo que proporciona una API para interactuar con el sistema de archivos)
const path = require('path');

const fs = require('fs');

const marked = require('marked'); // permite analizar Markdown en HTML
// Validar si la ruta existe--retorna true o false


const isroute = route => fs.existsSync(route); // console.log(isroute(path.join(process.cwd(), 'test/pruebas/prueba.md')));
// Validar si la ruta es absoluta o Relativa y convertir


exports.isroute = isroute;

const convertRoute = route => {
  const absolutePath = path.isAbsolute(route);

  if (!absolutePath) {
    return path.resolve(route);
  }

  return route;
}; // Existe archivo
// Validar si es archivo --retorna true o false
// fs.stat objeto que proporciona información de un archivo


exports.convertRoute = convertRoute;

const validateFile = route => fs.statSync(route).isFile(); // Es un archivo .md


exports.validateFile = validateFile;

const fileMd = route => {
  const extName = path.extname(route).toLowerCase() === '.md';
  return extName;
}; // console.log(fileMd(path.join(process.cwd(), 'test/pruebas/prueba.md')));
// Retornar un array de los archivos md
// fs.readdirSync lee el contenido de un directorio - síncrono


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
}; // Lee el contenido de  archivo .md


exports.readDirectory = readDirectory;

const readFilesSync = route => fs.readFileSync(route, 'utf8'); // Lee los archivos y extrae links, el texto y ruta del archivo en un array


exports.readFilesSync = readFilesSync;

const markdownLinks = route => {
  const links = [];
  const arrayArchivos = readDirectory(route);
  arrayArchivos.forEach(elemento => {
    // forEach que recorrera el array de as rutas de archivos .md
    const readFile = readFilesSync(elemento); // almacenar en una constante  la funcionde leer el archivo

    const render = new marked.Renderer(); // buscar los link del archivo y solicitar los argumentos

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