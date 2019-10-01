import { markdownLinks, isroute } from './path.js';
import { validateLinks } from './file.js';

// const path = require('path');
export const mdLinks = (mypath, options) => new Promise((resolve, reject) => {
  if (isroute(mypath)) {
    if (options && options.validate) {
      resolve(validateLinks(mypath));
    } else {
      resolve(markdownLinks(mypath));
    }
  } else {
    reject(new Error('fail'));
  }
});
// console.log(path.join(process.cwd(), 'test/pruebas/prueba.md'));

// mdLinks(path.join(process.cwd(), 'test/pruebas/prueba/.md'), { validate: true })
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// Option(--stats)
export const statsOfLinks = (arrayLinks) => {
  const elementosArray = arrayLinks.map((element) => element.href);
  // eslint-disable-next-line max-len
  const noRepetidos = elementosArray.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const stats = `Total:${elementosArray.length} \nUnique: ${noRepetidos.length}`;
  return stats;
};

// Option(--validate)
export const funcionValidate = (arrayLinks) => {
  const elementosArray = arrayLinks.map((element) => `${element.file} ${element.href} ${element.statusText}${element.status} ${element.text}`);
  return elementosArray.join('\n');
};

// Option  (--stats) & (--validate)
export const statsAndValidate = (arrayLinks) => {
  const elementosLinks = arrayLinks.map((element) => element.href);
  // eslint-disable-next-line max-len
  const linksUnique = elementosLinks.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const elementosBroken = arrayLinks.filter((valor) => valor.statusText === 'Fail');
  const statsValidate = `Total:${elementosLinks.length} \nUnique: ${linksUnique.length} \nBroken: ${elementosBroken.length}`;
  return statsValidate;
};
