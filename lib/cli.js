#!/usr/bin/env node
"use strict";

var _mlinkscli = require("./mlinkscli");

const args = process.argv.slice(2); // console.log(process.argv)
// console.log(`Hello Worl ${args}`);

(0, _mlinkscli.mdLinksCli)(args[0], args[1], args[2]).then(res => console.log(res)).catch(error => console.log(error.message)); // console.log(args[1]);