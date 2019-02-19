const _ = require('lodash');

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
};
