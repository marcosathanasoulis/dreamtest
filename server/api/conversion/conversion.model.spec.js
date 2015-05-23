'use strict';

var should = require('should');
var Conversion = require('./conversion.model').model;

var conversion;

describe('Conversion Model', function () {
	before(function (done) {
		// Clear conversions before testing
		Conversion.remove().exec().then(function () {
			done();
		});
	});

	beforeEach(function (done) {
		conversion = new Conversion({
			provider: 'local',
			name: 'conversionname',
			active: true,
		});
		done();
	});

	afterEach(function (done) {
		Conversion.remove().exec().then(function () {
			done();
		});
	});

	it('should begin with no conversions', function (done) {
		Conversion.find({}, function (err, conversions) {
			conversions.should.have.length(0);
			done();
		});
	});

	it('should fail when saving a duplicate conversion', function (done) {
		conversion.save(function () {
			var conversionDup = new Conversion(conversion);
			conversionDup.save(function (err) {
				should.exist(err);
				done();
			});
		});
	});

	it('should fail when saving without a name', function (done) {
		conversion.name = '';
		conversion.save(function (err) {
			should.exist(err);
			done();
		});
	});


	it('should have a virtual profile property', function () {
		conversion.profile.should.exist;
	});

});
