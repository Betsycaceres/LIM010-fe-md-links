
import { mdLinks } from './mdlinks.js';
import {
  statsOfLinks, funcionValidate, statsAndValidate,
} from './stat-validate.js';

// Grab provided args.
// const [, , ...args] = process.argv;

export const mdLinksCli = (route, option1, option2) => new Promise((resolve, reject) => {
  mdLinks(route, { validate: true })
    .then((response) => {
      if (option1 === '--stats' && option2 === '--validate') {
        resolve(statsAndValidate(response));
      } else if (option1 === '--stats' || option1 === '--s' || option1 === 's') {
        resolve(statsOfLinks(response));
      } else if (option1 === '--validate' || option1 === '--v' || option1 === 'v') {
        resolve(funcionValidate(response));
      } else {
        const stringLinks = response.map((element) => `${element.file} ${element.href} ${element.statusText}`);
        resolve(stringLinks.join('\n'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});
