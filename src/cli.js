#!/usr/bin/env node
import { mdLinksCli } from './mlinkscli';

const args = process.argv.slice(2);
// console.log(process.argv)
// console.log(`Hello Worl ${args}`);

mdLinksCli(args[0], args[1], args[2])
  .then((res) => console.log(res))
  .catch((error) => console.log(error.message));
// console.log(args[1]);
