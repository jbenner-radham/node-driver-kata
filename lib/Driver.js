/**
 * @property {string} name
 */
module.exports = class Driver {
    /**
     * Creates an instance of Driver.
     *
     * @param {string} record - A trip record e.g., `Driver Dan`
     */
    constructor(record) {
        const regex = /^Driver (\w+)$/;

        if (!regex.test(record)) {
            throw new TypeError('The record provided does not match the required syntax');
        }

        const [, name] = regex.exec(record);

        this.name = name;
    }
};
