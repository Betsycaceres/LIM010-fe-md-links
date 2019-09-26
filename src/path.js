const path = require('path');
const fs = require('fs');
const marked = require('marked');

export const convertRoute = (route) => {
  const absolutePath = path.isAbsolute(route);
  if (!absolutePath) {
    return path.resolve(route);
  }
  return route;
};

// Existe archivo
export const validateFile = (route) => fs.statSync((route)).isFile();

// Es un archivo .md
export const fileMd = (route) => {
  const extName = path.extname(route).toLowerCase() === '.md';
  return extName;
};

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


// Lee el contenido de  archivo .md
export const readFilesSync = (route) => fs.readFileSync(route, 'utf8');

// Leer y recorrer los links de archivos .md
export const markdownLinks = (route) => {
  const links = [];
  const arrayArchivos = readDirectory(route);
  arrayArchivos.forEach((elemento) => {
    const readFile = readFilesSync(elemento);
    const render = new marked.Renderer();
    render.link = (href, title, text) => {
      links.push({
        href,
        file: elemento,
        text,
      });
    };
    marked(readFile, { renderer: render });
  });
  return links;
};
