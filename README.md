driver-kata
===========
[![build](https://img.shields.io/travis/jbenner-radham/node-driver-kata.svg?style=flat-square)](https://travis-ci.org/jbenner-radham/node-driver-kata)
[![license](https://img.shields.io/github/license/jbenner-radham/node-driver-kata.svg?style=flat-square)](LICENSE)

> A code kata exercise.

Exercise Description
--------------------
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

Install
-------
```sh
$ yarn # Or alternatively: `npm install`
```

Usage
-----
_**NOTE**: On Windows based systems you may need to invoke the CLI script via `node bin/cli.js`._

```sh
$ bin/cli.js --help

  A code kata exercise.

  Usage
      $ bin/cli.js <input file>

  Options
      --help, -h       Display this message.
      --version, -v    Display the application version.
```

For example output invoke the command `bin/cli.js example/input.txt`.


Testing
-------
```sh
$ yarn test # Or alternatively: `npm test`
```

Implementation Rationale
------------------------
Upon my initial review of the exercise description I felt that implementing classes for both of the command types was
the best starting point. This allows us to keep the logic and associated data organized.

I created the `Driver` and `Trip` classes that parse the input file lines passed into their constructors and assign the
data to the respective instance properties. Factory methods were added to each class to assist in a functional
implementation via `Array.prototype.map` as well as `Trip.prototype.isReported` for usage via chained
`Array.prototype.filter` invocations.

As each `Trip` belongs to a respective `Driver` instance I decided to add a `Driver.prototype.trips` property which is
populated via `Driver.prototype.addTrip` _(or the `Driver.prototype.addTrips` convenience method)_. Adding trips via
this method automatically updates the driver's miles driven and average speed. Lastly I added the
`Driver.prototype.toString` method to convert each driver instance into the textual representation that will be
aggregated into the final report. I felt using the `toString` nomenclature was the most semantic approach being that the
textual report generated is literally the data that the instance contains in the desired human readable format.

The final class implemented was `Report`. It effectively is a container for various `Driver` instances with the
respective `Report.prototype.toString` method to generate the driver report which is the primary objective of this
exercise.

I then added the primary `app` function in `lib/index.js` since it is the main library file. This function takes in
a single string input argument which is then split out into an array of lines which are put through a "functional
pipeline" to aggregate and filter the data into a `Report` instance at which point the value of
`Report.prototype.toString` is returned.

Lastly the executable `bin/cli.js` file imports the `app` function and utilizes the super handy
[meow](https://www.npmjs.com/package/meow) library to provide standard CLI functionality such as `--help` and
`--version` flags. At this point presuming that this script was invoked with a valid input filepath it will resolve and
read said file into a string which is then passed into the `app` function and prints the generated report to `stdout`.

See Also
--------
- [Yarn](https://yarnpkg.com/)

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.
