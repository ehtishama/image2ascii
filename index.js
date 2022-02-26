const commandLineArgs = require('command-line-args');

const { app } = require('./app');

// Read command line argumetns
const optionDefinitions = [
  { name: 'src', type: String, alias: 's' },
  { name: 'out', type: String, alias: 'o' },
];

const options = commandLineArgs(optionDefinitions);

if (!options.src || !options.out) process.exit('Usage: ');

app(options);
