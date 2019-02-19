const { expect } = require('chai');
const Trip = require('../lib/Trip');

describe('Trip', function () {
    beforeEach(function () {
        this.trip = new Trip('Trip Dan 07:15 07:45 17.3');
    });

    it('is a function', function () {
        expect(Trip).to.be.a('function');
    });

    context('#constructor', function () {
        it('is a function', function () {
            expect(Trip.prototype.constructor).to.be.a('function');
        });

        it('sets the name property', function () {
            expect(this.trip.name).to.equal('Dan');
        });

        it('sets the start property', function () {
            const date = new Date(0);

            date.setUTCHours(7);
            date.setUTCMinutes(15);

            expect(this.trip.start.toISOString()).to.equal(date.toISOString());
        });

        it('sets the end property', function () {
            const date = new Date(0);

            date.setUTCHours(7);
            date.setUTCMinutes(45);

            expect(this.trip.end.toISOString()).to.equal(date.toISOString());
        });

        it('sets the duration property', function () {
            expect(this.trip.duration).to.equal(.5);
        });

        it('sets the miles property', function () {
            expect(this.trip.miles).to.equal(17.3);
        });

        it('throws a TypeError if not instantiated with a valid record', function () {
            const invalidInit = () => new Trip('Hello type error!');

            expect(invalidInit).to.throw(TypeError);
        });
    });

    context('.factory', function () {
        it('is a function', function () {
            expect(Trip.factory).to.be.a('function');
        });

        it('returns a new class instance', function () {
            expect(Trip.factory('Trip Dan 07:15 07:45 17.3')).to.be.an.instanceof(Trip);
        });

        it('caches the TypeError and returns null when passed an invalid record', function () {
            expect(Trip.factory('Invalid!')).to.equal(null);
        });
    });

    context('#isReported', function () {
        it('is a function', function () {
            expect(Trip.prototype.isReported).to.be.a('function');
        });

        it('returns a boolean', function () {
            expect(this.trip.isReported()).to.be.a('boolean');
        });

        it('returns false for a trip with an average speed of 4.9 mph', function () {
            const trip = new Trip('Trip Dan 07:15 08:15 4.9');

            expect(trip.isReported()).to.equal(false);
        });

        it('returns true for a trip with an average speed of 5 mph', function () {
            const trip = new Trip('Trip Dan 07:15 08:15 5.0');

            expect(trip.isReported()).to.equal(true);
        });

        it('returns true for a trip with an average speed of 60 mph', function () {
            const trip = new Trip('Trip Dan 07:15 08:15 60.0');

            expect(trip.isReported()).to.equal(true);
        });

        it('returns true for a trip with an average speed of 99.9 mph', function () {
            const trip = new Trip('Trip Dan 07:15 08:15 99.9');

            expect(trip.isReported()).to.equal(true);
        });

        it('returns false for a trip with an average speed of 100 mph', function () {
            const trip = new Trip('Trip Dan 07:15 08:15 100.0');

            expect(trip.isReported()).to.equal(false);
        });
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

    context('#getDuration', function () {
        it('is a function', function () {
            expect(Trip.prototype.getDuration).to.be.a('function');
        });

        it('returns a number', function () {
            const trip = new Trip('Trip Dan 07:15 07:45 17.3');
            const duration = trip.getDuration();

            expect(duration).to.be.a('number');
        });

        it('returns 1 for an hour long trip', () => {
            const trip = new Trip('Trip Dan 05:55 06:55 55.5');
            const duration = trip.getDuration();

            expect(duration).to.equal(1);
        });
    });
});
