const { expect } = require('chai');
const Trip = require('../lib/Trip');

describe('Trip', function () {
    it('is a function', function () {
        expect(Trip).to.be.a('function');
    });

    context('.parseTime', function () {
        it('is a function', function () {
            expect(Trip.parseTime).to.be.a('function');
        });

        it('returns a date object', function () {
            expect(Trip.parseTime('07:15')).to.be.a('date');
        });

        it('returns a date seeded from the Unix epoch', function () {
            const date = Trip.parseTime('08:55');

            expect(date.toISOString().startsWith('1970-01-01')).to.be.true;
        });

        it('sets the UTC hours on the returned date', function () {
            const date = Trip.parseTime('08:55');
            const hours = date.getUTCHours();

            expect(hours).to.equal(8);
        });

        it('sets the UTC minutes on the returned date', function () {
            const date = Trip.parseTime('08:55');
            const minutes = date.getUTCMinutes();

            expect(minutes).to.equal(55);
        });
    });
});
