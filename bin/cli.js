#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const app = require('../lib');

const cwd = process.cwd();
const [, script] = process.argv;
const node = process.platform.startsWith('win') ? 'node' : '';
const bin = `${node} ${path.relative(cwd, script)}`.trim();

const cli = meow(`
    Usage
        $ ${bin} <input file>

    Options
        --help, -h       Display this message.
        --version, -v    Display the application version.
`, {
    flags: {
        help: { alias: 'h' },
        version: { alias: 'v' }
    }
});

if (!cli.input.length) {
    cli.showHelp();
}

const [inputFile] = cli.input;
const filepath = path.resolve(cwd, inputFile);
const input = fs.readFileSync(filepath).toString();
const report = app(input);

console.log(report);
