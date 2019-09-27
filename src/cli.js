import {
  mdLinks, statsAndValidate, statsOfLinks, funcionValidate,
} from './mdlinks';
// Grab provided args.
// const [, , ...args] = process.argv;

const args = process.argv.slice(2);
// console.log(`Hello Worl ${args}`);


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

mdLinksCli(args[0], args[1], args[2])
  .then((res) => console.log(res))
  .catch((error) => console.log(error.message));
