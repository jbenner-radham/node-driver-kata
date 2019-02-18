const { expect } = require('chai');
const Driver = require('../lib/Driver');

describe('Driver', function () {
    it('is a function', function () {
        expect(Driver).to.be.a('function');
    });
});
