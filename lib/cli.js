#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinksCli = void 0;

const mdLink = require('./mdlinks.js'); // Grab provided args.
// const [, , ...args] = process.argv;


const args = process.argv.slice(2); // console.log(`Hello Worl ${args}`);

const mdLinksCli = (route, option1, option2) => mdLink.mdLinks(route, {
  validate: true
}).then(response => {
  let output = '';

  if (option1 === '--stats' && option2 === '--validate') {
    output = mdLink.statsAndValidate(response);
  } else if (option1 === '--stats') {
    output = mdLink.statsOfLinks(response);
  } else if (option1 === '--validate') {
    output = mdLink.funcionValidate(response);
  } else {
    console.log('error');
  }

  return output;
});

exports.mdLinksCli = mdLinksCli;
mdLinksCli(args[0], args[1], args[2]).then(res => console.log(res));