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

    context('#setAverageSpeed', function () {
        it('is a function', function () {
            expect(Driver.prototype.setAverageSpeed).to.be.a('function');
        });

        it('sets the average speed of the driver', function () {
            const tripFixture = {
                duration: 60,
                miles: 60,
                name: this.driver.name
            };

            this.driver.addTrip(tripFixture);
            this.driver.setAverageSpeed();
            expect(this.driver.averageSpeed).to.equal(60);
        });
    });

    context('#addTrip', function () {
        it('is a function', function () {
            expect(Driver.prototype.addTrip).to.be.a('function');
        });

        it('adds a trip for the driver', function () {
            const tripFixture = { name: this.driver.name };

            this.driver.addTrip(tripFixture);
            expect(this.driver.trips).to.eql([tripFixture]);
        });

        it('throws a TypeError if not passed a trip object for the driver', function () {
            const tripFixture = { name: 'Totally Not Dan' };
            const invalidCall = () => this.driver.addTrip(tripFixture);

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

        it('generates a report for a driver with no miles travelled', function () {
            expect(this.driver.toString()).to.equal('Dan: 0 miles');
        });
    });
});
