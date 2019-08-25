#!/usr/bin/env node
const { argv } = require('yargs');

require('../lib/index')(argv._[0]);
