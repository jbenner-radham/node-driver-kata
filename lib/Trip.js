// Trip $NAME $START_TIME $STOP_TIME $MILES_DRIVEN

/*
The second command is Trip, which will record a trip attributed to a driver.
The line will be space delimited with the following fields: the command
(Trip), driver name, start time, stop time, miles driven. Times will be given in
the format of hours:minutes. We'll use a 24-hour clock and will assume that
drivers never drive past midnight (the start time will always be before the end
time). Example:

`Trip Dan 07:15 07:45 17.3`

Discard any trips that average a speed of less than 5 mph or greater than 100 mph.
*/

/**
 * @property {string} name
 * @property {Date} start
 * @property {Date} end
 * @property {number} duration
 * @property {number} miles
 */
module.exports = class Trip {
    constructor(record = '') {
        const regex = /^Trip (\w+) (\d{1,2}:\d{2}) (\d{1,2}:\d{2}) (\d+(?:.\d)?)$/;
        const [, name, start, end, miles] = regex.exec(record);

        this.name = name;
        this.start = Trip.parseTime(start);
        this.end = Trip.parseTime(end);
        this.duration = NaN;
        this.miles = miles;
    }

    static parseTime(time) {
        const date = new Date(0);
        const [hours, minutes] = time.split(':');

        date.setUTCHours(hours);
        date.setUTCMinutes(minutes);

        return date;
    }
};
