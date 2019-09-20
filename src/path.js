/* eslint-disable eol-last */
const path = require('path');
const fs = require('fs');
const marked = require('marked');
// const fetch = require('node-fetch');

// console.log(marked('#hello world of mark down!'));

export const convertRoute = (route) => {
  const absolutePath = path.isAbsolute(route);
  if (!absolutePath) {
    return path.resolve(route);
  }
  return route;
};
// eslint-disable-next-line max-len
// console.log(convertRoute(path.join(process.cwd(), 'test/pruebas/prueba.md')));

// Existe archivo
export const validateFile = (route) => fs.statSync((route)).isFile();

// eslint-disable-next-line max-len
// console.log(validateFile(path.join(process.cwd(), 'test/pruebas/prueba.md')));

// Es un archivo .md
export const fileMd = (route) => {
  const extName = path.extname(route).toLowerCase() === '.md';
  return extName;
};
// eslint-disable-next-line max-len
// console.log(fileMd(path.join(process.cwd(), 'test/pruebas/prueba.md')));


// Leer los archivos de una carpeta
export const readDirectory = (route) => {
  let directory = [];
  const routeFile = convertRoute(route);
  if (validateFile(routeFile)) {
    if (fileMd(routeFile)) {
      directory.push(routeFile);
    }
  } else {
    const folder = fs.readdirSync(routeFile);
    folder.forEach((element) => {
      const arrFolder = readDirectory(path.join((routeFile), element));
      directory = directory.concat(arrFolder);
    });
  }
  return directory;
};
// console.log(readDirectory(path.join(process.cwd(), 'test/pruebas/prueba.md')));

// Lee el contenido de  archivo .md
export const readFilesSync = (route) => fs.readFileSync(route, 'utf8');

// eslint-disable-next-line max-len
// console.log(readFilesSync(path.join(process.cwd(), 'test/pruebas/prueba.md')));


export const markdownLinks = (route) => {
  const links = [];
  const arrayArchivos = readDirectory(route);
  arrayArchivos.forEach((element) => {
    const readFile = readFilesSync(element);
    const render = new marked.Renderer();
    render.link = (href, title, text) => {
      links.push({
        href,
        path: element,
        text,
      });
    };
    marked(readFile, { renderer: render });
  });
  return links;
};
// console.log(markdownLinks(path.join(process.cwd(), 'test/pruebas/prueba.md')));
