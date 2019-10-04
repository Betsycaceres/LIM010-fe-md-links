
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
