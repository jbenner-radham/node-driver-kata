const _ = require('lodash');
const Driver = require('./Driver');
const Report = require('./Report');
const Trip = require('./Trip');

/**
 * @param {string} input - Input file contents.
 */
module.exports = function app(input) {
    const newlineRegex = /\r?\n/;
    const isNotEmptyStr = str => str !== '';
    const isNotNull = data => data !== null;
    const isTripReported = (trip) => trip.isReported();
    const report = new Report();

    const lines = input.split(newlineRegex)
        .map(_.trim)
        .filter(isNotEmptyStr);

    const trips = lines.map(Trip.factory)
        .filter(isNotNull)
        .filter(isTripReported);

    const drivers = _(lines).map(Driver.factory)
        .filter(isNotNull)
        .uniqBy('name')
        .sortBy('name')
        .valueOf();

    drivers.forEach(driver => {
        const isDriversTrip = (trip) => driver.name === trip.name;

        driver.addTrips(trips.filter(isDriversTrip));
    });

    report.addDrivers(drivers);

    return report.toString();
};
