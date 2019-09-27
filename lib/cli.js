"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinksCli = void 0;

var _mdlinks = require("./mdlinks");

// Grab provided args.
// const [, , ...args] = process.argv;
const args = process.argv.slice(2); // console.log(`Hello Worl ${args}`);

const mdLinksCli = (route, option1, option2) => new Promise((resolve, reject) => {
  (0, _mdlinks.mdLinks)(route, {
    validate: true
  }).then(response => {
    if (option1 === '--stats' && option2 === '--validate') {
      resolve((0, _mdlinks.statsAndValidate)(response));
    } else if (option1 === '--stats' || option1 === '--s' || option1 === 's') {
      resolve((0, _mdlinks.statsOfLinks)(response));
    } else if (option1 === '--validate' || option1 === '--v' || option1 === 'v') {
      resolve((0, _mdlinks.funcionValidate)(response));
    } else {
      const stringLinks = response.map(element => `${element.file} ${element.href} ${element.statusText}`);
      resolve(stringLinks.join('\n'));
    }
  }).catch(error => {
    reject(error);
  });
});

exports.mdLinksCli = mdLinksCli;
mdLinksCli(args[0], args[1], args[2]).then(res => console.log(res)).catch(error => console.log(error.message));