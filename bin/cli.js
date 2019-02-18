#!/usr/bin/env node

'use strict';

const fs = require('fs');
const Driver = require('../lib/Driver');
const Trip = require('../lib/Trip');

const filepath = require.resolve('../example/input.txt');
const file = fs.readFileSync(filepath).toString();
const newlineRegex = /\r?\n/;
const trim = str => str.trim();
const getName = obj => obj.name;
const isNotEmptyStr = str => str !== '';
const isNotNull = data => data !== null;
const unique = collection => Array.from(new Set(collection));

// Trip $NAME $START_TIME $STOP_TIME $MILES_DRIVEN

/*

Let's write some code to track driving history for people.

The code will process an input file. You can either choose to accept the input via stdin (e.g. if you're using Ruby
`cat input.txt | ruby yourcode.rb`), or as a file name given on the command line (e.g. `ruby yourcode.rb input.txt`).
You can use any programming language that you want. Please choose a language that allows you to best demonstrate your
programming ability.

Each line in the input file will start with a command. There are two possible commands.

The first command is Driver, which will register a new Driver in the app. Example:

`Driver Dan`

The second command is Trip, which will record a trip attributed to a driver. The line will be space delimited with the
following fields: the command (Trip), driver name, start time, stop time, miles driven. Times will be given in the
format of hours:minutes. We'll use a 24-hour clock and will assume that drivers never drive past midnight (the start
time will always be before the end time). Example:

`Trip Dan 07:15 07:45 17.3`

Discard any trips that average a speed of less than 5 mph or greater than 100 mph.

Generate a report containing each driver with total miles driven and average speed. Sort the output by most miles driven
to least. Round miles and miles per hour to the nearest integer.

Example input:

```
Driver Dan
Driver Alex
Driver Bob
Trip Dan 07:15 07:45 17.3
Trip Dan 06:12 06:32 21.8
Trip Alex 12:01 13:16 42.0
```

Expected output:

```
Alex: 42 miles @ 34 mph
Dan: 39 miles @ 47 mph
Bob: 0 miles
```
*/


const data = file.split(newlineRegex).map(trim).filter(isNotEmptyStr);
const drivers = unique(data.map(Driver.factory).filter(isNotNull).map(getName));
const trips = data.map(Trip.factory).filter(isNotNull);

console.log(data, drivers, trips);
