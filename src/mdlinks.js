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


