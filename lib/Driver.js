/**
 * @property {string} name
 * @property {number} milesDriven
 * @property {?number} averageSpeed
 * @property {Trip[]} trips
 */
module.exports = class Driver {
    /**
     * Creates an instance of Driver.
     *
     * @param {string} record - A trip record e.g., `Driver Dan`.
     * @throws {TypeError} Record argument must be in the required syntax.
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
        this.trips = [];
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
     * Calculates the average speed based upon the trips added to the instance.
     *
     * @returns {number} Average miles per hour as a float.
     */
    getAverageSpeed() {
        const addDuration = (accumulator, trip) => accumulator + trip.duration;
        const addMiles = (accumulator, trip) => accumulator + trip.miles;
        const hoursDriven = this.trips.reduce(addDuration, 0);
        const milesDriven = this.trips.reduce(addMiles, 0);
        const averageSpeed = milesDriven / hoursDriven;

        return Number.isFinite(averageSpeed) ? averageSpeed : 0;
    }

    /**
     * Add a trip for the driver.
     *
     * @param {Trip} trip
     * @throws {TypeError} Type#name must match the name property.
     */
    addTrip(trip) {
        if (trip.name !== this.name) {
            throw new TypeError('The trip provided is not for this driver');
        }

        this.trips = [...this.trips, trip];
        this.averageSpeed = this.getAverageSpeed();
        this.milesDriven += trip.miles;
    }

    /**
     * Add trips for the driver.
     *
     * @param {Trip[]} trips
     * @throws {TypeError} Every Type#name must match the name property.
     */
    addTrips(trips) {
        trips.forEach(this.addTrip.bind(this));
    }

    /**
     * Generates a driver report e.g., `Dan: 39 miles @ 47 mph`.
     *
     * @returns {string}
     */
    toString() {
        const { name, milesDriven, averageSpeed } = this;
        const miles = `${Math.round(milesDriven)} miles`;
        const speed = averageSpeed !== null
            ? `@ ${Math.round(averageSpeed)} mph`
            : '';

        return `${name}: ${miles} ${speed}`.trim();
    }
};
