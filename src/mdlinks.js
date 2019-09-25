import { convertRoute, markdownLinks } from './path.js';
import { validateLinks } from './file.js';

const path = require('path');

export const mdLinks = (mypath, options) => new Promise((resolve) => {
	const routeFile = convertRoute(mypath);
	if (options.validate === true) {
		resolve(validateLinks(routeFile));
	} else {
		resolve(markdownLinks(routeFile));
	}
});

// // eslint-disable-next-line max-len
mdLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'), { validate: false }).then((response) => {
  console.log(response);
});

// Option(--stats)
export const statsOfLinks = (arrayLinks) => {
	const elementosArray = arrayLinks.map((element) => element.href);
	const noRepetidos = elementosArray.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
	const stats = `Total:${elementosArray.length} Unique: ${noRepetidos.length}`;
	return stats;
};

// console.log(statsOfLinks(markdownLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'))));

// Option(--validate)

export const validateLink = (arrayLinks) => {
	const elementosArray = arrayLinks.map((element) => element.href);
	const noRepetidos = elementosArray.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
	const broken = elementosArray.filter((statusText, indiceActual, arreglo) => arreglo.statusText === 'Fail');
	const stats = `Total:${elementosArray.length} Unique: ${noRepetidos.length} Broken: ${broken.length}`;
	return stats;
};
console.log(validateLink(markdownLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'))));
