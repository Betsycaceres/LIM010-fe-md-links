/* eslint-disable eol-last */
const path = require('path');
const fs = require('fs');

export const convertRoute = (route) => {
  const absolutePath = path.isAbsolute(route);
  if (!absolutePath) {
    return path.resolve(route);
  }
  return route;
};
console.log(convertRoute('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));

// Existe archivo
export const validateFile = (route) => fs.statSync((route)).isFile();

console.log(validateFile('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));

// Es un archivo .md
export const fileMd = (route) => {
  const extName = path.extname(route).toLowerCase() === '.md';
  return extName;
};
console.log(fileMd('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));


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
console.log(readDirectory('./test/pruebas'));

// Lee archivo .md
export const readFilesSync = (route) => fs.readFileSync(route, 'utf8');

// eslint-disable-next-line max-len
console.log(readFilesSync('C:/Users/ERIK/Desktop/LABORATORIA/LIM010-fe-md-links/test/pruebas/prueba.md'));
