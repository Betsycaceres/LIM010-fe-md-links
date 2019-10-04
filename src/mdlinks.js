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
