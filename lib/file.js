"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLinks = void 0;

var _path = require("./path.js");

const fetch = require('node-fetch'); // Obteniendo el estado de los links (válido o no)


const validateLinks = route => {
  const arrayObj = (0, _path.markdownLinks)(route);
  const urlMd = arrayObj.map(element => new Promise(resolve => fetch(element.href).then(res => {
    const result = { ...element
    }; // Object.assign({}, element)

    if (res.status > 199 && res.status < 400) {
      result.status = res.status;
      result.statusText = res.statusText;
      resolve(result);
    } else {
      result.status = res.status;
      result.statusText = 'Fail';
      resolve(result);
    }
  })));
  return Promise.all(urlMd);
}; // validateLinks('./test/pruebas/prueba.md')
//   .then(respuestas => {
//     console.log(respuestas)
//   })


exports.validateLinks = validateLinks;