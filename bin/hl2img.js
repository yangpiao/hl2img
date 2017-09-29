#!/usr/bin/env node

const path = require('path');

const STYLE = '--style=';
const OUTPUT = '--output=';
const OUTPUT_SHORT = '-o';
const WIDTH = '--width=';
const DEBUG = '--debug';

const options = {
  input: process.argv[2]
};

process.argv.slice(3).forEach((arg, i, args) => {
  if (arg.startsWith(STYLE)) {
    options.style = arg.substring(STYLE.length);
  } else if (arg.startsWith(OUTPUT)) {
    options.output = arg.substring(OUTPUT.length);
  } else if (arg === OUTPUT_SHORT) {
    options.output = args[i + 1];
  } else if (arg.startsWith(WIDTH)) {
    options.width = Number(arg.substring(WIDTH.length));
  } else if (arg === DEBUG) {
    options.debug = true;
  }
});

require('../lib/run')(options);
