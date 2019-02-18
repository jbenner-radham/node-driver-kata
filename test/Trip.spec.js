const { expect } = require('chai');
const Trip = require('../lib/Trip');

describe('Trip', function () {
    it('is a function', function () {
        expect(Trip).to.be.a('function');
    });
});
