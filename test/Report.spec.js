const { expect } = require('chai');
const os = require('os');
const Driver = require('../lib/Driver');
const Report = require('../lib/Report');
const Trip = require('../lib/Trip');

describe('Report', function () {
    beforeEach(function () {
        const getDriversFixture = () => {
            const alex = new Driver('Driver Alex');
            const bob = new Driver('Driver Bob');
            const dan = new Driver('Driver Dan');

            alex.addTrips([
                new Trip('Trip Alex 12:01 13:16 42.0')
            ]);
            dan.addTrips([
                new Trip('Trip Dan 07:15 07:45 17.3'),
                new Trip('Trip Dan 06:12 06:32 21.8')
            ]);

            return [alex, bob, dan];
        };

        this.driversFixture = getDriversFixture();
        this.report = new Report();
    });

    it('is a function', function () {
        expect(Report).to.be.a('function');
    });

    context('#constructor', function () {
        it('is a function', function () {
            expect(Report.prototype.constructor).to.be.a('function');
        });

        it('sets the drivers property to an empty array', function () {
            expect(this.report.drivers).to.be.an('array').with.a.lengthOf(0);
        });
    });

    context('#addDriver', function () {
        beforeEach(function () {
            this.driverFixture = { name: 'Jane' };
        });

        it('is a function', function () {
            expect(Report.prototype.addDriver).to.be.a('function');
        });

        it('adds a driver the drivers array property', function () {
            this.report.addDriver(this.driverFixture);

            expect(this.report.drivers).to.eql([this.driverFixture]);
        });
    });

    context('#addDrivers', function () {
        beforeEach(function () {
            this.driversFixture = [
                { name: 'Jane' },
                { name: 'John' }
            ];
        });

        it('is a function', function () {
            expect(Report.prototype.addDrivers).to.be.a('function');
        });

        it('adds drivers the drivers array property', function () {
            this.report.addDrivers(this.driversFixture);

            expect(this.report.drivers).to.eql(this.driversFixture);
        });
    });

    context('#toArray', function () {
        it('is a function', function () {
            expect(Report.prototype.toArray).to.be.a('function');
        });

        it('returns an array', function () {
            expect(this.report.toArray()).to.be.a('array');
        });

        it('returns an array of the formatted reports', function () {
            const expected = [
                'Alex: 42 miles @ 34 mph',
                'Bob: 0 miles',
                'Dan: 39 miles @ 47 mph'
            ];

            this.report.addDrivers(this.driversFixture);
            expect(this.report.toArray()).to.eql(expected);
        });
    });

    context('#toString', function () {
        it('is a function', function () {
            expect(Report.prototype.toString).to.be.a('function');
        });

        it('returns a string', function () {
            expect(this.report.toString()).to.be.a('string');
        });

        it('returns a string of the formatted reports', function () {
            const expected = [
                'Alex: 42 miles @ 34 mph',
                'Bob: 0 miles',
                'Dan: 39 miles @ 47 mph'
            ].join(os.EOL);

            this.report.addDrivers(this.driversFixture);
            expect(this.report.toString()).to.equal(expected);
        });
    });
});
