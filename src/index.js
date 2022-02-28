#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const fs = require('fs');
const { app } = require('./app');

// Read command line argumetns
const optionDefinitions = [
  { name: 'src', type: String, alias: 's' },
  { name: 'out', type: String, alias: 'o' },
  { name: 'ascii', type: String, alias: 'a' },
  { name: 'help', type: Boolean, alias: 'h' },

];

const options = commandLineArgs(optionDefinitions);

// validate arguments
const valid = options.help
  || (
    options.src && fs.existsSync(options.src)
  );

if (!valid) {
  console.log('Invalid usage: be sure to include --src option');
  process.exit();
}

app(options);

/*

** TODO **
- error if no src is given
- save output at the given file path
- print output to the console
- take optional string argument 'ascii'
- invert, will invert the image ascii

*/
