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
});
