const { expect } = require('chai');
const Driver = require('../lib/Driver');

describe('Driver', function () {
    it('is a function', function () {
        expect(Driver).to.be.a('function');
    });

    context('#constructor', function () {
        beforeEach(function () {
            this.driver = new Driver('Driver Dan');
        });

        it('is a function', function () {
            expect(Driver.prototype.constructor).to.be.a('function');
        });

        it('sets the name property', function () {
            expect(this.driver.name).to.equal('Dan');
        });

        it('throws a TypeError if not instantiated with a valid record', function () {
            const invalidInit = () => new Driver('Hello type error!');

            expect(invalidInit).to.throw(TypeError);
        });
    });
});
