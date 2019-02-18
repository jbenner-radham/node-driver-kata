#!/usr/bin/env node

'use strict';

const fs = require('fs');

const filepath = require.resolve('../example/input.txt');
const file = fs.readFileSync(filepath).toString();
const newlineRegex = /\r?\n/;
const trim = str => str.trim();
const isNotEmptyStr = str => str !== '';
const data = file.split(newlineRegex).map(trim).filter(isNotEmptyStr);

console.log(data);
