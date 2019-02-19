const _ = require('lodash');
const os = require('os');

/**
 * @property {Driver[]} [drivers=[]]
 */
module.exports = class Report {
    /**
     * Creates an instance of Report.
     */
    constructor() {
        this.drivers = [];
    }

    /**
     * Add a driver object to the report and de-duplicates drivers if needed.
     *
     * @param {Driver} driver
     */
    addDriver(driver) {
        this.drivers = _([...this.drivers, driver])
            .uniqBy('name')
            .sortBy('name')
            .valueOf();
    }

    /**
     * Add driver objects to the report and de-duplicates drivers if needed.
     *
     * @param {Driver[]} drivers
     */
    addDrivers(drivers) {
        drivers.forEach(this.addDriver.bind(this));
    }

    /**
     * Get the formatted driver reports as an array.
     *
     * @returns {string[]} A collection of reports e.g., `['Alex: 42 miles @ 34 mph']`
     */
    toArray() {
        return this.drivers.map(driver => driver.toString());
    }

    /**
     * Get the formatted driver reports as a string.
     *
     * @returns {string} A formatted text report of the added drivers.
     */
    toString() {
        return this.toArray().join(os.EOL);
    }
};
