/**
 * @property {string} name
 * @property {number} milesDriven
 * @property {?number} averageSpeed
 */
module.exports = class Driver {
    /**
     * Creates an instance of Driver.
     *
     * @param {string} record - A trip record e.g., `Driver Dan`.
     */
    constructor(record) {
        const regex = /^Driver (\w+)$/;

        if (!regex.test(record)) {
            throw new TypeError('The record provided does not match the required syntax');
        }

        const [, name] = regex.exec(record);

        this.name = name;
        this.milesDriven = 0;
        this.averageSpeed = null;
    }

    /**
     * A functional utility method for this class.
     *
     * @static
     * @param {string} record - A trip record e.g., `Driver Dan`.
     * @returns {?Driver}
     */
    static factory(record) {
        try {
            return new Driver(record);
        } catch (_) {
            return null;
        }
    }

    /**
     * Generates a driver report e.g., `Dan: 39 miles @ 47 mph`.
     *
     * @returns {string}
     */
    toString() {
        const { name, milesDriven, averageSpeed } = this;
        const miles = `${milesDriven} miles`;
        const speed = averageSpeed !== null ? `@ ${averageSpeed} mph` : '';

        return `${name}: ${miles} ${speed}`.trim();
    }
};
