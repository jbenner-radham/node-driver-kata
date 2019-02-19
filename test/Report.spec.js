const { expect } = require('chai');
const Report = require('../lib/Report');

describe('Report', function () {
    beforeEach(function () {
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
});
