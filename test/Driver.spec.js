const { expect } = require('chai');
const Driver = require('../lib/Driver');

describe('Driver', function () {
    beforeEach(function () {
        this.driver = new Driver('Driver Dan');
    });

    it('is a function', function () {
        expect(Driver).to.be.a('function');
    });

    context('#constructor', function () {
        it('is a function', function () {
            expect(Driver.prototype.constructor).to.be.a('function');
        });

        it('sets the name property', function () {
            expect(this.driver.name).to.equal('Dan');
        });

        it('sets the trips property to an empty array', function () {
            expect(this.driver.trips).to.eql([]);
        });

        it('throws a TypeError if not instantiated with a valid record', function () {
            const invalidInit = () => new Driver('Hello type error!');

            expect(invalidInit).to.throw(TypeError);
        });
    });

    context('.factory', function () {
        it('is a function', function () {
            expect(Driver.factory).to.be.a('function');
        });

        it('returns a new class instance', function () {
            expect(Driver.factory('Driver Dan')).to.be.an.instanceof(Driver);
        });

        it('catches the TypeError and returns null when passed an invalid record', function () {
            expect(Driver.factory('Invalid!')).to.equal(null);
        });
    });

    context('#getAverageSpeed', function () {
        it('is a function', function () {
            expect(Driver.prototype.getAverageSpeed).to.be.a('function');
        });

        it('returns the average miles per hour of the driver', function () {
            expect(this.driver.getAverageSpeed()).to.equal(0);
        });

        it('returns a number', function () {
            expect(this.driver.getAverageSpeed()).to.be.a('number');
        });
    });

    context('#addTrip', function () {
        beforeEach(function () {
            this.tripFixture = {
                duration: 1,
                miles: 60,
                name: this.driver.name
            };
        });

        it('is a function', function () {
            expect(Driver.prototype.addTrip).to.be.a('function');
        });

        it('adds a trip for the driver', function () {
            this.driver.addTrip(this.tripFixture);
            expect(this.driver.trips).to.eql([this.tripFixture]);
        });

        it('updates the average speed of the driver', function () {
            this.driver.addTrip(this.tripFixture);
            expect(this.driver.averageSpeed).to.equal(60);
        });

        it('updates the miles driven by the driver', function () {
            this.driver.addTrip(this.tripFixture);
            expect(this.driver.milesDriven).to.equal(this.tripFixture.miles);
        });

        it('throws a TypeError if not passed a trip object for the driver', function () {
            const tripFixture = { name: 'Totally Not Dan' };
            const invalidCall = () => this.driver.addTrip(tripFixture);

            expect(invalidCall).to.throw(TypeError);
        });
    });

    context('#addTrips', function () {
        beforeEach(function () {
            this.tripsFixture = [{
                duration: 1,
                miles: 60,
                name: this.driver.name
            }, {
                duration: .55,
                miles: 13.1,
                name: this.driver.name
            }];
        });

        it('is a function', function () {
            expect(Driver.prototype.addTrips).to.be.a('function');
        });

        it('adds trips for the driver', function () {
            this.driver.addTrips(this.tripsFixture);
            expect(this.driver.trips).to.eql(this.tripsFixture);
        });

        it('updates the average speed of the driver', function () {
            this.driver.addTrips(this.tripsFixture);
            expect(this.driver.averageSpeed).to.equal(this.driver.getAverageSpeed());
        });

        it('updates the miles driven by the driver', function () {
            this.driver.addTrips(this.tripsFixture);
            expect(this.driver.milesDriven).to.equal(73.1);
        });

        it('throws a TypeError if not passed trip objects for the driver', function () {
            const tripsFixture = [{ name: 'Totally Not Dan' }];
            const invalidCall = () => this.driver.addTrips(tripsFixture);

            expect(invalidCall).to.throw(TypeError);
        });
    });

    context('#toString', function () {
        it('is a function', function () {
            expect(Driver.prototype.toString).to.be.a('function');
        });

        it('returns a string', function () {
            expect(this.driver.toString()).to.be.a('string');
        });

        it('generates a report for a driver with no miles traveled', function () {
            expect(this.driver.toString()).to.equal('Dan: 0 miles');
        });
    });
});
