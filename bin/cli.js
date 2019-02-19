#!/usr/bin/env node

'use strict';

const fs = require('fs');
const app = require('../lib');

const filepath = require.resolve('../example/input.txt');
const input = fs.readFileSync(filepath).toString();
const report = app(input);

console.log(`
Expected output:

Alex: 42 miles @ 34 mph
Bob: 0 miles
Dan: 39 miles @ 47 mph

Actual output:
`);

console.log(report);
