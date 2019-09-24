import { markdownLinks } from './path.js';

const fetch = require('node-fetch');

// Obteniendo el estado de los links (válido o no)
export const validateLinks = (route) => {
  const arrayObj = markdownLinks(route);
  const urlMd = arrayObj.map((element) => new Promise((resolve) => fetch(element.href)
    .then((res) => {
      const result = { ...element }; // Object.assign({}, element)
      if (res.status > 199 && res.status < 400) {
        result.status = res.status;
        result.statusText = res.statusText;
        resolve(result);
      } else {
        result.status = res.status;
        result.statusText = 'Fail';
        resolve(result);
      }
    })
    .catch((error) => {
      const result = { ...element };
      result.status = error.message;
      result.statusText = 'Ésta ruta no existe';
      resolve(result);
    })));
  return Promise.all(urlMd);
};

// validateLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'))
//   .then((res) => {
//     console.log(res);
//   });
