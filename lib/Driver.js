module.exports = class Driver {
    constructor(record) {
        const regex = /^Driver (\w+)$/;
        const [, name] = regex.exec(record);

        this.name = name;
    }
};
