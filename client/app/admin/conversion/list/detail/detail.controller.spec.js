/*jshint -W030 */
'use strict';

describe('Controller: ConversionDetailController', function () {

	// load the controller's module
	beforeEach(module('cloudfastApp.admin.conversion.list'));

	var controller;
	var conversion;
	var stateSpy;

	// Setup some states to test the navigation functions
	beforeEach(inject(function ($state) {
		stateSpy = sinon.stub($state, 'go');
		conversion = {_id: '1337id', name: 'wintest' };
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller) {
		controller = $controller('ConversionDetailController', {
			conversion: conversion
		});
	}));

	it('should exist as an object', function () {
		Should.exist(controller);
		controller.should.be.an.Object;
	});

	it('should have a conversion property which is the current conversion', function () {
		Should.exist(controller.conversion);
		controller.conversion
			.should.be.an.Object
			.and.eql(conversion);
	});


	it('should have a method to navigate to the parent state', function () {
		Should.exist(controller.goBack);
		controller.goBack.should.be.a.Function;
		controller.goBack();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^').called.should.be.ok;
	});

	it('should have a method to navigate to the edit state which is passing the correct id parameter', function () {
		Should.exist(controller.edit);
		controller.edit.should.be.a.Function;
		controller.edit();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^.edit', {'id': conversion._id}).called.should.be.ok;
	});
});
