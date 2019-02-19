/**
 * @property {string} name
 * @property {Date} start
 * @property {Date} end
 * @property {number} duration
 * @property {number} miles
 */
module.exports = class Trip {
    /**
     * Creates an instance of Trip.
     *
     * @param {string} - A trip record e.g., `Trip Dan 07:15 07:45 17.3`
     * @throws {TypeError} Record argument must be in the required syntax.
     */
    constructor(record) {
        const regex = /^Trip (\w+) (\d{1,2}:\d{2}) (\d{1,2}:\d{2}) (\d+(?:.\d)?)$/;

        if (!regex.test(record)) {
            throw new TypeError('The record provided does not match the required syntax');
        }

        const [, name, start, end, miles] = regex.exec(record);

        this.name = name;
        this.start = Trip.parseTime(start);
        this.end = Trip.parseTime(end);
        this.duration = this.getDuration();
        this.miles = Number.parseFloat(miles);
    }

    /**
     * A functional utility method for this class.
     *
     * @static
     * @param {string} record - A trip record e.g., `Trip Dan 07:15 07:45 17.3`
     * @returns {?Trip}
     */
    static factory(record) {
        try {
            return new Trip(record);
        } catch (_) {
            return null;
        }
    }

    /**
     * Checks that a trip does not average a speed of less than 5 mph or greater than 100 mph.
     *
     * @returns {boolean}
     */
    isReported() {
        const speed = (distance, time) => distance / time;
        const { duration, miles } = this;
        const averageSpeed = speed(miles, duration);

        return averageSpeed >= 5 && averageSpeed < 100;
    }

    /**
     * Convert a trip event time to a date object.
     *
     * @static
     * @param {string} time - A 24-hour time in HH:mm format.
     * @returns {Date}
     */
    static parseTime(time) {
        const date = new Date(0);
        const [hours, minutes] = time.split(':');

        date.setUTCHours(hours);
        date.setUTCMinutes(minutes);

        return date;
    }

    /**
     * Get the duration of the trip in hours.
     *
     * @returns {number}
     */
    getDuration() {
        const millisecondsInAMinute = 60000;
        const minutesInAnHour = 60;
        const durationInMilliseconds = this.end - this.start;
        const durationInMinutes = durationInMilliseconds / millisecondsInAMinute;

        return durationInMinutes / minutesInAnHour;
    }
};
